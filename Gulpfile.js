'use strict'

var gulp = require('gulp')
// Start of the actual gulp

var standard = require('gulp-standard')

gulp.task('standard', function () {
  return gulp.src(['./app.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

var mocha = require('gulp-mocha')

gulp.task('mocha', function () {
  return gulp.src('test/*', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({reporter: ' mocha-lcov-reporter'}))
})

var coveralls = require('gulp-coveralls')

// coveralls task
gulp.task('coveralls', function () {
  gulp.src('test/coverage/**/lcov.info')
    .pipe(coveralls())
})

gulp.task('run', ['standard', 'mocha', 'coveralls'])

gulp.task('default', ['run'])
