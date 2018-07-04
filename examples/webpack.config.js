const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['./examples/index.tsx'],
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname),
    port: 8082
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'ts-loader',
            options: { compilerOptions: { declaration: false, moduleResolution: 'node' } },
          },
        ],
      },
    ],
  },
  plugins: [],
  resolve: {
    alias: {
      'react-with-observable': path.join(__dirname, '..', 'src'),
    },
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
  },
};
