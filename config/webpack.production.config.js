/* eslint-disable */

const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


const INPUT = "./src/index.js";
const OUTPUT = path.resolve(__dirname, "../build");
console.log(OUTPUT);
const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new MiniCssExtractPlugin({
    filename: "main.css",
    chunkFilename: "main.css"
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "../src/index.html"),
    inject: true,
  }),
];

module.exports = {
  name: "client",
  mode: "production",
  target: "web",
  devtool: "source-map",
  entry: [INPUT],
  output: {
    path: OUTPUT,
    filename: "[hash].js",
    chunkFilename: "[chunkhash].js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
    alias: {
      "@src": path.join(__dirname, "../src"),
      react: path.resolve(path.join(__dirname, "../node_modules/react"))
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/(node_modules\/)/, /(hsl\/)/],
        use: ["babel-loader"]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: { includePaths: [path.join(__dirname, "../src/")] }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-react-loader"
      },
    ]
  },
  plugins,
  optimization: {
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.s?css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  }
};
