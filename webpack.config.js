var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
  entry: {
    app: ["./dist/index.js"]
  },
  output: {
    publicPath: '/dist/',
    filename: "bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    alias: {
      jquery: "jquery/src/jquery"
    }
  },
  module: {
    loaders: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.pug$/, loader: "pug-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
