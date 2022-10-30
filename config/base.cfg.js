const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PugPlugin = require('pug-plugin');



module.exports = {
  entry: {
    index: './src/pages/index/index.pug'
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:7].js',
    publicPath: '/'
  },

  module: {
    rules: [{
        test: /\.pug$/,
        use: {
          loader: PugPlugin.loader,
        }
      },

      {
        test: /\.(png|jpe?g|gif|ico|webp)$/,
        type: 'asset',
        generator: {
          filename: 'assets/images/[name].[contenthash:7].[ext]'
        },
      },

      {
        test: /\.svg$/,
        exclude: [
          path.resolve(__dirname, '../src/assets/fonts'),
          path.resolve(__dirname, '../src/assets/favicons')
        ],

        use: [{
            loader: 'svg-sprite-loader',
            options: {
              symbolId: filePath => path.basename(filePath, '.svg'),
              spriteFilename: 'assets/images/sprite.[contenthash:7].svg',
            }
          },
        ]
      },
      

      {
        test: /\.(mp4|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        include: path.resolve(__dirname, '../src/assets/media'),
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/media/[name].[contenthash:7].[ext]',
          }
        }]
      },
      {
        test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
        include: path.resolve(__dirname, '../src/assets/fonts/'),
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[ext]'
        }
      },
      {
        test: /.*/,
        include: path.resolve(__dirname, '../src/assets/favicons/'),
        type: 'asset/resource',
        generator: {
          filename: 'assets/favicons/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new SpriteLoaderPlugin(),

    new PugPlugin({
      pretty: true, 
      extractCss: {
        filename: 'css/[name].[contenthash:7].css',
      },
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
  ],

  resolve: {
    alias: {
      '~node-modules': path.resolve(__dirname, '../node_modules'),
      '~dev-tools': path.resolve(__dirname, '../dev-tools'),
      '~src': path.resolve(__dirname, '../src'),
      '~pages': path.resolve(__dirname, '../src/pages'),
      '~blocks': path.resolve(__dirname, '../src/blocks'),
      '~scss': path.resolve(__dirname, '../src/common/scss'),
      '~pug': path.resolve(__dirname, '../src/common/pug'),
      '~js': path.resolve(__dirname, '../src/common/js'),
      '~css': path.resolve(__dirname, '../src/common/css'),
      '~images': path.resolve(__dirname, '../src/assets/images'),
      '~assets': path.resolve(__dirname, '../src/assets'),
    }
  },
};