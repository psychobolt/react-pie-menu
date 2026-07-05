# Utils

## [Functions](functions.ts)

### Pseudo State Attr Mapper

`pseudoStateAttrMapper(key, value)`

For augmenting [getPseudoStateArgTypes](../../../commons/.storybook/utils/README.md#get-pseudo-state-arg-types) to generate a attribute map suitable for [spreading](https://open-wc.org/docs/development/lit-helpers/#spread-directives) in Lit.

### Get Pseudo State Arg Types

`getPseudoStateArgTypes({
  argStateAttrMapper = pseudoStateAttrMapper,
  ...options
})`

Utility for Pseudo State [getPseudoStateArgTypes](../../../commons/.storybook/utils/README.md#get-pseudo-state-arg-types). Defaults the `argStateAttrMapper` option to [pseudoStateAttrMapper](#pseudo-state-attr-mapper).

### Story ID Generator

`StoryIdGenerator(prefix = 'story')`

Generates a unique id for your Story. Ideally used for form fields, where the grouping of similiar items affect UI behavior.

#### Usage

```ts
const generateId = StoryIdGenerator('form');

export const MyComponent = () => {
  const id = generateId();
  return html`
    <form id=${id}>
      <input id="${id}__radio_1" type="radio" name="${id}__group"></input>
      <label for="${id}__radio_1">Radio 1</label>
      <input id="${id}__radio_2" type="radio" name="${id}__group"></input>
      <label for="${id}__radio_2">Radio 2</label>
    </form>
  `;
};
```
