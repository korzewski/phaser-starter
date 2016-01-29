var outputPath = './build';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var sass = require('gulp-sass');

function compile(watch) {
  var bundler = watchify(browserify('./source/scripts/app.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler
      .bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('scripts/app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(outputPath));
  }

  if(watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');

      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch', 'copy', 'copy:watch', 'sass', 'sass:watch']);

gulp.task('copy', function() {
  gulp
    .src('./source/*.html')
    .pipe(gulp.dest(outputPath));

  gulp
    .src('./source/assets/**/*.*')
    .pipe(gulp.dest(outputPath + '/assets'));
});

gulp.task('copy:watch', function() {
  gulp.watch('./source/*.html', ['copy'])
  gulp.watch('./source/assets/**/*.*', ['copy']);
});


gulp.task('sass', function() {
  gulp
    .src('./source/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(outputPath + '/styles'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./source/styles/**/*.scss', ['sass']);
});