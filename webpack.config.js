require('dotenv').load();

var Path = require('path');
var WebPack = require('webpack');
var autoprefixer = require('autoprefixer');

var env = process.env.NODE_ENV;
var srcPath = Path.resolve(__dirname, 'src');
var distPath = Path.resolve(__dirname, 'dist');

module.exports = {
  target: 'web',
  context: srcPath,
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    './index',
  ],
  output: {
    path: distPath,
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
    alias: {
      actions: Path.resolve(srcPath, 'actions'),
      components: Path.resolve(srcPath, 'components'),
      constants: Path.resolve(srcPath, 'constants'),
      containers: Path.resolve(srcPath, 'containers'),
      lib: Path.resolve(srcPath, 'lib'),
      reducers: Path.resolve(srcPath, 'reducers'),
      selectors: Path.resolve(srcPath, 'selectors'),
      styles: Path.resolve(srcPath, 'styles'),
      utils: Path.resolve(srcPath, 'utils')
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new WebPack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      },
      'NODE_ENV': env,
      '__DEV__': env === 'development',
      '__PROD__': env === 'production',
      '__DEBUG__': env === 'development'
    }),
    new WebPack.optimize.OccurrenceOrderPlugin(),
    new WebPack.optimize.DedupePlugin()
  ].concat(
    (env == 'production') ? [
      new WebPack.optimize.UglifyJsPlugin({
        compress : {
          unused: true,
          dead_code: true
        }
      })
    ] : [
      new WebPack.HotModuleReplacementPlugin(),
      new WebPack.NoErrorsPlugin()
    ]
  ),
  devServer: {
    host: 'localhost',
    port: 3000,
    publicPath: 'http://localhost:3000/',
    contentBase: srcPath,
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  },
  postcss: [autoprefixer]
};
