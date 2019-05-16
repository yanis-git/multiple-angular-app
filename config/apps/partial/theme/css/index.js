const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = options => {
    return {
        test: file => {
            return (file.match(/\.css$/) && !file.match(/\.component\.(css)$/));
        },
        include: options.include,
        use: [
            {
                loader:'style-loader'
            },
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    sourceMap: false
                }
            }
        ]
    };
};