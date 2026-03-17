import arg from 'arg';
import { hash } from 'commons/esm/bin/utils/functions.js';

const { _ } = arg({}, { permissive: true });

const [algorithm, data] = _.length < 2 ? ['sha1', ..._] : _;

console.log(hash(algorithm, data));
