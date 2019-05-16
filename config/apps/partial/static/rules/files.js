/**
 * Copy files to output directory
 * Rename the file using the asset hash
 * Pass along the updated reference to your code
 *
 * Reference: https://github.com/webpack/file-loader
 *
 * Query string is needed for URLs inside css files, like bootstrap
 * Overwrites name parameter to put original name in the destination filename, too
 */
module.exports = (config) => {
    return {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?\S*)?$/i,
        use:
        [
            {
                loader: 'url-loader?limit=10000'
            },
            {
                loader: 'file-loader',
                options: {
                    name: (config.hashedName) ? '[name].[hash].[ext]' : '[name].[hash].[ext]'
                }
            }
        ]
    };
}