import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import { merge } from 'webpack-merge'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

import prodConfig from './webpack.prod'
import devConfig from './webpack.dev'

const resolveApp = (relativePath: string) => path.resolve(__dirname, relativePath)

const getPublicPath = () => {
  const homePage = require(resolveApp('package.json')).homepage

  if (process.env.NODE_ENV === 'development') {
    return ''
  }
  else if (process.env.PUBLIC_URL) {
    return process.env.PUBLIC_URL
  }
  else if (homePage) {
    return homePage
  }
  return '/'
}

const getEnvVariables = () => ({ PUBLIC_URL: getPublicPath(), VERSION: require(resolveApp('package.json')).version })

export default function () {
  const isEnvProduction = process.env.NODE_ENV === 'production'

  const commonConfig = {
    entry: './src/index.ts',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            globOptions: {
              ignore: [
                '**/index.html'
              ]
            }
          },
        ],
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: resolveApp('public/index.html'),
        ...getEnvVariables()
      }),
      // new MiniCssExtractPlugin({ filename: '[name].bundle.css' }),
    ],

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: path.resolve('./loader/fileinfo-loader.ts'),
              options: {
                public: true,
                fullpath: false,
                fullpath111: false,
              }
            },
            {
              loader: 'ts-loader',
            }]
        },
      ]
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
  }

  if (isEnvProduction) return merge(commonConfig, prodConfig as any)
  else return merge(commonConfig, devConfig as any)
}
