import * as path from 'path';
import * as process from 'process';

export const root = path.join.bind(path, path.resolve(__dirname, '..'));

export const hasProcessFlag = flag => process.argv.join('').indexOf(flag) > -1;
export const isWebpackDevServer = () =>
  process.argv[1] && !!/webpack-dev-server/.exec(process.argv[1]);
