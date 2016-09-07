const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

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
  externals: [nodeExternals()],
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
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
