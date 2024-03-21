/* eslint-disable no-undef */

const path = require("path")
const isDevelopment = process.env.NODE_ENV !== "production"
// const nodeExternals = require('webpack-node-externals');

module.exports = async (env, options) => {
  const dev = options.mode === "development"
  const config = {
    mode: isDevelopment,
    devtool: "source-map",
    context: path.resolve(__dirname),
    entry: "./src/index.ts",
    output: {
      clean: true,
    },
    resolve: {
      extensions: [".js"],
      alias: {
        "@shared": path.resolve(__dirname, "../mib-shared/src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
      ],
    },
    plugins: [],
    watch: true,
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    externalsPresets: {
      node: true, // in order to ignore built-in modules like path, fs, etc.
    },
  }

  return config
}
