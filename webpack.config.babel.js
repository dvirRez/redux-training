/**
 * Created by Dvir on 1/4/2018.
 */
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'dist'),
};


const isProduction =  process.env.npm_lifecycle_event === 'production';

process.env.BABEL_ENV = isProduction ? 'production' : 'development';

const productionPlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production'),
    },
});

const baseConfig = {
    entry: [
        PATHS.app,
    ],
    output: {
        path: PATHS.build,
        filename: "index_bundle.js",
        publicPath: '/',
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'},
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, "./app"), "node_modules"],
    },


};

const developmentConfig = {
    devtool: 'cheap-module-inline-source-map',
    devServer: {
        contentBase: PATHS.build,
        hot: true,
    },
    plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()],
};

const productionConfig = {
    devtool: 'cheap-module-source-map',
    plugins: [
        HTMLWebpackPluginConfig,
        productionPlugin,
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true, minimize: true })
    ],
};

export default Object.assign({}, baseConfig,
    isProduction ? productionConfig : developmentConfig
);