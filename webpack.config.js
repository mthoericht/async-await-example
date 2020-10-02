var path = require('path');

const webpack           = require('webpack');

//@TODO: deaktiviert, sorgt für compile-Errors => Research!
//const uglyfyJsPlugin    = require('uglifyjs-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function createConfig()
{
    return {
        entry: './src/app/main.ts',
        output: {
            path: path.resolve('./dist'),
            pathinfo: true,
            filename: '[name].bundle.js',
            library: 'MarcusTest'
        },
        target: 'web',        
        devtool: 'source-map',
        resolve: {        
            extensions: ['.js', '.ts', '.json']
        },    
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: './src/images',
                    to:'./images'
                },
                {
                    from: './src/css',
                    to:'./css'
                }
            ]),
            new HtmlWebpackPlugin({
                template: './index.html',
                inject: 'body'
            })
            //new uglyfyJsPlugin({
            //    sourceMap: true
            //})
        ],
    
        module: {
            loaders: [
                {
                    test: /\.json$/,
                    include: path.join(__dirname, 'node_modules', 'pixi.js'),
                    loader: 'json'
                },
                { test: /\.tsx?$/, loader: "ts-loader" }
              ]
        }
    }
}

module.exports = createConfig();