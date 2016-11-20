const devtool = process.env.NODE_ENV !== 'production' ? 'source-map' : undefined

module.exports = {
  devtool: devtool,
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.(png|jpg|gif|svg|woff|eot|ttf)$/,
      loader: 'url',
      query: {
        limit: 8148,
        name: 'assets/[name].[ext]?[hash]'
      }
    }]
  },
  plugins: [
  ]
}
