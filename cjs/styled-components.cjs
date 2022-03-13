// See: https://github.com/styled-components/styled-components/issues/3601

const { default: styled, css, ...rest } = require('styled-components');

module.exports = { ...styled, css, ...rest };
