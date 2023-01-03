import { Configuration } from 'webpack';
import * as path from "path";
import CopyPlugin from "copy-webpack-plugin";

const config: Configuration = {
  mode: 'development',
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  entry: {
    background: path.join(__dirname, 'src/background.ts'),
    contents: path.join(__dirname, 'src/contents.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "manifest.json",
          to: path.join(__dirname, 'dist'),
        }
      ]
    })
  ],
  devtool: 'cheap-module-source-map',
  cache: true,
  watchOptions:{
    poll: true,
  },
}

export default config;
