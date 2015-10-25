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
    .pipe(mocha({reporter: 'mocha-lcov-reporter'}))
})

var istanbul = require('gulp-istanbul');

gulp.task('pre-test', function () {
  return gulp.src(['lib/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire())
})

gulp.task('test', ['pre-test'], function () {
  return gulp.src(['test/*.js'])
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

var coveralls = require('gulp-coveralls')

// coveralls task
gulp.task('coveralls', function () {
  gulp.src('test/coverage/**/lcov.info')
    .pipe(coveralls())
})

gulp.task('run', ['standard', 'test', 'coveralls'])

gulp.task('default', ['run'])
