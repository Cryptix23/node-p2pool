'use strict'

var gulp = require('gulp')
var standard = require('gulp-standard')
var mocha = require('gulp-mocha')
var istanbul = require('gulp-istanbul')
var coveralls = require('gulp-coveralls')
var jsc = require('gulp-jscoverage')

gulp.task('standard', function () {
  return gulp.src(['./app.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('test', function (cb) {
  gulp.src([
    // './dataStructures/**/*.js',
    './src/**/*.js',
    './test/**/*.js',
    './index.js'
  ])
  .pipe(istanbul({includeUntested: true}))
  .on('finish', function () {
    gulp.src([
      './test/**/*.js'
    ])
    .pipe(mocha({ reporter: 'mocha-lcov-reporter' }))
    .pipe(jsc())
    .pipe(istanbul.writeReports()) // stores reports in "coverage" directory
    .on('end', cb)
  })
})

gulp.task('coveralls', function (cb) {
  return gulp.src('./coverage/lcov.info')
  .pipe(coveralls())
})

gulp.task('watch', function () {
  gulp.watch('./test/**', ['test'])
})

gulp.task('default', ['standard', 'test', 'coveralls'])
