interface Tester {
  test: (value: string) => boolean;
}

type Matcher =
  | ((value: any, options?: any) => Tester)
  | ((value?: any[]) => Tester);

interface Spec {
  alias?: string;
  key?: string;
  type: any;
}

interface Filter extends Spec {
  value?: string | boolean | string[];
  matcher?: Matcher | RegExp | Tester;
}

type Filters = Record<string, Filter>;

type Options = Record<string, any>;

type NodeLinker = 'node-modules' | 'pnpm';

interface Workspace {
  name: string;
  location: string;
}

type Mapper<T> = (workspaces: Workspace[], result?: unknown) => T;

interface Formatter extends Spec {
  value: string[];
  mapper: <T extends Workspace>(type: string[]) => Mapper<T[]>;
}

type Formatters = Record<string, Formatter>;
