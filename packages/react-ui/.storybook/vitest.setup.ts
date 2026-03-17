import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/react-vite';

import preview from './preview.ts';

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const project = setProjectAnnotations([preview.input]);

beforeAll(project.beforeAll);
