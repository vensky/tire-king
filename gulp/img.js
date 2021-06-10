const { dest, src } = require('gulp');
const multipipe = require('multipipe');
const newer = require('gulp-newer');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

module.exports = function img(env='dev') {
    if (env === 'dev') {
        return multipipe(
            src(['src/assets/*.{jpg,jpeg,png}', '!src/assets/icons/*.svg']),
            newer('src/img'),
            webp({ quality: 70 }),
            dest('src/assets'),
            src(['src/assets/*.{jpg,jpeg,png,gif,svg,webp}', '!src/assets/icons/**/*.svg']),
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({
                    quality: 75,
                    progressive: true,
                    interlaced: true,
                    optimizationLevel: 3,
                }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo()
            ]),
            dest('src/img')
            )
    }
    return multipipe(
        src(['src/*.{jpg,jpeg,png,gif,svg,webp}', '!src/assets/icons/**/*.svg']),
        dest('build/img'),
    )
}
