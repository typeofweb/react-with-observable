const path = require('path');
const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['./examples/index.tsx'],
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js',
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
  plugins: [
    new webpack.DefinePlugin({
      'VERSION': JSON.stringify(gitRevisionPlugin.version()),
    })
  ],
  resolve: {
    alias: {
      'react-with-observable': path.join(__dirname, '..', 'src'),
    },
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
  },
};
