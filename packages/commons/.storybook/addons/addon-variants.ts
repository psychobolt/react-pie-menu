import { readFileSync } from 'node:fs';
import { createRequire, registerHooks } from 'node:module';
import path from 'node:path';
import {
  type ComponentAnnotations,
  type StoryAnnotations,
  type Renderer,
  type Meta,
  type Args,
  type IncludeExcludeOptions,
  isMeta,
  isStory
} from 'storybook/internal/csf';
import { CsfFile } from 'storybook/internal/csf-tools';
import type { Indexer } from 'storybook/internal/types';
import type { PluginOption } from 'vite';

import type {
  TemplateStoryObj,
  VariantStoryObj
} from '../utils/story-generators.js';
import { UNKOWN_CSS_SELECTOR } from './css-proxy.js';

const require = createRequire(import.meta.url);

type VariantsMeta<TRenderer extends Renderer = Renderer> =
  | ComponentAnnotations<TRenderer>
  | Meta<TRenderer>;

export type VariantStory<
  TRenderer extends Renderer = Renderer,
  TArgs = Args
> = StoryAnnotations<TRenderer, TArgs> & {
  exportName: string;
  _template?: TemplateStoryObj<TArgs, TRenderer>;
};

type StoryExports = typeof CsfFile.prototype._storyExports;

type VariantModule = StoryExports & {
  default: VariantsMeta;
  stories:
    | Array<VariantStory>
    | ((
        stories?: Array<VariantStoryObj<Args, Renderer>>
      ) => Array<VariantStory>);
};

interface TemplateOptions extends IncludeExcludeOptions {
  fileName: string;
  csfExports: StoryExports;
  stories: Array<VariantStory>;
}

type Template = (options: TemplateOptions) => string;

const getSourceTemplate = (meta: VariantsMeta): Template => {
  const csfVersion = isMeta(meta) ? 4 : 3;
  return ({
    fileName,
    stories,
    csfExports,
    excludeStories
  }: TemplateOptions) => {
    let hasErrors = false;
    const logError = (e: unknown) => {
      console.error(
        `\nThe variant story "${fileName}" cannot be processed. See error below:\n\t%s\n`,
        e
      );
      hasErrors = true;
    };
    try {
      return `
        ${stories.reduce((template, story) => {
          const { name, exportName, args = {}, _template } = story;

          if (
            excludeStories &&
            (Array.isArray(excludeStories)
              ? excludeStories.includes(exportName)
              : excludeStories.test(exportName))
          ) {
            return template;
          }

          const [templateStory] =
            Object.entries(csfExports).find(
              ([, declaration]) => declaration === (_template ?? story)
            ) ?? [];
          const {
            args: _args,
            exportName: _exportName,
            ...annotations
          } = _template
            ? isStory<Renderer & { args: Args }>(_template)
              ? _template.input
              : _template
            : {};

          let stringArgs = JSON.stringify(args, (key, value) => {
            if (
              typeof value === 'string' &&
              value.indexOf(UNKOWN_CSS_SELECTOR) > -1
            ) {
              if (templateStory) {
                return;
              } else {
                logError(
                  `Story "${name}" is using a story template with a non-JSON parseable construct "${key}". Consider hoisting arg to "meta" or exporting the template.`
                );
              }
            }
            return value;
          });

          const extras: string[] = [];
          Object.entries(annotations).forEach(([key, value]) => {
            if (
              (Array.isArray(value) && value.length) ||
              (typeof value === 'object' && Object.values(value).length) ||
              typeof value === 'function'
            ) {
              extras.push(key);
            }
          });
          if (!templateStory && extras.length) {
            logError(
              `Variant "${name}" requires extra annotations (${extras.join(', ')}). Consider hoisting them to "meta" or exporting the template.`
            );
          }

          let result = `${template}\n`;
          switch (csfVersion) {
            case 4: {
              const storyFactoryFn = templateStory
                ? `${templateStory}.extend`
                : 'meta.story';
              result += `
                  export const ${exportName} = ${storyFactoryFn}({
                    name: '${name}',
                    args: ${stringArgs}
                  });
                `;
              break;
            }
            default: {
              let spread = '';
              if (templateStory) {
                spread = `...${templateStory},`;
                stringArgs = `{ ...${templateStory}.args, ...${stringArgs} }`;
              }
              result += `
                  export const ${exportName} = {
                    ${spread}
                    name: '${name}',
                    args: ${stringArgs}
                  };
                `;
              break;
            }
          }
          return result;
        }, '')}
      `;
    } catch (e) {
      logError(e);
      hasErrors = true;
      return '';
    } finally {
      if (process.env.NODE_ENV === 'production' && hasErrors) {
        process.exit(1);
      }
    }
  };
};

// Reference: https://github.com/vitejs/vite/blob/v7.3.1/packages/vite/src/node/constants.ts#L108
export const CSS_LANGS_RE: RegExp =
  /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/;

// Reference: https://github.com/vitejs/vite/blob/v7.3.1/packages/vite/src/node/constants.ts#L145
export const KNOWN_ASSET_TYPES: string[] = [
  // images
  'apng',
  'bmp',
  'png',
  'jpe?g',
  'jfif',
  'pjpeg',
  'pjp',
  'gif',
  'svg',
  'ico',
  'webp',
  'avif',
  'cur',
  'jxl',

  // media
  'mp4',
  'webm',
  'ogg',
  'mp3',
  'wav',
  'flac',
  'aac',
  'opus',
  'mov',
  'm4a',
  'vtt',

  // fonts
  'woff2?',
  'eot',
  'ttf',
  'otf',

  // other
  'webmanifest',
  'pdf',
  'txt'
];

const DEFAULT_ASSETS_RE = new RegExp(
  `\\.(` + KNOWN_ASSET_TYPES.join('|') + `)(\\?.*)?$`,
  'i'
);
const RAW_ASSET_RE = /\?raw$/;
const STORYBOOK_PREVIEW_RE = /\.storybook\/preview(\.[cm]?[tj]s|[tj]sx)?$/;

const importModule = (fileName: string) => {
  const hook = registerHooks({
    resolve(specifier, context, nextResolve) {
      const parentURL = context.parentURL ?? fileName;
      if (STORYBOOK_PREVIEW_RE.test(specifier)) {
        return {
          format: 'module',
          shortCircuit: true,
          url: require.resolve('../mock-api.js')
        };
      }
      const [cssExension] = CSS_LANGS_RE.exec(specifier) ?? [];
      if (cssExension && specifier.indexOf(`.module${cssExension}`) > 0) {
        return {
          format: 'module',
          shortCircuit: true,
          url: require.resolve('./css-proxy.js')
        };
      }
      if (
        cssExension ||
        RAW_ASSET_RE.test(specifier) ||
        DEFAULT_ASSETS_RE.test(specifier)
      ) {
        return {
          format: 'mockAsset',
          shortCircuit: true,
          url: path.join(parentURL, '..', specifier)
        };
      }
      return nextResolve(specifier, context);
    },
    load(url, context, nextLoad) {
      if (context.format === 'mockAsset') {
        return {
          format: 'module',
          shortCircuit: true,
          source: 'export default "";'
        };
      }
      return nextLoad(url, context);
    }
  });

  delete require.cache[fileName];
  const exports = require(fileName);
  hook.deregister();
  return exports;
};

const fileMatcher: RegExp = /\.variants?\.[jt]sx?$/;
export const storybookVariantsIndexer: () => Indexer = () => ({
  test: fileMatcher,
  async createIndex(fileName) {
    try {
      delete require.cache[fileName];
      const { default: meta, stories }: VariantModule = importModule(fileName);
      const { title, tags: metaTags = [] } = isMeta(meta) ? meta.input : meta;

      if (typeof stories === 'undefined') {
        throw new Error('The "stories" export is undefined.');
      }

      return (typeof stories === 'function' ? stories() : stories).map(
        ({ name, exportName, tags = [] }) => ({
          type: 'story',
          title,
          tags: Array.from(new Set([...metaTags, ...tags])),
          metaTags,
          name,
          exportName,
          importPath: fileName
        })
      );
    } catch (e) {
      console.error(
        `Failed to index variant story "${fileName}". See error below:\n\t%s\n`,
        e
      );
      if (process.env.NODE_ENV === 'production') process.exit(1);
      return [];
    }
  }
});

export function vitePluginStorybookVariants(): PluginOption {
  return {
    name: 'vite-plugin-storybook-variants',
    async load(id) {
      if (!fileMatcher.test(id)) return;

      const fileName = require.resolve(id);
      const {
        default: meta,
        stories,
        ...csfExports
      }: VariantModule = importModule(fileName);
      const template = getSourceTemplate(meta);
      const { includeStories, excludeStories } = isMeta(meta)
        ? meta.input
        : meta;

      return `
        ${readFileSync(fileName, 'utf-8')}

        ${template({
          fileName,
          csfExports,
          includeStories,
          excludeStories,
          stories: typeof stories === 'function' ? stories() : stories
        })};
      `;
    }
  };
}
