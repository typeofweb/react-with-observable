import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        name: 'react-with-observable',
        file: pkg.browser,
        format: 'umd',
        globals: {
          react: 'React',
          'create-subscription': 'createSubscription',
        },
      },
      {
        name: 'react-with-observable',
        file: pkg.module,
        format: 'es',
      },
      {
        name: 'react-with-observable',
        file: pkg.main,
        format: 'cjs',
      },
    ],
    plugins: [
      resolve(),
      commonjs({
        include: 'node_modules/**',
      }),
      typescript(),
    ],
    external: ['react', 'react-dom', 'create-subscription'],
  },
];
