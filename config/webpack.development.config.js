/* eslint-disable import/no-extraneous-dependencies */
/* global process */
/* global __dirname */

const path = require("path");
const HWP = require('html-webpack-plugin');
const webpack = require("webpack");

const ENV_VARIABLES = {
  NODE_ENV: '"development"',
  APP_VERSION: '"dev"',
};

const OUTPUT = path.resolve(__dirname, "../build");

module.exports = {
  name: "client",
  mode: "development",
  target: "web",
  devtool: "source-map",
  entry: "./src/index.js",
  optimization: { usedExports: true },
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      '@src': path.join(__dirname, '../src'),
      react: path.resolve(path.join(__dirname, "../node_modules/react"))
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/(node_modules\/)/],
        use: ["babel-loader"]
      },
      
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
                mode: "global"
              }
            }
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-react-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ "process.env": ENV_VARIABLES }),
    new webpack.HotModuleReplacementPlugin(),
    new HWP({ template: path.join(__dirname, "../src/index.html") })
  ],
  devServer: {
    contentBase: OUTPUT,
    compress: true,
    host: "0.0.0.0",
    port: 9000
  }
};

