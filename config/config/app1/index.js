const helpers = require('../../utils');

module.exports = {
    typescript: {
        entry: {
            app1: helpers.root('src/app1.ts'),
            polyfills: helpers.root('src/polyfills.ts')
        },
        include: [],
        entryModule: helpers.root() + '/src/app1/app.module/#AppModule',
        tsconfigPath: helpers.root('src/app1/tsconfig.json')
    },
    css: {
        entry: {},
        include: [],
        resources: []
    },
    global: {
        manifest: 'app1-manifest.json',
        aot: true,
        hashedName: false
    }
};
