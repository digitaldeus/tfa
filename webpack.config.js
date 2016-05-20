var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname + "/app",
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/main.js",
  module: {
    loaders: [
      // compile scss
      { 
        test: /\.scss$/, 
        loader: "style!css!resolve-url!sass?includePaths[]=" + 
          __dirname + "/node_modules/foundation-sites/scss/"
      },
      { 
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/, 
        loader: "file" 
      },
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      
      // compile jsx
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
    ]
  },
  output: {
    path: __dirname + "/public/js",
    filename: "main.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ExtractTextPlugin("styles.css"),
  ],
  sassLoader: {
    includePaths: [__dirname + "./scss"]
  }
};