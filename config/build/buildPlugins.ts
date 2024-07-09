import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';
    const analyzer = options.analyzer;

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: options.paths.html
        }),
        new webpack.DefinePlugin({
          __PLATFORM__: JSON.stringify(options.platform),
          __ENV__: JSON.stringify(options.mode),
        })
    ]

    if (isDev) {
        plugins.push(
            new webpack.ProgressPlugin(),
            // Add types checks as separate process during building.
            new ForkTsCheckerWebpackPlugin(),
        )
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
        )

        if (analyzer) {
            plugins.push(new BundleAnalyzerPlugin())
        }
    }
    return plugins
}
