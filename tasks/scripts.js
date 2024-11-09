import pkg from 'gulp'
const { gulp, series, parallel, src, dest, watch } = pkg

import paths from './paths.js'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import TerserPlugin from 'terser-webpack-plugin'
import rename from 'gulp-rename'
import browserSync from 'browser-sync'

const scripts = () => {
  return src(`${paths.src}/${paths.scripts}/main.js`)
    .pipe(dest(`${paths.dist}/${paths.scripts}`))
    .pipe(
      webpackStream(
        {
          mode: 'development',
          devtool: 'inline-source-map',
          performance: { hints: false },
          stats: 'minimal',
          optimization: {
            minimize: true,
            minimizer: [
              new TerserPlugin({
                terserOptions: { format: { comments: false } },
                extractComments: false,
              }),
            ],
          },
          module: {
            rules: [
              {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['babel-plugin-root-import'],
                  },
                },
              },
            ],
          },
        },
        webpack,
      ),
    )
    .pipe(
      rename({
        basename: 'app',
        suffix: '.min',
      }),
    )
    .pipe(dest(`${paths.dist}/${paths.scripts}`))
    .pipe(browserSync.stream())
}

export default scripts
