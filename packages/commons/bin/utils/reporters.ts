import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import util from 'node:util';

import { $, hash } from './functions.js';
import type { Results } from './runners.js';

const writeFile = util.promisify(fs.writeFile);

export interface Reporter {
  process(results: Results): Promise<void>;
  publish(): Promise<void>;
}

export class ErrorReporter implements Reporter {
  async process(details: Results) {
    const error = new Error('Failed code analysis');
    if (details.eslint) {
      for (const detail of details.eslint) {
        if (detail.errorCount > 0) throw error;
      }
    }
    if (details.stylelint) {
      for (const detail of details.stylelint) {
        if (detail.errored) throw error;
      }
    }
    console.log('\nNo errors reported.');
  }

  async publish() {}
}

enum AnnotationType {
  VULNERABILITY = 'VULNERABILITY',
  CODE_SMELL = 'CODE_SMELL',
  BUG = 'BUG'
}

enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

interface Annotation {
  external_id: string;
  path: string;
  annotation_type: keyof typeof AnnotationType;
  line: number;
  severity: keyof typeof Severity;
  [prop: string]: string | number;
}

export class Bitbucket implements Reporter {
  workspace = '';

  report = {
    title: 'Code Report',
    details: 'Summary of errors and warnings',
    report_type: 'TEST',
    result: 'PENDING',
    data: [
      {
        title: 'Error Count',
        type: 'NUMBER',
        value: 0
      },
      {
        title: 'Warning Count',
        type: 'NUMBER',
        value: 0
      }
    ]
  };

  annotations = new Map<string, Annotation>();

  constructor() {
    const repoUrl = execSync('git ls-remote --get-url').toString().trim();
    const repoDir = execSync('git rev-parse --show-toplevel').toString().trim();
    const repoName = repoUrl.split('/').pop()?.replace(/\..+$/, '');
    const currentDir = process.cwd();

    this.workspace =
      repoDir === currentDir ? '' : path.relative(repoDir, currentDir);
    this.report.title =
      `${this.workspace ?? repoName} ${this.report.title}`.trim();
  }

  async process(results: Results) {
    const currentDir = process.cwd();
    const commit = (await $('git rev-parse HEAD', { silent: true })).trim();

    let totalErrorCount = 0;
    let totalWarningCount = 0;

    if (results.eslint) {
      const SEVERITIES = Object.values(Severity);

      for (const result of results.eslint) {
        totalErrorCount += result.errorCount;
        totalWarningCount += result.warningCount;

        const relativePath = path.join(
          this.workspace,
          path.relative(currentDir, result.filePath)
        );

        for (const message of result.messages) {
          const id = hash(
            'sha1',
            `lint:${relativePath}:${message.line}:${commit}:${message.ruleId}`
          );
          this.annotations.set(id, {
            external_id: id,
            path: relativePath,
            annotation_type: AnnotationType.CODE_SMELL,
            summary: message.message,
            line: message.line,
            severity: SEVERITIES[message.severity] ?? Severity.MEDIUM
          });
        }
      }
    }

    if (results.stylelint) {
      const SEVERITIES = {
        warning: Severity.MEDIUM,
        error: Severity.HIGH
      };

      for (const result of results.stylelint) {
        for (const warning of result.warnings) {
          if (warning.severity === 'error') {
            totalErrorCount++;
          } else {
            totalWarningCount++;
          }

          const relativePath =
            result.source &&
            path.join(this.workspace, path.relative(currentDir, result.source));
          if (relativePath) {
            const id = hash(
              'sha1',
              `lint:${relativePath}:${warning.line}:${commit}:${warning.rule}`
            );
            this.annotations.set(id, {
              external_id: id,
              path: relativePath,
              annotation_type: AnnotationType.CODE_SMELL,
              summary: warning.text,
              line: warning.line,
              severity: SEVERITIES[warning.severity] ?? Severity.MEDIUM
            });
          }
        }
      }
    }

    this.report.data[0].value += totalErrorCount;
    this.report.data[1].value += totalWarningCount;
  }

  async publish() {
    const [errorData, warningData] = this.report.data;
    this.report.result =
      errorData.value + warningData.value > 0 ? 'FAILED' : 'PASSED';
    await writeFile('bitbucket-report.json', JSON.stringify(this.report));
    await writeFile(
      'bitbucket-annotations.json',
      JSON.stringify(Array.from(this.annotations.values()))
    );
  }
}
