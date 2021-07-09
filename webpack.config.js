const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.join(__dirname, "build"),
        filename: "index.bundle.js"
    },
    mode: process.env.NODE_ENV || "development",
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        contentBase: path.join(__dirname, "src")
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg|pdf)$/,
                use: ["file-loader"]
            },
        ]
    },
    plugins: [
        new HtmlPlugin({
            template: path.join(__dirname, "src", "index.html")
        }),
        new ESLintPlugin({
            extensions: ['.js', '.jsx'],
        })
    ]
};