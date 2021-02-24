const {src, dest, parallel, watch} = require('gulp');

const browserSync   = require('browser-sync').create();
const del           = require('del');

const twig          = require('gulp-twig');
const htmlBeautify  = require('gulp-html-beautify');

const less          = require('gulp-less');
const autoprefixer  = require('gulp-autoprefixer');
const cleancss      = require('gulp-clean-css');

const webpack = require("webpack-stream");

const newer         = require('gulp-newer');
const imagemin      = require('gulp-imagemin');


const distfolder    = './dist/';
const buildfolder   = './build/';



function html() {
    return src('./src/*.html')
    .pipe(twig())
    .pipe(htmlBeautify())
    .pipe(dest(distfolder))
    .pipe(browserSync.stream())
}

function htmlBuild() {
	return src('./src/*.html')
	.pipe(twig())
	.pipe(htmlBeautify())
	.pipe(dest(buildfolder))
}

function styles() {
    return src('./src/less/main.less')
    .pipe(less())
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleancss( { level: { 1: { specialComments: 0 } }, format: 'beautify' } ))
    .pipe(dest(distfolder))
    .pipe(browserSync.stream())
}

function stylesBuild() {
	return src('./src/less/main.less')
	.pipe(less())
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( { level: {2: {}} } ))
	.pipe(dest(buildfolder))
}

function scripts() {
    return src('./src/js/main.js')
    .pipe(webpack({
        mode: 'development',
        output: {
            filename: 'main.js'
        },
        watch: false,
        devtool: "source-map",
        module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [['@babel/preset-env', {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: "usage"
                    }]]
                  }
                }
              }
            ]
          }
    }))
    .pipe(dest(distfolder))
    .on('end', browserSync.reload)
}

function scriptsBuild() {
    return src('./src/js/main.js')
    .pipe(webpack({
        mode: 'production',
        output: {
            filename: 'main.js'
        },
        module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [['@babel/preset-env', {
                        corejs: 3,
                        useBuiltIns: "usage"
                    }]]
                  }
                }
              }
            ]
          }
    }))
    .pipe(dest(buildfolder))
}

function images() {
    return src('./src/img/**/*.*')
    .pipe(newer(distfolder))
    .pipe(imagemin())
    .pipe(dest(distfolder + 'img'))
    .on('end', browserSync.reload)
}

function imagesBuild() {
	return src('./src/img/**/*.*')
	.pipe(newer(buildfolder))
	.pipe(imagemin())
	.pipe(dest(buildfolder + 'img'))
}

function startWatch() {
	browserSync.init({
		server: { baseDir: distfolder },
		notify: true,
		online: true
	});

	watch(['./src/*.html', './src/twig-partials/**/*.html'], html);
	watch('./src/less/**/*.less', styles);
	watch('./src/js/**/*.js', scripts);
	watch('./src/img/**/*.*', images);
}

function clear() {
    return del(distfolder + '/**/*', { force: true })
}

function clearBuild() {
  return del(buildfolder + '/**/*', { force: true })
}

function clearImages() {
    return del(distfolder + 'img/**/*', { force: true })
}

exports.html        = html;
exports.styles      = styles;
exports.scripts     = scripts;
exports.images      = images;
exports.clear       = clear;
exports.clearImages = clearImages;
exports.build       = parallel(clearBuild, htmlBuild, stylesBuild, scriptsBuild, imagesBuild);
exports.default     = parallel(clear, html, styles, scripts, images, startWatch);