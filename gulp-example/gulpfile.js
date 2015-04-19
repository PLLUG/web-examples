var gulp = require('gulp'),
    concat = require('gulp-concat'),
    serve = require('gulp-serve'),
    uglify = require('gulp-uglify');

var libraries = [
  './bower_components/angular/angular.js'
];

var appPaths = [
  './app/js/app.js',
  'app/js/controllers/**/*.js',
  'app/js/directives/**/*.js',
  'app/js/services/**/*.js'
];

gulp.task('buildLib', function() {
  gulp.src(libraries)
      .pipe(concat('app.build.js'))
      .pipe(uglify())
      .pipe(gulp.dest('build/js'));
});

gulp.task('buildApp', function() {
  gulp.src(appPaths)
      .pipe(concat('app.build.js'))
      .pipe(uglify())
      .pipe(gulp.dest('build/js'));
});

gulp.task('templates', function() {
  gulp.src('./app/index.html')
      .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch('./app/js/**/*.js', ['build']);
});

gulp.task('serve', serve('build'));

gulp.task('build', ['buildLib', 'buildApp', 'templates']);

gulp.task('default', ['serve', 'watch']); 
