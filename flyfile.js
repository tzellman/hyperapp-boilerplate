const browserSync = require('browser-sync');

let isWatching = false;

// some source/dest consts
const target = 'dist';
const releaseTarget = 'release';
const src = {
    js: 'src/**/*.js',
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

export async function js(fly) {
    await fly.source('src/app.js').rollup({
        rollup: {
            plugins: [
                require('rollup-plugin-buble')({jsx: 'h'}),
                require('rollup-plugin-commonjs')(),
                require('rollup-plugin-replace')({
                    'process.env.NODE_ENV': JSON.stringify(isWatching ? 'development' : 'production')
                }),
                require('rollup-plugin-node-resolve')({
                    browser: true,
                    main: true
                })
            ]
        },
        bundle: {
            format: 'iife',
            sourceMap: isWatching,
            moduleName: "window"
        }
    }).target(`${target}`);
}

export async function styles(fly) {
    await fly.source(src.scss).sass({
        outputStyle: 'compressed',
        includePaths: []
    }).autoprefixer().target(`${target}`);
}

export async function build(fly) {
    // TODO add linting
    await fly.serial(['clean', 'copyStaticAssets', 'styles', 'js', 'vendors']);
}

export async function release(fly) {
    await fly.source(`${target}/*.js`).uglify({
        compress: {
            conditionals: 1,
            drop_console: 1,
            comparisons: 1,
            join_vars: 1,
            booleans: 1,
            loops: 1
        }
    }).target(target);
    await fly.source(`${target}/**/*`).rev({
        ignores: ['.html', '.png', '.svg', '.ico', '.json', '.txt']
    }).revManifest({dest: releaseTarget, trim: target}).revReplace().target(releaseTarget);
    await fly.source(`${releaseTarget}/*.html`).htmlmin().target(releaseTarget);
}

export async function watch(fly) {
    isWatching = true;
    await fly.start('build');
    await fly.watch(src.js, ['js', 'reload']);
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
