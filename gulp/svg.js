const { dest, src } = require('gulp');
const multipipe = require('multipipe');

const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');

module.exports = function svg() {
    return multipipe(
        src('src/assets/icons/*.svg'),
        imagemin.svgo(),
        svgstore({
            inlineSvg: true,
        }),
        dest('src/img/')
    );
}
