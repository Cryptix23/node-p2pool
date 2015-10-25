'use strict'

var gulp = require('gulp')
var standard = require('gulp-standard')
var mocha = require('gulp-mocha')
var istanbul = require('gulp-istanbul')
var coveralls = require('gulp-coveralls')

gulp.task('standard', function () {
  return gulp.src(['./app.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('test', function (cb) {
  gulp.src([
    './dataStructures/**/*.js',
    './index.js'
  ])
  .pipe(istanbul())
  .on('finish', function () {
    gulp.src([
      './tests/**/*.js'
    ])
    .pipe(mocha({ reporter: 'spec' }))
    .pipe(istanbul.writeReports()) // stores reports in "coverage" directory
    .on('end', cb)
  })
})

gulp.task('coveralls', function (cb) {
  return gulp.src('./coverage/lcov.info')
  .pipe(coveralls())
})

gulp.task('watch', function () {
  gulp.watch('./tests/**', ['test'])
})

gulp.task('default', ['standard', 'test'])
