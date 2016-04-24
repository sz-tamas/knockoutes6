const gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    babelify = require('babelify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    runSequence = require('run-sequence'),
    rimraf = require('rimraf');

const app = {
    src: 'app/',
    build: 'build/'
};

const paths = {
    styles: 'css/**/*.css',
    scripts: 'es6/**/*.es6',
    views: {
        main: 'index.html',
        templates: 'view/**/*.html'
    }
};

gulp.task('html', function() {
    gulp.src(app.src + paths.views.main)
        .pipe(gulp.dest(app.build));
});

gulp.task('css', function() {
    gulp.src(app.src + paths.styles)
        .pipe(gulp.dest(app.build + 'css'));
});

gulp.task('copy:libs', function() {
    return gulp
        .src([
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/knockout/build/output/knockout-latest.js'
        ])
        .pipe($.uglify())
        .pipe($.concat('libs.min.js'))
        .pipe(gulp.dest(app.build + 'js/lib'));
});

// gulp.task('ecmascript6', function () {
    // return gulp.src(es6Src + '**/*.es6')
    //     .pipe($.sourcemaps.init())
    //     .pipe($.babel(babelrc))
    //     .pipe($.sourcemaps.write('.'))
    //     .pipe(gulp.dest(app.build + 'js/'));
// });

// http://stackoverflow.com/questions/31593694/do-i-need-require-js-when-i-use-babel
gulp.task('ecmascript6', function () {
    browserify(app.src + '/es6/boot.es6', { debug: true })
        .add(require.resolve('babel-polyfill'))
        .transform(babelify)
        .bundle()
        .on('error', $.util.log.bind($.util, 'Browserify Error'))
        .pipe(source('boot.js'))
        .pipe(buffer())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.uglify({ mangle: false }))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(app.build + 'js/'));
});

gulp.task('watch', function() {
    gulp.watch(app.src + paths.scripts, ['ecmascript6']);
    gulp.watch(app.src + paths.styles, ['css']);
    gulp.watch([app.src + paths.views.main, app.src + paths.views.templates], ['html']);
});

gulp.task('webserver', function() {
    gulp.src(app.build)
        .pipe($.webserver({
            livereload: true,
            host: '0.0.0.0',
            port: '8080'
        }));
});

gulp.task('clean:build', function(cb) {
    rimraf(app.build, cb);
});

gulp.task('build', function() {
    runSequence(['copy:libs', 'ecmascript6', 'css', 'html', 'watch', 'webserver']);
});

gulp.task('default', ['build']);