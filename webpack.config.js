const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/assets/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}

/////

// const isDev = process.env.NODE_ENV === 'development'

// module.exports = {
//   mode: isDev ? 'development' : 'production',
//   entry: [
//     '@babel/polyfill', // enables async-await
//     './client/index.js'
//   ],
//   output: {
//     path: __dirname,
//     filename: './public/bundle.js'
//   },
//   resolve: {
//     extensions: ['.js', '.jsx']
//   },
//   devtool: 'source-map',
//   watchOptions: {
//     ignored: /node_modules/
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: 'babel-loader',
//             options: {
//               presets: [
//                 "@emotion/babel-preset-css-prop",
//                 "@babel/preset-react",
//                 "@babel/preset-env"
//               ],
//               plugins: [
//                 "@babel/plugin-syntax-dynamic-import",
//                 "@babel/plugin-syntax-import-meta",
//                 "@babel/plugin-proposal-class-properties",
//                 "@babel/plugin-proposal-json-strings",
//                 [
//                   "@babel/plugin-proposal-decorators",
//                   {
//                     "legacy": true
//                   }
//                 ],
//                 "@babel/plugin-proposal-function-sent",
//                 "@babel/plugin-proposal-export-namespace-from",
//                 "@babel/plugin-proposal-numeric-separator",
//                 "@babel/plugin-proposal-throw-expressions"
//               ],
//               cacheDirectory: true,
//             },
//           },
//         ],
//       }
//     ]
//   }
// }