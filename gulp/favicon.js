const { dest, src } = require('gulp');
const multipipe = require('multipipe');
const newer = require('gulp-newer');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

module.exports = function favicon(env) {

    if (env === 'dev') {
        return multipipe(
            src(['src/assets/favicon/*.{ico,svg,png}']),
            newer('src'),
            imagemin([
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo()
            ]),
            dest('src')
            )
    }
    return multipipe(
        src('src/*.{ico,svg,png,json}'),
        dest('build')
    )
}
