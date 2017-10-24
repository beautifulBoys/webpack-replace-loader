const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const config = {
  entry: {
    index: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        query: {
          presets: ['latest']
        }
      },
      {
        test: /\.js$/,
        loader: 'webpack-replace-loader',
        options: {
          search: '$()',
          replace: '社会主义核心价值观ab',
          attr: 'g'
        }
      },
      {
        test: /\.(png|jpg|svg|gif)$/i,
        loader: 'url-loader',
        query: {
          limit: 200,
          name: 'images/[hash:5].[ext]'
        }
      }
    ]
  }
};

module.exports = config;
