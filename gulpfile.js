(function () {
	'use strict';

	var templateCache = require('gulp-angular-templatecache');
	var autoprefixer = require('gulp-autoprefixer');
	var clean = require('gulp-clean');
	var concat = require('gulp-concat');
	var gulp = require('gulp');
	var inject = require('gulp-inject');
	var jshint = require('gulp-jshint');
	var minifycss = require('gulp-minify-css');
	var minifyHTML = require('gulp-minify-html');
	var ngAnnotate = require('gulp-ng-annotate');
	var nodemon = require('gulp-nodemon');
	var plumber = require('gulp-plumber');
	var sass = require('gulp-ruby-sass');
	var stylish = require('jshint-stylish');
	var uglify = require('gulp-uglify');
	var using = require('gulp-using');

	/**
	 * Define third-party CSS and JS dependencies.
	 * These will be injected into index.html in the given order.
	 */
	var dependencies = {
		css: [
			'bootstrap/dist/css/bootstrap.css',
			'bootstrap/dist/css/bootstrap.css.map'
		],
		js: [
			'angular/angular.js',
			'ui-router/release/angular-ui-router.js'
		]
	};

	/**
	 * Configure project paths.
	 */
	var paths = {
		app: {
			build: {
				assets: 'assets/',
				base: 'app/build/',
				css: {
					app: 'css/app/',
					vendor: 'css/vendor/'
				},
				js: {
					app: 'js/app/',
					vendor: 'js/vendor/'
				}
			},
			dist: {
				base: 'app/dist/'
			},
			src: {
				assets: 'assets/',
				base: 'app/src/'
			}
		},
		bower: 'bower_components/',
		server: 'server/'
	};

	/**
	 * Configure file patterns.
	 */
	var files = {
		assets: {
			all: [
				'**/*'
			],
			images: [
				'images/**/*'
			]
		},
		css: {
			app: [
				'**/*.css'
			],
			vendor: dependencies.css
		},
		/**
		 * Configuration file for Gulp
		 */
		gulpfile: [
			'gulpfile.js'
		],
		html: {
			all: [
				'**/*.html'
			],
			index: [
				'index.html'
			]
		},
		js: {
			/**
			 * Define the order in which app js files are injected into index.html
			 */
			app: [
				'**/**/*.module.js',
				'**/**/*.config.js',
				'**/**/*.js'
			],
			server: [
				'**/*.js'
			],
			unitTest: [
				'**/*.spec.js'
			],
			vendor: dependencies.js
		},
		scss: {
			/**
			 * Define app specific SCSS files
			 */
			app: [
				'scss/**/*.scss'
			]
		}
	};


	/**
	 *
	 */
	function prefixPath(path, files) {
		var result = [];

		for (var i = 0; i < files.length; i++) {
			result[i] = path + files[i];
		}

		return result;
	}

	gulp.task('cleanBuild', function () {
		return gulp.src(paths.app.build.base, {read: false})
			.pipe(clean());
	});

	gulp.task('cleanDist', function () {
		return gulp.src(paths.app.dist.base, {read: false})
			.pipe(clean());
	});

	gulp.task('distCSS', ['build'], function () {
		var sources = {
			app: prefixPath(paths.app.build.base + paths.app.build.css.app, files.css.app),
			vendor: prefixPath(paths.app.build.base + paths.app.build.css.vendor, files.css.vendor)
		};

		return gulp.src(sources.vendor.concat(sources.app))
			.pipe(plumber())
			.pipe(concat('styles.min.css'))
			.pipe(minifycss())
			.pipe(gulp.dest(paths.app.dist.base));
	});

	gulp.task('distJS', ['build'], function () {
		var sources = {
			app: prefixPath(paths.app.build.base + paths.app.build.js.app, files.js.app),
			vendor: prefixPath(paths.app.build.base + paths.app.build.js.vendor, files.js.vendor)
		};

		return gulp.src(sources.vendor.concat(sources.app))
			.pipe(ngAnnotate({add: true, single_quotes: true}))
			.pipe(concat('app.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest(paths.app.dist.base));
	});

	gulp.task('distCopyIndex', ['build'], function () {
		return gulp.src(['app/src/index.html'])
			.pipe(gulp.dest(paths.app.dist.base));
	});

	gulp.task('distIndex', ['distCopyIndex', 'distCSS', 'distJS'], function () {
		var sources = {
			css: ['app/dist/styles.min.css'],
			index: ['app/dist/index.html'],
			js: ['app/dist/app.min.js']
		};

		return gulp.src(sources.index)
			.pipe(using())
			.pipe(inject(gulp.src(sources.js, {read:false}), {name: 'app', relative:true}))
			.pipe(inject(gulp.src(sources.css, {read:false}), {name: 'app', relative:true}))
			.pipe(gulp.dest(paths.app.dist.base));
	});

	gulp.task('minifyIndex', ['distIndex'], function () {
		return gulp.src(['app/dist/index.html'])
			.pipe(minifyHTML({empty: true}))
			.pipe(gulp.dest(paths.app.dist.base));
	});

	gulp.task('jshint', function () {
		var sources = {
			js: prefixPath(paths.app.src.base, files.js.app),
			gulpfile: files.gulpfile
		};

		return gulp.src(sources.js.concat(sources.gulpfile))
			.pipe(plumber())
			.pipe(jshint())
			.pipe(jshint.reporter(stylish));
	});

	gulp.task('jshintServerJS', function () {
		return gulp.src(['./server.js', paths.server + files.js.server])
			.pipe(plumber())
			.pipe(jshint())
			.pipe(jshint.reporter(stylish));
	});

	/**
	 * Concatenate the contents of all .html files and save as template.js
	 */
	gulp.task('html2js', ['cleanBuild'], function () {
		var sources = {
			html: prefixPath(paths.app.src.base, files.html.all),
			ignore: ['!' + paths.app.src.base + files.html.index]
		};

		console.log(sources.ignore);

		return gulp.src(sources.html.concat(sources.ignore))
			.pipe(templateCache('templates.js', {standalone: true}))
			.pipe(gulp.dest(paths.app.build.base + paths.app.build.js.app));
	});

	gulp.task('copyVendorJS', ['cleanBuild'], function () {
		var sources = prefixPath(paths.bower, files.js.vendor);

		return gulp.src(sources, {base: paths.bower})
			.pipe(gulp.dest(paths.app.build.base + paths.app.build.js.vendor));
	});

	gulp.task('copyAppJS', ['cleanBuild', 'jshint'], function () {
		var sources = {
			js: prefixPath(paths.app.src.base, files.js.app),
			ignore: ['!' + paths.app.src.base + files.js.unitTest]
		};

		return gulp.src(sources.js.concat(sources.ignore))
			.pipe(gulp.dest(paths.app.build.base + paths.app.build.js.app));
	});

	gulp.task('copyVendorCSS', ['cleanBuild'], function () {
		var sources = prefixPath(paths.bower, files.css.vendor);

		return gulp.src(sources, {base: paths.bower})
			.pipe(gulp.dest(paths.app.build.base + paths.app.build.css.vendor));
	});

	gulp.task('compileSASS', ['cleanBuild'], function () {
		return gulp.src(paths.app.src.base + files.scss.app)
			.pipe(plumber())
			.pipe(sass({style: 'expanded'}))
			.pipe(autoprefixer('last 2 version'))
			.pipe(gulp.dest(paths.app.build.base + paths.app.build.css.app));
	});

	gulp.task('copyIndex', ['cleanBuild'], function () {
		return gulp.src(paths.app.src.base + files.html.index)
			.pipe(gulp.dest(paths.app.build.base));
	});

	/**
	 *
	 */
	gulp.task('copyAssets', ['cleanBuild'], function () {
		return gulp.src(paths.app.src.base + paths.app.src.assets + files.assets.all)
			.pipe(gulp.dest(paths.app.build.base + paths.app.build.assets));
	});

	gulp.task('injectVendor', ['copyIndex', 'copyVendorJS', 'copyAppJS', 'copyVendorCSS', 'compileSASS'], function () {
		var sources = {
			js: prefixPath(paths.app.build.base + paths.app.build.js.vendor, files.js.vendor),
			css: prefixPath(paths.app.build.base + paths.app.build.css.vendor, files.css.vendor)
		};

		return gulp.src(paths.app.build.base + files.html.index)
			.pipe(inject(gulp.src(sources.js, {read: false}), {name: 'vendor', relative: true}))
			.pipe(inject(gulp.src(sources.css, {read: false}), {name: 'vendor', relative: true}))
			.pipe(gulp.dest(paths.app.build.base));
	});

	gulp.task('injectApp', ['injectVendor'], function () {
		var sources = {
			css: [paths.app.build.base + paths.app.build.css.app + files.css.app],
			js: prefixPath(paths.app.build.base + paths.app.build.js.app, files.js.app)
		};

		return gulp.src(paths.app.build.base + files.html.index)
			.pipe(inject(gulp.src(sources.js, {read: false}), {name: 'app', relative: true}))
			.pipe(inject(gulp.src(sources.css, {read: false}), {name: 'app', relative: true}))
			.pipe(gulp.dest(paths.app.build.base));

	});

	gulp.task('build', [
		'cleanBuild',
		'compileSASS',
		'copyAppJS',
		'copyAssets',
		'copyIndex',
		'copyVendorCSS',
		'copyVendorJS',
		'html2js',
		'injectApp',
		'injectVendor',
		'jshint',
		'jshintServerJS'

	], function () {

	});

	gulp.task('watch', ['build'], function () {
		gulp.watch(files.gulpfile, ['build']);
		gulp.watch(paths.server.base + '**/*.js', ['build']);
		gulp.watch(paths.app.src.base + '**/*.js', ['build']);
		gulp.watch(paths.app.src.base + '**/*.scss', ['build']);
		gulp.watch(paths.app.src.base + '**/*.html', ['build']);
	});

	gulp.task('dist', [
		'cleanBuild',
		'cleanDist',
		'build',
		'distCopyIndex',
		'distCSS',
		'distJS',
		'distIndex',
		'minifyIndex'

	], function () {

	});

	gulp.task('default', ['build', 'watch'], function () {

	});
})();