const config = require('./webpack.base.config')
const webpack = require('webpack')
const assets = ['normalize.css', 'github-markdown-css']

const externals = Object.keys(require('../package.json').dependencies)
  .filter(item => assets.indexOf(item) < 0)

module.exports = Object.assign({}, config, {
  entry: {
    App: './src/components/App.js'
  },
  output: {
    path: './dist/',
    filename: 'components/[name].js',
    libraryTarget: 'commonjs2'
  },
  externals,
  target: 'node',
  module: {
    loaders: [
      ...config.module.loaders,
      {
        test: /.css$/,
        loader: 'ignore'
      }
    ]
  },
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
})
