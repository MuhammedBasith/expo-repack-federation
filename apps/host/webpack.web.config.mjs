import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  mode: 'development',
  target: 'web',
  entry: './index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['module:metro-react-native-babel-preset'],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.web.js', '.js', '.web.ts', '.ts', '.web.tsx', '.tsx', '.json'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    // Define __DEV__ for the web environment
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      process: { env: {} },
    }),
    new webpack.container.ModuleFederationPlugin({
      name: 'host',
      remotes: {
        app1: 'app1@http://localhost:3001/remoteEntry.js',
        app2: 'app2@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: { 
          singleton: true,
          requiredVersion: '18.2.0',
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '18.2.0',
          eager: true,
        },
        'react-native-web': {
          singleton: true,
          eager: true,
        },
      },
    }),
  ],
  devServer: {
    static: path.resolve('dist'),
    port: 3000,
    historyApiFallback: true, // Support client-side routing
  },
}; 