import typescript from 'rollup-plugin-typescript2';
import livereload from 'rollup-plugin-livereload';
import sourcemaps from 'rollup-plugin-sourcemaps';

import serve from 'rollup-plugin-serve'
import pkg from './package.json'

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/st-element.ts',
  output: [{
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    sourcemaps(),
    serve(['src/demo', 'node_modules']),
    livereload(),

  ],
}