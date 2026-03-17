import path from 'node:path';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		modules: {
			localsConvention: 'camelCase'
		}
	},
	server: {
		fs: {
			allow: [
				searchForWorkspaceRoot(process.cwd()),
				process.env.YARN_GLOBAL_FOLDER ?? path.resolve('../../.temp/.yarn')
			]
		}
	}
});
