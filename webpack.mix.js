/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const mix = require('laravel-mix');
const fs = require('fs-extra');
const copyNodeModules = require('copy-node-modules');

var assets_dir = 'public/assets';

mix.setPublicPath('public')
    .sass('resources/scss/purpose-rakwireless.scss', assets_dir + '/css/rakwireless.css')
    .combine([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        'node_modules/in-view/dist/in-view.min.js',
        'node_modules/sticky-kit/dist/sticky-kit.min.js',
        'node_modules/svg-injector/dist/svg-injector.min.js',
        'node_modules/jquery.scrollbar/jquery.scrollbar.min.js',
        'node_modules/jquery-scroll-lock/dist/jquery-scrollLock.min.js',
        'node_modules/imagesloaded/imagesloaded.pkgd.min.js'
    ], assets_dir + '/js/rakwireless.core.js')
    .combine([
        'resources/js/purpose/license.js',
        'resources/js/purpose/layout.js',
        'resources/js/purpose/init/*.js',
        'resources/js/purpose/custom/*.js',
        'resources/js/purpose/maps/*.js',
        'resources/js/purpose/libs/*.js',
        'resources/js/purpose/charts/*.js'
    ], assets_dir + '/js/rakwireless.js');

// compile options
mix.options({
    processCssUrls: false
});

// live reload
mix.browserSync({
    open: false,
    proxy: 'rak.localhost'
});


// production settings
if (mix.inProduction()) {
    mix.version();
}

// expose front end dependecies
fs.remove(assets_dir + '/libs', function () {
    copyNodeModules('./', assets_dir, { devDependencies: false }, function () {
        fs.move(assets_dir + '/node_modules', assets_dir + '/libs', { overwrite: true });
    });
})
