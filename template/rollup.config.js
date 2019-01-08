import typescript from 'rollup-plugin-typescript2';
import livereload from 'rollup-plugin-livereload';
import sourcemaps from 'rollup-plugin-sourcemaps';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy-glob';
import resolve from 'rollup-plugin-node-resolve';

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
    cleanup(),
    typescript({
      typescript: require('typescript'),
    }),
    production && copy([
      { 
        files: 'src/demo/*.*', dest: 'dist/demo' 
    }]),
    sourcemaps(),
    !production && serve({
      open: true,
      contentBase: ['dist/']
    }),
    !production && livereload(),
  ]
}