import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";

type Mode = 'development' | 'production';

interface EnvVariables {
    mode: Mode
}

export default (env: any) => {
    const config: webpack.Configuration = {
        mode: env.mode ?? 'development', // mode of build development(don't not optimized)/production (optimized)
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            path: path.resolve(__dirname, 'build'), // folder to saving compiled file.
            filename: '[name].[contenthash].js', // the compiled file mame.
            clean: true // flag to remove old compiled file before compiling.
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/, // regular expression.
                    use: 'ts-loader', // the loader.
                    exclude: /node_modules/, // won't be processed.
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'], //extension of source code files for loader processing.
        },
    }

    return config
}