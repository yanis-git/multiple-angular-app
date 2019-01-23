module.exports = {
    rule: [
        {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?\S*)?$/i,
            use:[
                {
                    loader: 'url-loader?limit=10000'
                },
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]'
                    }
                }
            ]
        },
        { 
            test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/, 
            loader: 'url-loader?limit=100000' 
        }
    ]
};