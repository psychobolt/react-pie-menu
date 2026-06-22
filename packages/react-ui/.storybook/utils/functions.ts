import type { ComponentType } from 'react';
import type { InputType } from 'storybook/internal/csf';
import {
  type ArgTypesExtractor,
  type ExtractedProp as _ExtractedProp,
  type PropDef as _PropDef,
  extractComponentProps,
  hasDocgen
} from 'storybook/internal/docs-tools';
import type {
  ArgTypesEnhancer,
  StrictArgTypes
} from 'storybook/internal/types';
import { mergeConfig as _mergeConfig } from 'commons/esm/.storybook/utils/functions.js';

import { isClassComponent } from 'utils/functions.js';

type ExtractedProp = _ExtractedProp & {
  docgenInfo?: _ExtractedProp['docgenInfo'] & {
    parent?: {
      fileName?: string;
      name?: string;
    };
  };
};

type PropDef = _PropDef & {
  table?: InputType['table'];
};

const isMemo = (component: any) =>
  component?.$$typeof === Symbol.for('react.memo');

const isDomProp = (prop: ExtractedProp) => {
  const parent = prop.docgenInfo?.parent;

  return (
    parent?.fileName?.includes('@types/react') ||
    parent?.name?.includes('AriaAttributes') ||
    parent?.name?.includes('DOMAttributes') ||
    parent?.name?.includes('HTMLAttributes') ||
    parent?.name?.includes('SVGAttributes')
  );
};

const extractProps = (component: any) => {
  let componentType = component;

  if (!hasDocgen(component) && !component.propTypes && isMemo(component)) {
    componentType = component.type;
  }

  return {
    rows: extractComponentProps(componentType, 'props').map(
      ({ propDef, ...prop }) =>
        ({
          ...propDef,
          table: {
            category: 'Component',
            ...(isDomProp(prop as ExtractedProp) ? { subcategory: 'DOM' } : {})
          }
        }) satisfies PropDef
    )
  };
};

export const extractArgTypes: ArgTypesExtractor = (component) => {
  if (!component) {
    return null;
  }

  const { rows } = extractProps(component);

  if (!rows.length) {
    return null;
  }

  return rows.reduce((argTypes: StrictArgTypes, row: PropDef) => {
    const {
      name,
      description,
      type,
      sbType,
      defaultValue: defaultSummary,
      jsDocTags,
      required,
      table
    } = row;

    argTypes[name] = {
      name,
      description,
      type: { required, ...sbType },
      table: {
        ...table,
        type: type ?? undefined,
        jsDocTags,
        defaultValue: defaultSummary ?? undefined
      }
    };

    return argTypes;
  }, {});
};

export const enhanceArgTypes: ArgTypesEnhancer = ({ argTypes, component }) => {
  const extractedArgTypes = component ? extractArgTypes(component) : null;

  return Object.fromEntries(
    Object.entries(argTypes ?? {}).map(([name, argType]) => {
      const extractedTable = extractedArgTypes?.[name]?.table;

      return [
        name,
        {
          ...argType,
          table: {
            ...argType.table,
            category: argType.table?.category ?? extractedTable?.category,
            subcategory:
              argType.table?.subcategory ?? extractedTable?.subcategory
          }
        }
      ];
    })
  );
};

export const withoutPropTypes = <P>(
  component: ComponentType<P>
): ComponentType<P> => {
  const Component: ComponentType<P> = isClassComponent(component)
    ? class extends component {}
    : component.bind(undefined);

  Object.assign(Component, component);
  delete Component.propTypes;

  return Component;
};

export const mergeConfig = <D extends object, const O extends object>(
  defaults: D,
  overrides: O
) =>
  _mergeConfig(defaults, overrides, {
    typings: 'intersection'
  });
