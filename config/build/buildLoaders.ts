import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';
    const cssLoaderWithModules = {
            loader: "css-loader",
            options: {
                modules: {
                    localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
                },
            },
        }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            // style-loader was changed on MiniCssExtractPlugin.loader to
            // separate css and js.
            !isDev ? MiniCssExtractPlugin.loader : 'style-loader',
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            // Compiles Sass to CSS
            "sass-loader",
        ],
        exclude: /node_modules/,
    }

    const tsLoader = {
            test: /\.tsx?$/, // regular expression.
            use: 'ts-loader', // the loader.
            exclude: /node_modules/, // won't be processed.
        }

    return [
        scssLoader,
        tsLoader
    ]
}