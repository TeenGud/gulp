import gulp from 'gulp';
import less from 'gulp-less';
import {deleteAsync} from 'del';
import rename from 'gulp-rename';
import GulpCleanCss from 'gulp-clean-css';
import babel from 'gulp-babel';
import GulpUglify from 'gulp-uglify';
import concat from 'gulp-concat';

const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js'
    }
}

async function clean() {
    return await deleteAsync(['dist'])
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(GulpCleanCss())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
}

function scripts() {
    return gulp.src(paths.scripts.src, {
        sourcemaps: true
    })
        .pipe(babel())
        .pipe(GulpUglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.scripts.dest))
}

function watch() {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
}

const build = gulp.series(clean, gulp.parallel(scripts, styles), watch)

export { clean, styles, watch, scripts, build }