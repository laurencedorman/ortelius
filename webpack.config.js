const path = require('path');

module.exports = {
  entry: './src/viewer/index',
  mode: 'development',
  output: {
    filename: './main.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'Ortelius'
  },
  devServer: {
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'static')],
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      editor: path.resolve(__dirname, 'src/editor/'),
      lib: path.resolve(__dirname, 'src/lib/'),
      viewer: path.resolve(__dirname, 'src/viewer/'),
      utils: path.resolve(__dirname, 'src/utils/')
    }
  }
};
