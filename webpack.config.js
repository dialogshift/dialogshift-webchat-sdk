const path = require('path')
const WebpackAutoInject = require('webpack-auto-inject-version')

module.exports = (env, argv) => ({
  entry: {
    index: './src/scripts/index.ts',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, 'bundles'),
    filename:
      'dialogshift-webchat-sdk' +
      (argv.mode === 'production' ? '.umd.min.js' : '.umd.js'),
    libraryTarget: 'umd',
    umdNamedDefine: true,
    library: 'Dialogshift',
  },
  externals: [],
  devtool: 'source-map',
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
  plugins: [
    new WebpackAutoInject({
      componentsOptions: {
        InjectAsComment: {
          tag: 'Build version: {version}',
        },
      },
    }),
  ],
})
