/* Vars */

import pkg from 'gulp'
const { gulp, series, parallel, src, dest, watch } = pkg

import paths from './tasks/paths.js'
// import scripts from './tasks/scripts.js'
import styles from './tasks/styles.js'
import images from './tasks/images.js'
import sprite from './tasks/sprite.js'
import htmlIncludes from './tasks/html.js'
import ghDeploy from './tasks/ghDeploy.js'

import browserSync from 'browser-sync'
import devip from 'dev-ip'

/* Create Server */

function createServer() {
  browserSync.init({
    server: { baseDir: paths.dist },
    notify: false,
    open: false,
    host: getHostIP(),
    // tunnel: 'someproject-v1', // URL: https://someproject-v1.loca.lt
  })
}

function getHostIP() {
  let ipList = devip()
  return ipList[ipList.length - 1]
}

/* Start Watch */

function startWatch() {
  watch([
    `${paths.src}/${paths.styles}/**/*.{css,sass,scss}`,
    `!${paths.src}/${paths.styles}/**/*.min.css`,
  ], styles)
  watch([
    `${paths.dist}/${paths.scripts}/**/*.js`,
    `!${paths.dist}/${paths.scripts}/**/*.min.js`,
  ]).on('change', browserSync.reload)
  watch(`${paths.dist}/${paths.images}/icons/**/*`, sprite)
  watch(`${paths.dist}/${paths.images}/**/*`).on('change', browserSync.reload)
  watch(`${paths.src}/**/*.html`).on('change', htmlIncludes)
  watch(`${paths.src}/**/*.{twig,tpl,php,json,txt,md,woff,woff2,ttf}`).on('change', browserSync.reload)
}

/* Exports */

export { htmlIncludes, styles, images, sprite, ghDeploy }

export const deploy = series(parallel(htmlIncludes, styles), images, sprite, ghDeploy)

export default series(
  parallel(htmlIncludes, styles),
  parallel(createServer, startWatch),
)
