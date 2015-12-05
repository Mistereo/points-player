require('dotenv').load();

var Path = require('path');
var WebPack = require('webpack');

var folders = {
  src: Path.resolve(__dirname, 'src'),
  dist: Path.resolve(__dirname, 'dist')
};

module.exports = {
  target: 'web',
  context: folders.src,
  entry: [
    './index',
  ],
  output: {
    path: folders.dist,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new WebPack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      },
    }),
    new WebPack.optimize.OccurrenceOrderPlugin(),
    new WebPack.optimize.DedupePlugin()
  ],
  postcss: [require('autoprefixer')]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new WebPack.optimize.UglifyJsPlugin({
      compress : {
        unused: true,
        dead_code: true
      }
    })
  );
}

if (process.env.NODE_ENV === 'development') {
  module.exports.devtool = 'cheap-module-eval-source-map';
  module.exports.entry.push(
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server'
  );
  module.exports.plugins.push(
    new WebPack.HotModuleReplacementPlugin(),
    new WebPack.NoErrorsPlugin()
  );
  module.exports.devServer = {
    host: 'localhost',
    port: 3000,
    publicPath: 'http://localhost:3000/',
    contentBase: folders.src,
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  };
}
