import pkg from 'gulp'
const { gulp, series, parallel, src, dest, watch } = pkg

import paths from './paths.js'
import svgSprite from 'gulp-svg-sprite'

const sprite = () => {
  return src(`${paths.dist}/${paths.images}/icons/*.svg`)
    .pipe(
      svgSprite({
        shape: {
          dimension: {
            maxWidth: 500,
            maxHeight: 500,
          },
          spacing: {
            padding: 0,
          },
        },
        mode: {
          symbol: {
            dest: '.',
            sprite: 'sprite.svg',
          },
        },
      }),
    )
    .on('error', function (error) {
      console.log(error)
    })
    .pipe(dest(`${paths.dist}/${paths.images}`))
}

export default sprite
