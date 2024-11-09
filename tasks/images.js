import pkg from 'gulp'
const { gulp, series, parallel, src, dest, watch } = pkg

import paths from './paths.js'
import imagemin from 'gulp-imagemin'

const images = () => {
  return src([
    `${paths.dist}/${paths.images}/**/*`,
    `!${paths.dist}/${paths.images}/**/favicons/**/*`,
    `!${paths.dist}/${paths.images}/**/sprite.svg`,
  ])
    .pipe(imagemin())
    .pipe(dest(`${paths.dist}/${paths.images}`))
}

export default images
