const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    output: {
        filename: "js/bundle.js", //name for the javascript file that is created/compiled in memory
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    mode: "development",
};