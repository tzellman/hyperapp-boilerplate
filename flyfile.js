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

export async function clean() {
    await this.clear([target, releaseTarget]);
}

export async function copies(o) {
    await this.source(o.src || src.staticAssets).target(target);
}

export async function vendors() {
    await this.source(src.vendor).concat('vendor.js').target(`${target}`);
}

let conf;
export async function scripts() {
    conf = conf || rollupConfig(isWatching && 'development');
    await this.source('src/scripts/app.js').rollup(conf).target(`${target}`);
}

export async function styles() {
    await this.source(src.scss).sass({
        outputStyle: 'compressed',
        includePaths: []
    }).autoprefixer().target(`${target}`);
}

export async function build() {
    // TODO add linting
    await this.serial(['clean', 'copies', 'styles', 'scripts', 'vendors']);
}

export async function release() {
    await this.source(`${target}/*.js`).uglify(uglifyConfig).target(`${target}`);
    await this.source(`${target}/**/*`).rev({
        ignores: ['.html', '.png', '.svg', '.ico', '.json', '.txt']
    }).revManifest({dest: releaseTarget, trim: target}).revReplace().target(releaseTarget);
    await this.source(`${releaseTarget}/*.html`).htmlmin().target(releaseTarget);
}

export async function watch() {
    isWatching = true;
    await this.start('build');
    await this.watch(src.js, ['scripts', 'reload']);
    await this.watch(src.scss, ['styles', 'reload']);
    await this.watch(src.staticAssets, ['copies', 'reload']);
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

export async function reload() {
    isWatching && browserSync.reload();
}
