const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const precss = require('precss')
const autoprefixer = require('autoprefixer') // ({browsers: ['last 3 versions']})
const config = require('./webpack.base.config')

module.exports = Object.assign({}, config, {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: './dist/public',
    filename: '[name].js',
  },
  module: {
    loaders: [
      ...config.module.loaders,
      {
        test: /.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css!postcss',
        })
      }
    ]
  },
  plugins: [
    ...config.plugins,
    new ExtractTextPlugin('style.css'),
    new webpack.LoaderOptionsPlugin({
      test: /.css$/,
      options: {
        postcss() {
          return [precss, autoprefixer]
        }
      }
    })
  ]
})
