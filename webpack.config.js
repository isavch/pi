const path = require('path');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'client'),
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  mode: 'production',
  devServer: {
    port: 9000,
    historyApiFallback: true,
    proxy: {
      '/login': 'http://localhost:3000'
    }
  },
  plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({ template: 'index.html' }),
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, 'client', 'icons'),
            to: path.resolve(__dirname, 'dist', 'icons')
          },
          {
            from: path.resolve(__dirname, 'client', 'src', 'lib'),
            to: path.resolve(__dirname, 'dist')
          },
          {
            from: path.resolve(__dirname, 'client', 'manifest.json'),
            to: path.resolve(__dirname, 'dist', 'manifest.json')
          }
      ]),
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
};