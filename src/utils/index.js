import styled from 'styled-components';

export const withTheme = (componentName, elementName) => Component => styled(Component)`
  ${({ theme }) => theme.default[componentName][elementName]}
`.extend`
  ${({ theme }) => theme.custom[componentName] && theme.custom[componentName][elementName]}
`;
