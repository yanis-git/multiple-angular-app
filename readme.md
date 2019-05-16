multiple angular 6+ application in single project using webpack
====

Proof of concept :
--

How to manage multiple angular applications with single webpack build.

Actual available command for application 1: 
 - `npm run dev:app1` start **JIT** angular packaging in dist folder.
 - `npm run dist:app1` start **AOT** angular packaging in dist folder.

Actual available command for application 2: 
 - `npm run dev:app2` start **JIT** angular packaging in dist folder.
 - `npm run dist:app2` start **AOT** angular packaging in dist folder.


Used package : 
--

 - both compilation :
   - webpack@4
   - babel-loader
 - JIT :
   - ts-loader
   - angular2-template-loader
 - AOT : 
   - @ngtools/webpack

Original Issue :
--

The point is with AOT compilation, [@ngtools/webpack](https://www.npmjs.com/package/@ngtools/webpack) need to have hardcoded configuration as following :

    plugins: [
        new AngularCompilerPlugin({
            tsConfigPath: 'path/to/tsconfig.json',
            entryModule: 'path/to/app.module#AppModule',
            sourceMap: true
        })
    ]

i am not able to adapt this path for each applications which have to be managed by the webpack build.


Unexpected result
--
application `src/app2.ts` will have `src/app1/app.module` as entryPoint instead of him dedicated one.


Solution
--

Create dynamic configuration which will loaded relevant configuration base on execution context.
All configuration can be set on folder `config/config`

Ressource
--

[angular-cli issue : Comment which explain why is not yet available](https://github.com/angular/devkit/issues/861#issuecomment-391797538)
