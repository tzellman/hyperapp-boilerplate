const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = isDev => ({
    rollup: {
        plugins: [
            commonjs({
                namedExports: {
                    'node_modules/hyperapp/hx.js': ['app', 'html', 'h']
                }
            }),
            babel({
                exclude: 'node_modules/**'
            }),
            replace({'process.env.NODE_ENV': JSON.stringify(isDev || 'production')}),
            resolve({browser: true, jsnext: true, main: true})
        ]
    },
    bundle: {
        format: 'iife',
        sourceMap: isDev && true
    }
});
