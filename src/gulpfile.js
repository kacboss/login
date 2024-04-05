const { watch, src, dest, series, parallel } = require('gulp')
const postcss = require('gulp-postcss')
const uglify = require('gulp-uglify-es').default
const env = require('gulp-env')
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat')
const sassGlob = require('gulp-sass-glob')
const browserSync = require('browser-sync')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const npmFiles = require('npmfiles')
const rollup = require('gulp-rollup')
const babel = require('rollup-plugin-babel')
const logger = require('eazy-logger').Logger({
  useLevelPrefixes: false
})

env({ file: '../.env', type: 'ini' })

const __ = {
  proxy: process.env.GULP_PROXY || 'http://localhost:' + process.env.PORT_WORDPRESS,
  sourcemaps: true,
  //location: '/../' + process.env.GULP_THEME_LOCATION ||
  location: './../theme'
}



function vendorJsTask(done) {
  const jsFiles = npmFiles().map(e => e.replace(__dirname, '.')).filter(e => new RegExp('^.+\.js$').test(e))

  jsFiles.forEach(e => logger.info(e))

  src(jsFiles)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .on('error', error)
    .pipe(dest(__dirname + __.location + '/scripts'))

  done()
}

function mainJsTask(done) {
  src(['scripts/**/*.js', '!scripts/**/_*.js'], { sourcemaps: __.sourcemaps })
    .pipe(rollup({
      allowRealFiles: true,
      input: './scripts/main.js',
      output: {
        format: 'iife'
      },
      plugins: [
        babel({
          presets: [['@babel/env', { modules: false }]],
          exclude: 'node_modules/**',
          babelrc: false
        })
      ]
    }))
    .on('error', error)
    .pipe(uglify())
    .on('error', error)
    .pipe(dest(__dirname + __.location + '/scripts', { sourcemaps: __.sourcemaps ? '.' : false }))

  done()
}

function scssTask(done) {
  src(['styles/**/*.scss', '!styles/**/_*.scss'], { sourcemaps: __.sourcemaps })
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: 'compressed' }))
    .on('error', error)
    .pipe(postcss([autoprefixer({ grid: true }), cssnano()]))
    .on('error', error)
    .pipe(dest(__dirname + __.location + '/styles', { sourcemaps: __.sourcemaps ? '.' : false }))
    .pipe(browserSync.stream())

  done()
}

function watchFiles(done) {
  watch('./package.json', series(clear, vendorJsTask, reload))
  watch('./scripts/**/*.js', { interval: 1000 }, series(clear, mainJsTask, reload))
  watch('./styles/**/*.scss', { interval: 1000 }, series(clear, scssTask))
  watch(__.location + '/**/*.(twig|php)', { interval: 1000 }, series(clear, reload))
  done()
}

function liveReload(done) {
  browserSync.init({
    proxy: __.proxy || false
  }, (err, bs) => {
    browserSync.options = bs.options
    clear()
  })

  done()
}

function reload(done) {
  browserSync.reload()
  done()
}

function error(error) {
    console.log(error);
  this.emit('end')
}

function clear(done) {
  const { options } = browserSync
  const urls = options.get('urls').toJS()

  console.clear()
  logger.info('    Proxying: {magenta:%s', options.get('proxy').toJS().target)
  logger.info('{grey:--------------------------------------}')
  logger.info('       Local: {magenta:%s}', urls.local)
  logger.info('    External: {magenta:%s}', urls.external)
  logger.info('{grey:--------------------------------------}')
  logger.info('         UI: {magenta:%s}', urls.ui)
  logger.info('UI External: {magenta:%s}', urls['ui-external'])
  logger.info('{grey:--------------------------------------}')

  done && done()
}


exports.watch = parallel(vendorJsTask, mainJsTask, scssTask, watchFiles, liveReload)
