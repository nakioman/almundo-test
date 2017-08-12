import * as gulp from 'gulp';
import * as del from 'del';
import * as sourcemaps from 'gulp-sourcemaps';
import * as tsc from 'gulp-typescript';
import * as runSequence from 'run-sequence';
import * as nodemon from 'gulp-nodemon';
import * as yargs from 'yargs';
import * as gulpif from 'gulp-if';
import * as uglify from 'gulp-uglify';

const argv = yargs.argv;

/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del(['dist'], cb);
});

/**
 * Build Express server
 */
gulp.task('build:server', function () {
    const tsProject = tsc.createProject('server/tsconfig.json');
    const tsResult = gulp.src('server/src/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(gulpif(argv.prod, uglify()))
        .pipe(gulpif(!argv.prod, sourcemaps.write()))
        .pipe(gulp.dest('dist/server'));
});

/**
 * Copy bin directory for www
 */
gulp.task('serverResources', () => {
    return gulp.src(['server/src/*.json'])
        .pipe(gulp.dest('dist/server'));
});

/**
 * Start the express server with nodemon
 */
gulp.task('start', function () {
    nodemon({
        script: 'dist/server/app'
    })
        .on('restart', function () {
            console.log('restarted!');
        });
});

/**
 * Build the project.
 * 1. Clean the build directory
 * 2. Build Express server
 * 4. Copy the resources
 */

gulp.task('build', function (callback) {
    runSequence('clean', 'build:server', 'serverResources', callback);
});

/**
 * Watch for changes in TypeScript.
 */
gulp.task('watch', function () {
    gulp.watch(['server/**/*'], ['build:server', 'serverResources']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
});

/**
 * Build the project.
 * 1. Clean the build directory
 * 2. Build Express server
 * 4. Copy the resources
 */

gulp.task('build', function (callback) {
    runSequence('clean', 'build:server', 'serverResources', callback);
});

gulp.task('default', function () {
    runSequence('build:server', 'serverResources', 'watch', 'start');
});
