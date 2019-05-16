module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                loose: true,
                targets: {
                    browsers: [
                        "last 2 versions",
                        "not ie <= 10"
                    ]
                },
                useBuiltIns: 'usage',
                corejs: "2",
                debug: false
            }
        ]
    ],
    cacheDirectory: true
};
