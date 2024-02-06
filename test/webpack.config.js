const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const webpackReplaceLoader = require('../index')

console.log(webpackReplaceLoader)

const config = {
  entry: {
    index: './index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(html)$/,
        use: 'html-loader',
      },
      {
        test: /index\.js$/,
        // loader: 'webpack-replace-loader',
        loader: 'webpack-replace-loader',
        options: {
          arr: [
            {search: '<a class__', replace: '替换成功1'},
            {search: '.a /bcc .g', replace: '替换成功2'},
            {search: '[.a]', replace: '替换成功3'},
            {search: '--{a-x}', replace: '替换成功4'},
            {search: '({[list]})', replace: '替换成功5'},
            {search: '/$/abb^', replace: '替换成功6'},
            {search: '<c><d></>', replace: '替换成功7'},
            {search: '?+^$@><-', replace: '替换成功8'},
            {search: '\'#%"-', replace: '替换成功9'}

          ]
        }
      },
      {
        test: /index\.less$/,
        loader: 'webpack-replace-loader',
        options: {
          arr: [
            {search: 'color: red', replace: 'color: green'}
          ]
        }
      },
      {
        test: /\.html$/,
        loader: 'webpack-replace-loader',
        options: {
          arr: [
            {search: 'span', replace: 'div'},
            {
              search: '$DOM',
              replace: `
                <span class="box">
                  <span class="text">看到我就代表替换 HTML 成功 ( successful ) </span>
                </span>
              `
            }
          ]
        }
      },
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
};

module.exports = config;
