const helpers = require('../../utils');

module.exports = {
    typescript: {
        entry: {
            app2: helpers.root('src/app2.ts'),
            polyfills: helpers.root('src/polyfills.ts')
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
