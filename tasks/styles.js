import pkg from 'gulp'
const { gulp, series, parallel, src, dest, watch } = pkg

import paths from './paths.js'
import postcss from 'gulp-postcss'
import atImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import gcmq from 'gulp-group-css-media-queries'
import rename from 'gulp-rename'
import browserSync from 'browser-sync'

const styles = () => {
  return src(`${paths.src}/${paths.styles}/index.css`)
    .pipe(
      postcss([
        atImport(),
        autoprefixer({ cascade: false, grid: 'autoplace' }),
      ])
      .on('error', function(err) {
        console.error(err.toString());
        this.emit('end');
      }),
    )
    .pipe(rename({ basename: 'style' }))
    .pipe(dest(`${paths.dist}/${paths.styles}`))
    // .pipe(gcmq())
    // .pipe(
    //   postcss([
    //     cssnano({
    //       preset: ['default', { discardComments: { removeAll: true } }],
    //     }),
    //   ]),
    // )
    // .pipe(rename({ suffix: '.min' }))
    // .pipe(dest(`${paths.dist}/${paths.styles}`))
    .pipe(browserSync.stream())
}

export default styles
