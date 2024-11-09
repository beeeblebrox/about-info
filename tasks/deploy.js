import pkg from 'gulp'
const { gulp, series, parallel, src, dest, watch } = pkg

import paths from './paths.js'
import rsync from 'gulp-rsync'

const deploy = () => {
  return src(paths.dist).pipe(
    rsync({
      root: paths.dist,
      hostname: 'username@hostname.com',
      destination: 'yousite/public_html/',
      recursive: true,
      archive: true,
      silent: false,
      compress: true,
    }),
  )
}

export default deploy
