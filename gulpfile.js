'use ctrict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    cssmin = require('gulp-clean-css'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer');
    
var path = {
    build: { 
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        fonts: 'build/fonts/'
    },
    src: { 
        html: 'src/index.html', 
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/images/*.*', 
        fonts: 'src/fonts/*.*'
    },
    watch: { 
        html: 'src/index.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/images/*.*',
        fonts: 'src/fonts/*.*'
    },
    clean: './build'
};

gulp.task('html', function () {
    gulp.src(path.src.html) 
        .pipe(gulp.dest(path.build.html));
});

gulp.task('scripts', function(){
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js));
});

gulp.task('styles', function(){
    gulp.src(path.src.style)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('images', function(){
   	gulp.src(path.src.img)
        .pipe(imagemin([
		    imagemin.jpegtran({progressive: true}),
		    imagemin.optipng({optimizationLevel: 5}),
		    imagemin.svgo({
        		plugins: [
	           		 {removeViewBox: true},
	           		 {cleanupIDs: false}
       			]		
   			})
		]))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', ['html', 'scripts', 'styles', 'fonts', 'images']);

/*gulp.task('watch', function(){
   	return watch(path.watch.html, { ignoreInitial: false })
   		.pipe(gulp.dest(path.build.html)),

   		watch(path.watch.style, { ignoreInitial: false })
   		.pipe(gulp.dest(path.build.css)),

   		watch(path.watch.img, { ignoreInitial: false })
   		.pipe(gulp.dest(path.build.img)),

   		watch(path.watch.js, { ignoreInitial: false })
   		.pipe(gulp.dest(path.build.js)); 
 });*/

gulp.task('default', ['build']);