import pkg from 'gulp'
const { gulp, series, parallel, src, dest, watch } = pkg

import paths from './paths.js'
import fileinclude from 'gulp-file-include'
import formatHTML from 'gulp-format-html'
import browserSync from 'browser-sync'

const htmlIncludes = () => {
  return src(`${paths.src}/*.html`)
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      }),
    )
    .on('error', function (error) {
      console.log(error)
    })
    .pipe(formatHTML())
    .pipe(dest(`${paths.dist}`))
    .pipe(browserSync.stream())
}

export default htmlIncludes
