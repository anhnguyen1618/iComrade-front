const webpack = require('webpack');
const merge = require('webpack-merge').smart;

const PATHS = require('./paths.js')
const common = require('./common.config.js')

module.exports = merge({
  devtool: 'inline-source-maps',

  devServer: {
    contentBase: PATHS.build,
    host: '0.0.0.0',
    port: 8080,
    inline: true,
    hot: true,
    stats: 'errors-only',
    historyApiFallback: {
      index: 'index.html'
    },
    watchOptions: { poll: true, ignored: /node_modules/ },
    proxy: {
      '/api': {
        target: 'http://icomrade.ggufpa3twb.eu-central-1.elasticbeanstalk.com/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': 'http://icomrade.ggufpa3twb.eu-central-1.elasticbeanstalk.com/api'
        }
      },

      '/socket.io': {
        target: 'http://icomrade.ggufpa3twb.eu-central-1.elasticbeanstalk.com/',
        changeOrigin: true,
        secure: false
      }
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}, common)
