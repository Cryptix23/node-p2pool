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

gulp.task('pre-test', function () {
  return gulp.src(['src/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire())
})

gulp.task('test', ['pre-test'], function (cb) {
  return gulp.src([
    './test/**/*.js'
  ])
  .pipe(mocha({ reporter: 'spec' }))
  // .pipe(jsc())
  .pipe(istanbul.writeReports()) // stores reports in "coverage" directory
})

gulp.task('coveralls', function (cb) {
  return gulp.src('./coverage/lcov.info')
  .pipe(coveralls())
})

gulp.task('watch', function () {
  gulp.watch('./test/**', ['test'])
})

gulp.task('default', ['standard', 'test', 'coveralls'])
