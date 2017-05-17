let path = require('path');
let webpack = require('webpack');
const embedFileSize = 65536;

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'server', 'public', 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  /*plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
    })
  ],*/
  resolve: {
    extensions: ['.js','.jsx', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets:[ 'es2015', 'react', 'stage-2' ]
        }
      },
      {test: /\.css$/, loader: 'style-loader!css-loader?sourceMap'},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.mp4/, loader: 'url-loader?limit=' + embedFileSize + '&mimetype=video/mp4'},
      {test: /\.svg/, loader: 'url-loader?limit=' + embedFileSize + '&mimetype=image/svg+xml'},
      {test: /\.png$/, loader: 'url-loader?limit=' + embedFileSize + '&mimetype=image/png'},
      {test: /\.jpg/, loader: 'url-loader?limit=' + embedFileSize + '&mimetype=image/jpeg'},
      {test: /\.gif/, loader: 'url-loader?limit=' + embedFileSize + '&mimetype=image/gif'},
      {
        test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=' + embedFileSize
      }
    ],
    /*preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [new RegExp(path.join(__dirname, 'src'))]
      }
    ]*/
  },
  /*eslint: {
    configFile: '.eslintrc'
  }*/
};