const webpack = require('webpack');

module.exports = {
    // ...
    resolve: {
        fallback: {
            // os: require.resolve('os-browserify/browser'),
            "crypto": require.resolve("crypto-browserify"),
            // "crypto": false,
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer")
            // util: require.resolve("util/")
        }
    },
    plugins: [
        require("node-polyfill-webpack-plugin"),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ]
    // ...
}