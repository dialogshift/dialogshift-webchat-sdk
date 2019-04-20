var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  target: 'web',
  devtool: 'source-map',
  entry: {
    app: [
      'webpack-dev-server/client?https://0.0.0.0:8383',
      'webpack/hot/dev-server',
      './src/index.js',
      './src/index.html',
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'main.css' }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader',
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=[path][name].[ext]&context=src',
      },
    ],
  },
}
