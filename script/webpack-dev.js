const merge = require('webpack-merge');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const config = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /(\.js|\.jsx|\.ts|\.tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new ForkTsCheckerWebpackPlugin({            
            checkSyntacticErrors: true,
            ignoreDiagnostics: [ 
                7027 // unreachable code
            ]
        })
    ]
};

const base = require('./webpack-base');
module.exports = [
    merge(base[0], config),
    merge(base[1], config)
];