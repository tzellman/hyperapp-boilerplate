const browserSync = require('browser-sync'),
    rollupConfig = require('./config/rollup'),
    uglifyConfig = require('./config/uglify');

let isWatching = false;

// some source/dest consts
const target = 'dist';
const releaseTarget = 'release';
const src = {
    js: 'src/scripts/**',
    scss: 'src/styles/app.scss',
    staticAssets: [
        'src/static/**/*.*',
        'src/*.html'
    ],
    vendor: []
};

export async function clean(fly) {
    await fly.clear([target, releaseTarget]);
}

export async function copyStaticAssets(fly, o) {
    await fly.source(o.src || src.staticAssets).target(target);
}

export async function vendors(fly) {
    await fly.source(src.vendor).concat('vendor.js').target(`${target}`);
}

let conf;
export async function scripts(fly) {
    conf = conf || rollupConfig(isWatching && 'development');
    await fly.source('src/scripts/app.js').rollup(conf).target(`${target}`);
}

export async function styles(fly) {
    await fly.source(src.scss).sass({
        outputStyle: 'compressed',
        includePaths: []
    }).autoprefixer().target(`${target}`);
}

export async function build(fly) {
    // TODO add linting
    await fly.parallel(['clean', 'copyStaticAssets', 'styles', 'scripts', 'vendors']);
}

export async function release(fly) {
    await fly.source(`${target}/*.js`).uglify(uglifyConfig).target(`${target}`);
    await fly.source(`${target}/**/*`).rev({
        ignores: ['.html', '.png', '.svg', '.ico', '.json', '.txt']
    }).revManifest({dest: releaseTarget, trim: target}).revReplace().target(releaseTarget);
    await fly.source(`${releaseTarget}/*.html`).htmlmin().target(releaseTarget);
}

export async function watch(fly) {
    isWatching = true;
    await fly.start('build');
    await fly.watch(src.js, ['scripts', 'reload']);
    await fly.watch(src.scss, ['styles', 'reload']);
    await fly.watch(src.staticAssets, ['copyStaticAssets', 'reload']);
    // start server
    browserSync({
        server: target,
        logPrefix: 'hyperapp',
        port: process.env.PORT || 4000,
        middleware: [
            require('connect-history-api-fallback')()
        ]
    });
}

export async function reload(fly) {
    isWatching && browserSync.reload();
}
