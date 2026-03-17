import { Markdown as _Markdown } from '@storybook/addon-docs/blocks';
import { useStorybookApi } from 'storybook/manager-api';
import { convert, ThemeProvider, themes } from 'storybook/theming';

export interface Props {
  children: string;
}

function hasProperty<T extends object, K extends PropertyKey>(
  obj: T,
  key: K
): obj is Extract<T, { [P in K]?: string }> {
  return key in obj;
}

export const Markdown = (props: Props) => {
  const themeName = useStorybookApi()?.getGlobals()?.theme;
  return (
    <ThemeProvider
      theme={convert(
        hasProperty(themes, themeName) ? themes[themeName] : themes.normal
      )}
    >
      {_Markdown(props)}
    </ThemeProvider>
  );
};
