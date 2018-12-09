const gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();


gulp.task('previewDist', () => {
    browserSync.init({
		notify:false,
		server:{
			baseDir:"docs"
		}
	});
});

gulp.task('deleteDistFolder', ['icons'], () => 
    del('./docs')
);


gulp.task('copyGeneralFiles', ['deleteDistFolder'] ,() => { 
    const pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];

    return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./docs'));    
})

gulp.task('optimizeImages', ['deleteDistFolder'], () => 
    gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', 
    '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
    }))
    .pipe(gulp.dest('./docs/assets/images'))
)

gulp.task('useminTrigger', ['deleteDistFolder'], () => {
    gulp.start('usemin');
})

gulp.task('usemin', ['styles', 'scripts'], () => {
    gulp.src('./app/index.html')
    .pipe(usemin({
        css: [() => rev(), () => cssnano()],
        js : [() => rev(), () => uglify()]
    }))
    .pipe(gulp.dest("./docs"));
});


 gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);