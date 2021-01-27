const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'breadbutter.min.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            // {
            //     test: /\.ttf$/,
            //     use: [
            //         'file-loader',
            //         {
            //             loader: 'ttf-loader',
            //             options: {
            //                 name: './fonts/[name].[ext]',
            //             },
            //         },
            //     ]
            // },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            // {
            //     test: /\.ttf$/,
            //     use: [
            //         'file-loader',
            //         {
            //             loader: 'ttf-loader',
            //             options: {
            //                 name: './font/[name].[ext]',
            //             },
            //         },
            //     ]
            // },
            {
                test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            esModule: false,
                        },
                    },
                ],
            },
            // {
            //     test: /\.(ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
            //     // use: [{
            //     //     loader: 'file-loader', options: {esModule: false}
            //     // }]
            //     loader: "url-loader?limit=10000&mimetype=application/octet-stream&name=./fonts/[name].[ext]"
            // }
        ],
    },
    devServer: {
        overlay: true,
    },
};
