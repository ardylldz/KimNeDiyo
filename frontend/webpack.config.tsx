const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SRC_DIR = path.resolve(__dirname, "./src");
const isDevelopment = process.env.NODE_ENV !== "production";
const { library } = require("@fortawesome/fontawesome-svg-core");
const { fas } = require("@fortawesome/free-solid-svg-icons");

library.add(fas); // FontAwesome ikonlarını kütüphaneye ekleyin

module.exports = {
  mode: "development",
  entry: SRC_DIR + "/index.tsx",
  output: {
    path: path.join(__dirname, "/dist"), // the bundle output path
    filename: "bundle.js", // the name of the bundle
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html", // to import index.html file inside index.js
    }),
  ],
  devServer: {
    port: 3030, // you can change the port
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.tsx?/,
        include: SRC_DIR,
        loader: "ts-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
      },
      {
        test: /\.json$/,
        include: SRC_DIR,
        type: "javascript/dynamic", // only for webpack 4+
        use: [{ loader: "json-import-loader" }, { loader: "json-loader" }],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
};
