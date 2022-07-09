const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");



module.exports = {
    entry: './src/index.tsx',

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },


    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],

    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.json'],
            },
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react', "@babel/preset-typescript"]
                }
            }
        }]
    }

}