import pkg from 'gulp'
import ghPages from 'gulp-gh-pages'
import paths from './paths.js'

const { gulp, series, parallel, src, dest, watch } = pkg

const build = () => {
  return src(`${paths.dist}/**/*`)
    .pipe(ghPages());
}

export default build
