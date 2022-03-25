import { rootResolve } from './utils.js';

const appPath = rootResolve();

export default {
  setupFilesAfterEnv: [
    `${appPath}/test-config.js`,
  ],
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['src/**/*.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `${appPath}/__mocks__/file.mock.js`,
    '\\.(css|less)$': `${appPath}/__mocks__/style.mock.js`,
  },
};
