var gulp =  require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', () => {

	browserSync.init({
		notify:false,
		server:{
			baseDir:"app"
		}
	});
	
	watch('./app/index.html', () =>{
		browserSync.reload();
		console.log("Se modifico el archivo index.html");
	});

	watch('./app/assets/styles/**/*.css' , () => {
		gulp.start('cssInject');
	});
});


gulp.task('cssInject' , ['styles'] , () => 
	gulp.src('./app/temp/styles/styles.css')
	.pipe(browserSync.stream())
);
