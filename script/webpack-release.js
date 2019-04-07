const merge = require('webpack-merge');

const config = {
    mode: 'production',    
    module: {
        rules: [
            { 
                test: /(\.js|\.jsx|\.ts|\.tsx)$/, 
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    },
    optimization: {
        noEmitOnErrors: true
    }
};

const base = require('./webpack-base');
module.exports = [
    merge(base[0], config),
    merge(base[1], config)
];