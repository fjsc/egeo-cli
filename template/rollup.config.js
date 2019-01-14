import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve'
import pkg from './package.json'
import cleaner from 'rollup-plugin-cleaner';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'st-element.ts',
  output: [{
    file: pkg.main, format: 'umd', name: 'MyLibrary'
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  /*external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],*/
  plugins: [
    // rollup-plugin-progress
    progress(),
    // rollup-plugin-node-resolve
    resolve(),
    // rollup-plugin-typescript2
    typescript(),
    // rollup-plugin-filesize
    filesize(),
    // rollup-plugin-commonjs
    commonjs(),
    // rollup-plugin-alias
    !production && serve({
      open: true,
      contentBase: ['dist/', 'demo/', 'node_modules/']
    }),
    !production && livereload(),
  ]
}
