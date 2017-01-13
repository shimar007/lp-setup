var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
 
// Compile sass
gulp.task('sass', function () {
  gulp.src('components/stylesheet/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
	
});

// Uglify Javascripts
gulp.task('compress', function() {
  return gulp.src('components/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

// Watching files
gulp.task('watch', function() {
	gulp.watch("components/scripts/*.js", ['compress']);
	gulp.watch("components/stylesheet/**/*.scss", ['sass']);
	//gulp.watch("*.php").on('change',livereload());
});

// Uglify Plugins
gulp.task('uglifyPlugins', function() {
  return gulp.src(['components/libs/bootstrap/dist/js/bootstrap.js',
    'components/libs/jquery/dist/jquery.js'])
    .pipe(rename({
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

// Minify Plugins CSS files
gulp.task('minifyPlugins', function() {
  return gulp.src(['components/libs/bootstrap/dist/css/bootstrap.css'])
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('css'));
});

gulp.task('build', ['uglifyPlugins', 'minifyPlugins']);
gulp.task('default', ['watch']);