import webpack from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const {mode, paths} = options;
    const isDev = mode === 'development';
    return {
        mode: mode ?? 'development', // mode of build development(don't not optimized)/production (optimized)
        entry: paths.entry,
        output: {
            path: paths.output, // folder to saving compiled file.
            filename: '[name].[contenthash].js', // the compiled file mame.
            clean: true // flag to remove old compiled file before compiling.
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : 'source-map',
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}
