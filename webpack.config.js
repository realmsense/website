const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
    plugins: [
        new Dotenv(), // Set dotenv values (in environment.ts) at compile time
    ],
    resolve: {
        alias: {
            // https://github.com/webpack/webpack/issues/2858#issuecomment-240338772
            "dotenv/config$": path.resolve(__dirname, "src/noop.js")
        }
    }
};