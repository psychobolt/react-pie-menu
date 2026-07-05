import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register(process.env.ESM_REGISTER, pathToFileURL('./').toString());
