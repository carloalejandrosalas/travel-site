var gulp = require('gulp'),
rename = require('gulp-rename'),
svgSprite = require('gulp-svg-sprite'),
del = require('del');

const config = {
    mode : {
        css : {
            sprite: 'sprite.svg',
            render: {
                css : {
                    template : './gulp/templates/sprite.css'
                }
            }
        }
    }
};

gulp.task('beginClean', () => 
    del(['./app/temp/sprite', './app/assets/images/sprites'])    
);

gulp.task('createSprite', ['beginClean'], () => 
    gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'))
);

gulp.task('copySpriteGraphic', ['createSprite'] , () => {
    gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'))
})

gulp.task('copySpriteCSS', ['createSprite'], () => 
    gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'))
);

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'] , () => 
    del(['./app/temp/sprite'])
);

gulp.task('icons', ['beginClean','createSprite', 'copySpriteGraphic' ,'copySpriteCSS', 'endClean']);