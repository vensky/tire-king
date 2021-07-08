const { dest, src } = require('gulp');
const multipipe = require('multipipe');
const plumber = require('gulp-plumber');

const bemValidator = require('gulp-html-bem-validator');
const hint = require('gulp-htmlhint');
const replace = require('gulp-html-replace');
const validator = require('gulp-w3c-html-validator');
const pug = require('gulp-pug');
const puglint = require('gulp-pug-linter');
const typograf = require('gulp-typograf');

const srcPath = 'src/pug/pages/*.pug';

module.exports = function html(env, version) {
    switch (env) {
        case 'dev':
            return multipipe(
                src(srcPath),
                plumber(),
                puglint({ reporter: 'default' }),
                pug({ pretty: true }),
                typograf({ locale: ['ru', 'en-US'] }),
                dest('src')
            );
            break;
        case 'test':
            return multipipe(
                src(srcPath),
                pug(),
                bemValidator(),
                validator(),
                hint(),
                hint.reporter()
            );
            break;
        case 'build':
            return multipipe(
                src(srcPath),
                pug(),
                replace({
                    edit: `<body>`,
                    css: `css/style.min-v${version}.css`,
                    js: `js/scripts.min-v${version}.js`,
                }),
                dest('build')
            );
            break;
    }
}

