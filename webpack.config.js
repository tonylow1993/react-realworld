let path = require('path');
let webpack = require('webpack');
const embedFileSize = 65536;

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin()/*,
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
    })*/
  ],
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
      {test: /\.css$/, loader: 'style!css?sourceMap'},
      {test: /\.json$/, loader: 'json'},
      {test: /\.mp4/, loader: 'url?limit=' + embedFileSize + '&mimetype=video/mp4'},
      {test: /\.svg/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/svg+xml'},
      {test: /\.png$/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/png'},
      {test: /\.jpg/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/jpeg'},
      {test: /\.gif/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/gif'},
      {
        test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=' + embedFileSize
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