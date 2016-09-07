var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    path.join(__dirname, 'app.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].prod.js',
    publicPath: '/'
  },
  target: 'node',
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    noParse: ['ws'],
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-3'],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }]
  },
}
