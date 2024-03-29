import { Configuration } from 'webpack';
import * as path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

const config: Configuration = {
  mode: 'development',
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  entry: {
    background: path.join(__dirname, 'src/background.ts'),
    contents: path.join(__dirname, 'src/contents.ts'),
    popup: path.join(__dirname, 'src/popup/App.tsx'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'public/manifest.json',
          to: path.join(__dirname, 'dist'),
        },
        {
          from: path.join(__dirname, 'public/popup.html'),
          to: path.join(__dirname, 'dist'),
        },
      ],
    }),
  ],
  devtool: 'inline-source-map',
  cache: true,
  watchOptions: {
    poll: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

export default config;
