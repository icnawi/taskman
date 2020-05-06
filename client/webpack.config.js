const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const settings = {
    distPath: path.join(__dirname, "dist"),
    srcPath: path.join(__dirname, "src")
}

function srcPathExtended(subpath) {
    return path.join(settings.srcPath, subpath)
}

module.exports = (env, opts) => {
    const isDevMode = opts.mode === "development";

    return {
        devtool: isDevMode ? "source-map" : false,
        resolve: {
            extensions: ['.ts', 'tsx', '.js']
        },
        entry: './src/index.tsx',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: ["babel-loader", "ts-loader", "tslint-loader"]
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: isDevMode
                            }
                        },

                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ["> 1%", "last 2 versions"]
                                    })
                                ],
                                sourceMap: isDevMode
                            }
                        },

                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: isDevMode
                            }
                        },
                    ]
                },
                
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    use: [
                        {
                            loader: "file-laoder",
                            options: {
                                name: "fonts/[name].[ext]"
                            }
                        }
                    ]
                },

                {
                    test: /\.(jpe?g|png|gif|svg|ico)$/i,
                    use: [
                        {
                            loader: "file-laoder",
                            options: {
                                outputPath: "assets/"
                            }
                        }
                    ]
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: srcPathExtended("index.html")
            })
        ]
    }
}