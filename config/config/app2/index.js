const helpers = require('../../utils');

module.exports = {
    typescript: {
        entry: {
            polyfills: helpers.root('src/polyfills.ts'),
            app2: helpers.root('src/app2.ts'),
        },
        include: [],
        entryModule: helpers.root() + '/src/app2/app.module/#AppModule',
        tsconfigPath: helpers.root('src/app2/tsconfig.json')
    },
    css: {
        entry: {},
        include: [],
        resources: []
    },
    global: {
        manifest: 'app2-manifest.json',
        aot: true,
        hashedName: false
    }
};
