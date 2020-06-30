module.exports = {
    entry: ['@babel/polyfill','./src/main.js'],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase : __dirname + '/public',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /nome_modules/,
                exclude: /Modulo01Exercicios/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ],
    },
};