const merge = require('webpack-merge');

module.exports = (config) => {
    return merge(...[
        require('./partial/css.webpack')({...config.css, ...config.global}),
        require('./partial/typescript.webpack')({...config.typescript, ...config.global})
    ]);
}