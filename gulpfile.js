(function () {
	'use strict';

	var templateCache = require('gulp-angular-templatecache');
	var autoPrefixer = require('gulp-autoprefixer');
	var clean = require('gulp-clean');
	var concat = require('gulp-concat');
	var gulp = require('gulp');
	var imagemin = require('gulp-imagemin');
	var inject = require('gulp-inject');
	var jshint = require('gulp-jshint');
	var minifyCSS = require('gulp-minify-css');
	var minifyHTML = require('gulp-minify-html');
	var ngAnnotate = require('gulp-ng-annotate');
	var nodemon = require('gulp-nodemon');
	var plumber = require('gulp-plumber');
	var sass = require('gulp-ruby-sass');
	var sourcemaps = require('gulp-sourcemaps');
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
			'angular-animate/angular-animate.js',
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
				assets: {
					base: 'assets/',
					images: 'images/'
				},
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
		},
		dist: {
			css: [
				'styles.min.css'
			],
			js: [
				'app.min.js'
			]
		}
	};


	/**
	 * Prefix path to an array of files
	 */
	function prefixPath(path, files) {
		var result = [];

		for (var i = 0; i < files.length; i++) {
			result[i] = path + files[i];
		}

		return result;
	}

	/**
	 * Remove the build dir
	 */
	gulp.task('cleanBuild', function () {
		return gulp.src(paths.app.build.base, {read: false})
			.pipe(clean());
	});

	/**
	 * Remove the dist dir
	 */
	gulp.task('cleanDist', function () {
		return gulp.src(paths.app.dist.base, {read: false})
			.pipe(clean());
	});

	/**
	 * Concatenate and minify vendor and app CSS.
	 * Place concatenated file in dist dir
	 */
	gulp.task('distCSS', ['build'], function () {
		var sources = {
			app: prefixPath(paths.app.build.base + paths.app.build.css.app, files.css.app),
			vendor: prefixPath(paths.app.build.base + paths.app.build.css.vendor, files.css.vendor)
		};

		return gulp.src(sources.vendor.concat(sources.app))
			.pipe(plumber())
			.pipe(concat(files.dist.css[0]))
			.pipe(minifyCSS())
			.pipe(gulp.dest(paths.app.dist.base));
	});

	/**
	 * Annotate, concatenate and minify vendor and app JS
	 * Place concatenated file in dist dir
	 */
	gulp.task('distJS', ['build'], function () {
		var sources = {
			app: prefixPath(paths.app.build.base + paths.app.build.js.app, files.js.app),
			vendor: prefixPath(paths.app.build.base + paths.app.build.js.vendor, files.js.vendor)
		};

		return gulp.src(sources.vendor.concat(sources.app))
			.pipe(ngAnnotate({add: true, single_quotes: true}))
			.pipe(concat(files.dist.js[0]))
			.pipe(uglify())
			.pipe(gulp.dest(paths.app.dist.base));
	});

	/**
	 * Copy index.html to dist dir
	 */
	gulp.task('distCopyIndex', ['build'], function () {
		return gulp.src(prefixPath(paths.app.src.base, files.html.index))
			.pipe(gulp.dest(paths.app.dist.base));
	});

	/**
	 * Inject CSS and JS files into index.html in dist dir
	 */
	gulp.task('distInject', ['distCopyIndex', 'distCSS', 'distJS'], function () {
		var sources = {
			css: prefixPath(paths.app.dist.base, files.dist.css),
			index: prefixPath(paths.app.dist.base, files.html.index),
			js: prefixPath(paths.app.dist.base, files.dist.js)
		};

		return gulp.src(sources.index)
			.pipe(using())
			.pipe(inject(gulp.src(sources.js, {read:false}), {name: 'app', relative:true}))
			.pipe(inject(gulp.src(sources.css, {read:false}), {name: 'app', relative:true}))
			.pipe(gulp.dest(paths.app.dist.base));
	});

	/**
	 * Minify index.html in dist dir
	 */
	gulp.task('distMinifyIndex', ['distInject'], function () {
		return gulp.src(prefixPath(paths.app.dist.base, files.html.index))
			.pipe(minifyHTML({empty: true}))
			.pipe(gulp.dest(paths.app.dist.base));
	});

	/**
	 * Minify images and copy to dist dir
	 */
	gulp.task('distMinifyImages', ['build'], function () {
		return gulp.src(prefixPath(paths.app.build.base + paths.app.build.assets, files.assets.images))
			.pipe(imagemin())
			.pipe(gulp.dest(paths.app.dist.base + paths.app.dist.assets.base + paths.app.dist.assets.images));
	});

	/**
	 * jshint app JS
	 */
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

	/**
	 * jshint server JS
	 */
	gulp.task('jshintServer', function () {
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

	/**
	 * Copy vendor JS to build dir
	 */
	gulp.task('copyVendorJS', ['cleanBuild'], function () {
		var sources = prefixPath(paths.bower, files.js.vendor);

		return gulp.src(sources, {base: paths.bower})
			.pipe(gulp.dest(paths.app.build.base + paths.app.build.js.vendor));
	});

	/**
	 * Copy app JS to build dir
	 */
	gulp.task('copyAppJS', ['cleanBuild', 'jshint'], function () {
		var sources = {
			js: prefixPath(paths.app.src.base, files.js.app),
			ignore: ['!' + paths.app.src.base + files.js.unitTest]
		};

		return gulp.src(sources.js.concat(sources.ignore))
			.pipe(gulp.dest(paths.app.build.base + paths.app.build.js.app));
	});

	/**
	 * Copy vendor CSS to build dir
	 */
	gulp.task('copyVendorCSS', ['cleanBuild'], function () {
		var sources = prefixPath(paths.bower, files.css.vendor);

		return gulp.src(sources, {base: paths.bower})
			.pipe(gulp.dest(paths.app.build.base + paths.app.build.css.vendor));
	});

	/**
	 * Compile SASS to CSS and place in build dir
	 */
	gulp.task('compileSASS', ['cleanBuild'], function () {
		return gulp.src(paths.app.src.base + files.scss.app)
			.pipe(plumber())
			.pipe(sass({style: 'expanded'}))
			.pipe(autoPrefixer('last 2 version'))
			.pipe(gulp.dest(paths.app.build.base + paths.app.build.css.app));
	});

	/**
	 * Copy index.html to build dir
	 */
	gulp.task('copyIndex', ['cleanBuild'], function () {
		return gulp.src(paths.app.src.base + files.html.index)
			.pipe(gulp.dest(paths.app.build.base));
	});

	/**
	 * Copy assets to build dir
	 */
	gulp.task('copyAssets', ['cleanBuild'], function () {
		return gulp.src(paths.app.src.base + paths.app.src.assets + files.assets.all)
			.pipe(gulp.dest(paths.app.build.base + paths.app.build.assets));
	});

	/**
	 * Inject vendor CSS and JS into index.html in build dir
	 */
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

	/**
	 * Inject app CSS and JS into index.html in build dir
	 */
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

	/**
	 * Build project
	 */
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
		'jshintServer'

	], function () {

	});

	/**
	 * Watch project
	 */
	gulp.task('watch', ['build'], function () {
		gulp.watch(files.gulpfile, ['build']);
		gulp.watch(paths.server.base + '**/*.js', ['build']);
		gulp.watch(paths.app.src.base + '**/*.js', ['build']);
		gulp.watch(paths.app.src.base + '**/*.scss', ['build']);
		gulp.watch(paths.app.src.base + '**/*.html', ['build']);
		gulp.watch(paths.app.src.base + 'assets/**/*', ['build']);
	});

	/**
	 * Distribute project
	 */
	gulp.task('dist', [
		'cleanBuild',
		'cleanDist',
		'build',
		'distCopyIndex',
		'distCSS',
		'distJS',
		'distInject',
		'distMinifyIndex',
		'distMinifyImages'

	], function () {

	});

	/**
	 * Build and watch project
	 */
	gulp.task('default', ['build', 'watch'], function () {

	});
})();