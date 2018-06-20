const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/build');

module.exports = {
    entry: ['@babel/polyfill', `${SRC_DIR}/index.jsx`],
    output: {
        filename: 'bundle.js',
        path: DIST_DIR,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            { test: /\.png$/, use: 'file-loader' },
            { test: /\.jpg$/, use: 'file-loader' },
            { test: /\.svg$/, use: 'file-loader' },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
};
