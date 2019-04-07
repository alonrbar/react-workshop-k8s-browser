const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const baseConfig = {
    output: {
        path: path.resolve('./.tmp/dist')        
    },
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [
            { test: /(.png$|.gif$|.jpg|.jpeg$)/, use: [{ loader: "file-loader", query: { name: "res/[name].[ext]" } }] },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: [{ loader: "file-loader", query: { name: "res/[name].[ext]" } }] },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: [{ loader: "url-loader", query: { limit: "10000", mimetype: "application/font-woff", name: "res/[name].[ext]" } }] },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        modules: [path.resolve("./src"), "node_modules"]
    },
    plugins: [
        // new ProgressBarPlugin({
        //     clear: true
        // }),
        // new WebpackBuildNotifierPlugin({
        //     suppressSuccess: true,
        //     successSound: false,
        //     failureSound: false
        // })        
    ],
    stats: "minimal",
    optimization: {
        namedModules: true,
        concatenateModules: true
    }
};

const electronMainConfig = {
    target: 'electron-main',
    entry: path.resolve('./src/electronMain.ts'),
    output: {
        filename: 'main.js',
    },
};

const renderMainConfig = {
    target: 'electron-renderer',
    entry: './src/renderMain.tsx',
    output: {
        filename: 'render.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: false
        })
    ]
};

module.exports = [
    merge({}, baseConfig, electronMainConfig),
    merge({}, baseConfig, renderMainConfig)
];