const merge = require('webpack-merge');

module.exports = (config) => {
    return merge(...[
        /**
         * Css management.
         */
        require('./partial/theme')({...config.css, ...config.global}),
        /**
         * Angular app management.
         */
        require('./partial/angular')({...config.typescript, ...config.global}),
        /**
         * Regular javascript
         */
        require('./partial/javascript'),
        /**
         * Global plugin.
         */
        require('./partial/global/plugins')(config),
        /**
         * Global optimization.
         */
        require('./partial/angular/optimization/global')
    ]);
};
