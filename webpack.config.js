const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

module.exports = {
    plugins: [
        new Dotenv(),
        new webpack.IgnorePlugin({
            resourceRegExp: /dotenv/
        })
    ]
};