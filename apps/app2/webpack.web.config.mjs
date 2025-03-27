import path from 'path';
import webpack from 'webpack';

const STANDALONE = Boolean(process.env.STANDALONE);

export default {
  mode: 'development',
  target: 'web',
  entry: './index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3002/',
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
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      process: { env: {} },
    }),
    new webpack.container.ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/components/App.tsx',
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
    port: 3002,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow CORS for federation
    },
  },
}; 