(function () {
	'use strict';

	var autoprefixer = require('gulp-autoprefixer');
	var clean = require('gulp-clean');
	var concat = require('gulp-concat');
	var gulp = require('gulp');
	var inject = require('gulp-inject');
	var jshint = require('gulp-jshint');
	var nodemon = require('gulp-nodemon');
	var plumber = require('gulp-plumber');
	var sass = require('gulp-ruby-sass');
	var stylish = require('jshint-stylish');
	var uglify = require('gulp-uglify');

	var vendorJS = [
		'angular/angular.min.js',
		'ui-router/release/angular-ui-router.min.js'
	];

	var appJS = [
		'**/**/*.module.js',
		'**/**/*.config.js',
		'**/**/*.js'
	];

	var vendorCSS = [
		'bootstrap/dist/css/bootstrap.css'
	];

	function addPath(path, files) {
		var result = [];

		for (var i = 0; i < files.length; i++) {
			result[i] = path + files[i];
		}

		return result;
	}

	gulp.task('clean', function () {
		return gulp.src('./app/build', {read: false})
			.pipe(clean());
	});

	gulp.task('jshint', function () {
		var files = addPath('./src/app/', appJS);

		return gulp.src(files)
			.pipe(plumber())
			.pipe(jshint())
			.pipe(jshint.reporter(stylish));
	});

	gulp.task('jshintServerJS', function () {
		return gulp.src(['./server.js', './server/**/*.js'])
			.pipe(plumber())
			.pipe(jshint())
			.pipe(jshint.reporter(stylish));
	});

	//gulp.task('copyServerJS', ['clean'], function () {
	//	return gulp.src(['./src/server.js', './src/server/**/*.js'], {base: './src'})
	//		.pipe(gulp.dest('./build/'));
	//});

	gulp.task('copyVendorJS', ['clean'], function () {
		var files = addPath('bower_components/', vendorJS);

		return gulp.src(files, {base: 'bower_components'})
			.pipe(gulp.dest('./app/build/js/vendor'));
	});

	gulp.task('copyAppJS', ['clean', 'jshint'], function () {
		var files = addPath('./app/src/', appJS);
		return gulp.src(files)
			.pipe(gulp.dest('./app/build/js/app'));
	});

	gulp.task('copyVendorCSS', ['clean'], function () {
		var files = addPath('bower_components/', vendorCSS);

		return gulp.src(files, {base: 'bower_components'})
			.pipe(gulp.dest('./app/build/css/vendor'));
	});

	gulp.task('compileSASS', ['clean'], function () {
		return gulp.src('./app/src/scss/**/*.scss')
			.pipe(plumber())
			.pipe(sass({style: 'expanded'}))
			.pipe(autoprefixer('last 2 version'))
			.pipe(gulp.dest('./app/build/css/app'));
	});

	gulp.task('copyIndex', ['clean'], function () {
		return gulp.src('./app/src/index.html')
			.pipe(gulp.dest('./app/build'));
	});

	gulp.task('copyAssets', ['clean'], function () {
		return gulp.src('./app/src/assets/**/*')
			.pipe(gulp.dest('./app/build/assets'));
	});

	var dependencies = ['copyIndex', 'copyVendorJS', 'copyAppJS', 'copyVendorCSS', 'compileSASS'];
	gulp.task('injectVendor', dependencies, function () {
		var filesJS = addPath('./app/build/js/vendor/', vendorJS);
		var filesCSS = addPath('./app/build/css/vendor/', vendorCSS);

		return gulp.src('./app/build/index.html')
			.pipe(inject(gulp.src(filesJS, {read: false}), {name: 'vendor', relative: true}))
			.pipe(inject(gulp.src(filesCSS, {read: false}), {name: 'vendor', relative: true}))
			.pipe(gulp.dest('./app/build'));
	});

	gulp.task('injectApp', ['injectVendor'], function () {
		var filesJS = addPath('./app/build/js/app/', appJS);

		return gulp.src('./app/build/index.html')
			.pipe(inject(gulp.src(filesJS, {read: false}), {name: 'app', relative: true}))
			.pipe(inject(gulp.src(['./app/build/css/app/*.css'], {read: false}), {name: 'app', relative: true}))
			.pipe(gulp.dest('./app/build'));

	});

	var buildDependencies = [
		'clean',
		'jshint',
		'jshintServerJS',

		'copyAssets',
		'copyIndex',
		'copyVendorJS',
		'copyAppJS',
		'copyVendorCSS',
		'compileSASS',
		'injectVendor',
		'injectApp'
	];
	gulp.task('build', buildDependencies, function () {
	});

	gulp.task('watch', ['build'], function () {
		gulp.watch('./src/server/**/*.js', ['build']);
		gulp.watch('./src/client/**/*.js', ['build']);
		gulp.watch('./src/client/**/*.scss', ['build']);
		gulp.watch('./src/client/**/*.html', ['build']);
	});

	gulp.task('dist', function () {

	});

	gulp.task('default', ['build', 'watch'], function () {

	});

	//gulp.task('develop', function () {
	//	nodemon({ script: './build/server.js'})
	//});
})();