// https://github.com/krausest/ts-webpack-hmr
var webpack = require('webpack');
module.exports = {
  entry: "./index.ts",
  context: __dirname,
  devServer: {
    contentBase: [
      "assets",
    ],
    hot: true,
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts-loader" },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
}
