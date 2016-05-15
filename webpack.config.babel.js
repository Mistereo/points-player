require('dotenv').load();

import path from 'path';
import WebPack from 'webpack';
import HTMLPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';

const folders = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

const ENV = process.env.NODE_ENV;

module.exports = {
  target: 'web',
  devtool: 'source-map',
  context: folders.src,
  entry: [
    './index',
  ],
  output: {
    path: folders.dist,
    publicPath: 'http://localhost:3000/',
    filename: 'bundle.min.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new WebPack.DefinePlugin({
      __ENVIRONMENT__: ENV,
      __DEVELOPMENT__: ENV === 'development',
      __PRODUCTION__: ENV === 'production',
      __DEBUG__: ENV === 'development',
      __TEST__: ENV === 'test',
      'process.env': { NODE_ENV: JSON.stringify(ENV) },
    }),
    new HTMLPlugin({
      template: path.resolve(folders.src, 'index.html'),
      hash: false,
      inject: 'body',
    }),
  ],
  postcss: [autoprefixer],
  devServer: {
    host: 'localhost',
    port: 3000,
    publicPath: 'http://localhost:3000/',
    contentBase: folders.src,
    hot: true,
    inline: true,
    quiet: false,
    noInfo: true,
    lazy: false,
    historyApiFallback: true,
    stats: {
      colors: true,
    },
  },
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new WebPack.optimize.OccurrenceOrderPlugin(),
    new WebPack.optimize.DedupePlugin(),
    new WebPack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
      },
    })
  );
}

if (process.env.NODE_ENV === 'development') {
  module.exports.devtool = 'cheap-module-eval-source-map';
  module.exports.plugins.push(
    new WebPack.NoErrorsPlugin()
  );
}
