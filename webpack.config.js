const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'production'
const isDev = NODE_ENV === 'development'
const isProd = NODE_ENV === 'production'
const distPath = path.join(__dirname, '/public/build')
const publicPath = path.join(distPath, '/')

const webpackConfig = {
  /**
   * Директория относительно которой производится
   * поиск входных точек
   */
  context: path.join(__dirname, 'app'),

  entry: {
    'app': './index.js'
  },

  output: {
    path: distPath,
    /**
     * Путь из которого будут подгружатся динамические модули,
     * обязательно со слешем вконце
     */
    publicPath,
    filename: '[name].build.js'
  },

  mode: NODE_ENV,

  devtool: isDev ? 'source-map' : false,

  /**
   * Следит за изменениями в файле и запускуает пересборку
   */
  watch: isDev,

  plugins: [
    /**
     * Нужен для пробрасывания переменных окружения в глобальный доступ,
     * переменные будут доступны через process.env
     */
    new webpack.EnvironmentPlugin(['NODE_ENV']),

    /**
     * Нужен для пробрасывания переменных окружения в глобальный доступ,
     * переменные будут доступны напрямую
     * Переданная строка, вставляется как фрагмент кода
     */
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(isDev)
    })
  ],

  resolve: {
    /**
     * Директория в которой осуществляется поиск на случай
     * когда не указывается относительный путь, например:
     * import module from 'module'
     */
    modules: ['node_modules'],
    /**
     * Формат файлов которые будут обрабатыватся webpack при сборке
     */
    extensions: ['.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              /**
               * Добавляет поддержку старых браузеров из browserslist
               */
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'static/assets/',
              publicPath: 'build/static/assets/'
            }
          }
        ]
      }
    ]
  },

  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, '/public')
  }
}

if (isProd) {
  webpackConfig.optimization = {
    /**
     * Минифицирует сборку, убирает комментарии
     */
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true,
          output: {
            comments: false,
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false
        }
      })
    ]
  }
}

module.exports = webpackConfig
