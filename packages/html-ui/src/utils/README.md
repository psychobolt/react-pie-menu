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
