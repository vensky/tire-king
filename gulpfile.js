const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
const version = Date.now();

const { parallel, series, watch } = require('gulp');

const clean = require('./gulp/clean.js');
const browsersync = require('browser-sync').create();

const html = () => require('./gulp/html')(env, version);
const css = () => require('./gulp/css')(env, version);
const js = () => require('./gulp/js')(env, version);
const img = () => require('./gulp/img')(env);
const font = () => require('./gulp/font')(env);
const svg = require('./gulp/svg');
const lighthouse = require('./gulp/tasks/lighthouse');

function serve() {
    browsersync.init({
        server: 'src',
        notify: false,
        open: true,
        cors: true,
        online: true
    })
}

function watching() {
    watch('src/html/**/*.pug').on('change', series(html, browsersync.reload));
    watch('src/scss/**/*.scss').on('change', series(css, browsersync.reload));
    watch(['src/js/**/*.js', '!src/js/scripts.js']).on('change', series(js, browsersync.reload));
}

module.exports.img = series(img);
module.exports.svg = series(svg);
module.exports.font = series(font);

module.exports.ser = parallel(serve, watching);
module.exports.start = parallel(html, css, js, serve);
module.exports.test = parallel(html, css, js);
module.exports.build = series(clean, html, css, js, img, );
