var gulp = require('gulp');

// build
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var saveLicense = require('uglify-save-license');
var fs = require('fs');

// unit testing
var karmaServer = require('karma').Server;

// e2e testing
var seleniumServer = require('selenium-standalone');
var expressServer = require('gulp-express');

var path = {
    distribution: {
        folder: 'dist',
        filename: 'jquery-addthis'
    },
    copyright: 'src/copyright.js',
    source: 'src/**/*.js'
};

gulp.task('make-folders', function () {
    var folders = [path.distribution.folder];
    folders.forEach(function(folder) {
        try {
            fs.mkdirSync(folder);
        }
        catch(err) {
            if (err.code !== 'EEXIST') {
                console.warn(err);
            }
        }
    });
});

gulp.task('clean-distribution', function() {
    var files = path.distribution.folder + '/*';
    return gulp.src(files, {read: false}).pipe(clean());
});

gulp.task('concat', ['make-folders'], function() {
    var files = [].concat(
        [path.copyright],
        path.source
    );

    return gulp.src(files)
        .pipe(concat(path.distribution.filename + '.js'))
        .pipe(gulp.dest(path.distribution.folder));
});

gulp.task('minify', ['make-folders'], function() {
    var files = [].concat(
        [path.copyright],
        path.source
    );

    return gulp.src(files)
        .pipe(concat(path.distribution.filename + '.min.js'))
        .pipe(uglify({
            mangle: false,
            output: {
                comments: saveLicense
            }
        }))
        .pipe(gulp.dest(path.distribution.folder));
});

gulp.task('build', ['jslint', 'clean-distribution'], function(){
    return gulp.start(
        'minify',
        'concat'
    );
});

gulp.task('jslint', function() {
    return gulp.src([path.source, 'test/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('unit-test', function(done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('start-selenium-server', function (done) {
    var config = {
        baseURL: 'https://selenium-release.storage.googleapis.com',
        drivers: {
            chrome: {},
            firefox: {}
        },
        logger: console.log
    };

    var callback = function(err) {
        if (err) {
            return done(err);
        }

        seleniumServer.start(function (err, child) {
            if (err) {
                return done(err);
            }

            seleniumServer.child = child;
            done();
        });
    }

    seleniumServer.install(config, callback);
});

gulp.task('stop-selenium-server', function () {
    seleniumServer.child.kill();
})

gulp.task('start-express-server', function () {
    expressServer.run(['server.js']);
});

gulp.task('stop-express-server', function () {
    expressServer.stop();
});

gulp.task('e2e-test-runner', ['start-express-server', 'start-selenium-server'], function (done) {
    var mocha = require('gulp-mocha');
    var config = {
        reporter: 'mocha-junit-reporter',
        reporterOptions: {
            mochaFile: './test_reports/e2e/bytest_junit/junit.xml'
        }
    };

    return gulp.src('test/e2e/**/*.js', {read: false})
        .pipe(mocha(config));
});

gulp.task('e2e-test', ['e2e-test-runner'], function () {
    return gulp.start(
        'stop-express-server',
        'stop-selenium-server'
    );
});

gulp.task('test', ['unit-test', 'e2e-test']);

gulp.task('watch', ['build'], function() {
    gulp.watch(path.source, ['test']);
});