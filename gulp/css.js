const { dest, src } = require('gulp');
const multipipe = require('multipipe');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');

const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const sass = require('gulp-dart-sass');
const stylelint = require('gulp-stylelint');

module.exports = function css(env='dev', version) {
    switch (env) {
        case 'dev':
            return multipipe(
                src('src/scss/style.scss', { sourcemaps: true }),
                plumber(),
                sass(),
                autoprefixer({
                    overrideBrowserslist: ["last 10 versions"],
                    grid: true,
                }),
                dest('src/css', { sourcemaps: true })
            );
        break;
        case 'test':
            return multipipe(
                src(['src/scss/**/*.scss', '!src/scss/_lib/*.scss', '!src/scss/_vars.scss', '!src/scss/_fonts.scss', '!src/scss/style.scss'], { sourcemaps: true }),
                stylelint({
                    failAfterError: false,
                    reporters: [
                        {
                            formatter: 'string',
                            console: true
                        }
                    ]
                })
            );
            break;
        case 'build':
            return multipipe(
                src('src/scss/style.scss', { sourcemaps: true }),
                sass(),
                autoprefixer({
                    overrideBrowserslist: ["last 10 versions"],
                    grid: true,
                }),
                clean({
                    level: {
                        1: {
                            all: true,
                            normalizeUrls: false,
                        },
                        2: {
                            restructureRules: true,
                        },
                    },
                }),
                rename({ extname: `.min-v${version}.css` }),
                dest('build/css')
            )
            break;
    }
}
