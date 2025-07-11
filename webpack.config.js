const path = require('path')
const webpack = require('webpack')
// const envConfig = require('./src/scripts/config/env-config.ts')

module.exports = (env, argv) => ({
  mode: process.env.NODE_ENV === 'prod' ? 'production' : 'development',
  entry: {
    index: './src/scripts/index.ts',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, 'bundles'),
    filename: 'dialogshift-webchat-sdk' + '.umd.js',
    umdNamedDefine: true,
    library: {
      name: 'Dialogshift',
      type: 'window',
    },
  },
  externals: [],
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        options: {
          configFile: require.resolve('./tsconfig.webpack.json'),
        },
      },
    ],
  },
  plugins: [],
})
