var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.FRONTENDTEMPLATE_PROTOCOL = process.env.FRONTENDTEMPLATE_PROTOCOL || 'https';
process.env.FRONTENDTEMPLATE_WS_PROTOCOL = process.env.FRONTENDTEMPLATE_WS_PROTOCOL || 'wss';
process.env.FRONTENDTEMPLATE_API_SERVER = process.env.FRONTENDTEMPLATE_API_SERVER || 'localhost:9000';

try {
    envFile(path.join(__dirname, 'reactconfig/' + process.env.NODE_ENV + '.env'));
} catch (e) {

}

module.exports = {
    entry: [
        'script!jquery/dist/jquery.min.js',
        './reactapp/app.jsx'
    ],
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor : {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                FRONTENDTEMPLATE_PROTOCOL: JSON.stringify(process.env.FRONTENDTEMPLATE_PROTOCOL),
                FRONTENDTEMPLATE_WS_PROTOCOL: JSON.stringify(process.env.FRONTENDTEMPLATE_WS_PROTOCOL),
                FRONTENDTEMPLATE_API_SERVER: JSON.stringify(process.env.FRONTENDTEMPLATE_API_SERVER)
            }
        })
    ],
    output: {
        path: __dirname,
        filename: './app/assets/javascripts/bundle.js'
    },
    resolve: {
        root: __dirname,
        alias: {
            configureStore: 'reactapp/main/store/configureStore.jsx',
            applicationStyles: 'reactapp/styles/app.scss',
            routes: 'reeactapp/routes.jsx'
        },
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                test: /\.jsx?$/,
                // exclude: /(node_modules|bower_components)/
                exclude: /bower_components/
            }
        ]
    },
    sassLoader: {
        includePaths: [
           // path.resolve(__dirname, './node_modules/foundation-sites/scss')
        ]
    },
    devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};
