const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const config = {
    entry: './src/viewer/index',
    output: {
      filename: './main.js',
      libraryTarget: 'umd',
      libraryExport: 'default',
      library: 'Ortelius'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ],
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
          test: /\.scss$/,
          loader: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                camelCase: true
              }
            },
            {
              loader: 'sass-loader'
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
      extensions: ['.js', '.jsx', '.scss'],
      alias: {
        editor: path.resolve(__dirname, 'src/editor/'),
        hooks: path.resolve(__dirname, 'src/hooks/'),
        lib: path.resolve(__dirname, 'src/lib/'),
        viewer: path.resolve(__dirname, 'src/viewer/'),
        utils: path.resolve(__dirname, 'src/utils/')
      }
    }
  };

  if (isDevelopment) {
    config.devServer = {
      contentBase: [
        path.join(__dirname, 'dist'),
        path.join(__dirname, 'examples'),
        path.join(__dirname, 'static')
      ],
      compress: true,
      port: 9000,
      watchContentBase: true,
      progress: true
    };
  }

  return config;
};
