const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const config = {
    entry: './src/index',
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
      // new BundleAnalyzerPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: './webpack.babelrc'
            }
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
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')({
                    browsers: ['> 1%', 'last 2 versions']
                  })
                ]
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
        components: path.resolve(__dirname, 'src/components/'),
        hooks: path.resolve(__dirname, 'src/hooks/'),
        modules: path.resolve(__dirname, 'src/modules/'),
        styles: path.resolve(__dirname, 'src/styles/'),
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
