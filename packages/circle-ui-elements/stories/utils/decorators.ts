import type { Decorator } from '@storybook/web-components-vite';
import { html } from 'lit';

export const withWidth =
  (width: string): Decorator =>
  (Story) =>
    html`<div style="position: relative; width: ${width}">${Story()}</div>`;

export const withHeight =
  (height: string): Decorator =>
  (Story) =>
    html`<div style="position: relative; height: ${height}">${Story()}</div>`;
