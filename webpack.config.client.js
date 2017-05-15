const path = require('path')
const srcPath = path.resolve(__dirname, 'src')
const distPath = path.resolve(__dirname, 'dist')

module.exports = {
  context: srcPath,
  target: 'web',

  entry: './client/index.js',
  output: {
    path: distPath,
    filename: 'client.js',
    publicPath: '/'
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['*', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map'
}

