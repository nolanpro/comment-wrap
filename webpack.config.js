// https://github.com/krausest/ts-webpack-hmr
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
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    alias: {
      jquery: "jquery/src/jquery"
    }
  },
  module: {
    loaders: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.ts$/, loader: "ts-loader" },
    ]
  },
  plugins: [],
}
