const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "server",
    entry: [ path.join(CURRENT_WORKING_DIR , './server/server.js') ],
    target: "node",
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist/js'),
        filename: "server.generated.js",
        publicPath: '/dist/js/',
        libraryTarget: "commonjs2",
    },
    externals: [nodeExternals()],
    module: {
        rules: [
	       // `js` and `jsx` files are parsed using `babel`
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            // `.ts` or `.tsx` files are parsed using `ts-loader`
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader",
                options: {
                     transpileOnly: true
                }
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: [{
                    loader:'file-loader',
                        options: {
                            name:'../images/[name].[ext]'
                        }
                    }],
            },
            {
                test: /\.css$/,
                use: [{
                    loader:'css-loader',
                        options: {
                            sourceMap:false,
                        }
                    }],
            },
            // { // To extract CSS
            //     test: /\.css$/,
            //     use: [{
            //         loader:'file-loader',
            //             options: {
            //                 name:'../css/[name].[ext]',
            //                 sourceMap:false,
            //                 exportType:"string"
            //             }
            //         }],
            // }
            
        ]
    },
    resolve: {
    	extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    }
}

module.exports = config
