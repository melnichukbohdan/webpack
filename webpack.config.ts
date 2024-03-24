import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

type Mode = 'development' | 'production';

interface EnvVariables {
    mode: Mode
    port: number
}

export default (env: EnvVariables) => {
    const isDev = env.mode === 'development';

    const config: {
        mode: "development" | "production";
        output: { path: string; filename: string; clean: boolean };
        devtool: string;
        devServer: { port: number; open: boolean };
        entry: string;
        resolve: { extensions: string[] };
        plugins: (HtmlWebpackPlugin | MiniCssExtractPlugin)[];
        module: {
            rules: ({ test: RegExp; use: string[]; exclude: RegExp } | { test: RegExp; use: string; exclude: RegExp })[]
        }
    } = {
        mode: env.mode ?? 'development', // mode of build development(don't not optimized)/production (optimized)
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'build'), // folder to saving compiled file.
            filename: '[name].[contenthash].js', // the compiled file mame.
            clean: true // flag to remove old compiled file before compiling.
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html')
            }),
            isDev && new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        // style-loader was changed on MiniCssExtractPlugin.loader to
                        // separate css and js.
                        isDev ? MiniCssExtractPlugin.loader : 'style-loader',
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                    exclude: /node_modules/,
                },
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
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? {
            port: env.port ?? 3000,
            open: true,
        } : undefined,
    }

    return config
}