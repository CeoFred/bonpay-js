const path = require("path");
const Dotenv = require('dotenv-webpack');


module.exports = {
  plugins: [new Dotenv()],
  devtool: 'inline-source-map',
  mode: 'development',
  entry: {
    v1: './src/v1/index.ts'
  },
  output: {
     filename: '[name].index.bundle.js',
     path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
   module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
   devServer: {
    static: './dist',
  },
};