var del        = require('del');
var gulp       = require('gulp');
var concat     = require('gulp-concat');
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('gulp-browserify');

gulp.task('clean', function(done){
    del.sync('dist');
    done();
});

gulp.task('build', function(){
    return gulp.src(['src/build.js'])
        .pipe(browserify({standalone:'BrowserHash'}))
        .pipe(rename('browserhash.js'))
        .pipe(gulp.dest('dist'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({extname:'.min.js'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series(['clean','build']));

gulp.task('watch', function(){
    gulp.watch('./src/**/*.js',gulp.series(['build']));
});

gulp.task('default', gulp.series(['build']));