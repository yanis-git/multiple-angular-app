const helpers = require('./utils/index');

module.exports = {
    app1: {
        typescript : {
            entry: {
                app1: helpers.root('src/app1.ts'),
                polyfills: helpers.root('src/polyfills.ts')
            },
            entryModule: helpers.root() + '/src/app1/app.module/#AppModule'
        },
        css: {
            entry: {
                app1css: helpers.root('styles/app1/index.scss')
            },
            resources: [
                helpers.root('styles/app1/_variables.scss')
            ]
        },
        global: {
            manifest: 'app1-manifest.json'
        }
    },
    app2: {
        typescript : {
            entry: {
                app1: helpers.root('src/app2.ts'),
                polyfills: helpers.root('src/polyfills.ts')
            },
            entryModule: helpers.root() + '/src/app2/app.module/#AppModule'
        },
        css: {
            entry: {
                app2css: helpers.root('styles/app2/index.scss')
            },
            resources: [
                helpers.root('styles/app2/_variables.scss')
            ]
        },
        global: {
            manifest: 'app2-manifest.json'
        }
    }
};