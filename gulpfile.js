const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');

gulp.task('svgstore', function () {
    return gulp
        .src('./images/svg/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('./images'));
});

function style(){
	return gulp.src('./scss/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(rename({dirname: "./css", suffix: '.min'}))
	.pipe(cleanCSS())

    .pipe(gulp.dest('./'))
	.pipe(browserSync.stream());

}



gulp.task('html', function(){
	return gulp.src('*.html')
	.pipe(browserSync.reload({stream: true}))
});



function watch(){
	browserSync.init({
		server:{
			baseDir: './'
		}
	});
	gulp.watch('./scss/*.scss', gulp.parallel('style'));
	gulp.watch('./*.html', gulp.parallel('html'))
	gulp.watch('./js/*.js').on('change', browserSync.reload);
}
exports.style = style;
exports.watch = watch;