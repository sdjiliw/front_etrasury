// var gulp = require('gulp');
// var browserSync = require('browser-sync');
// var reload = browserSync.reload;

// watch files for changes and reload
// gulp.task('serve', function() {
  // browserSync({
    // server: {
      // baseDir: 'app'
    // }
  // });

  // gulp.watch(['*.html', 'css/**/*.css', 'js/**/*', 'img/**/*', 'partials/**/*', 'data/**/*'], {cwd: 'app'}, reload);
// });

// require('require-dir')('./gulp');
// gulp.task('default', ['clean'], function () {
    // gulp.start('build');
// });
var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/*')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/*'], ['*']);
});

gulp.task('default', ['connect', 'watch']);