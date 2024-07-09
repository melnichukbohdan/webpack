import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

      const svgLoader = {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [{
              loader: '@svgr/webpack',
              options: {
                  icon: true,
                  svgoConfig: {
                      plugins: [{
                          name: 'convertColors',
                          params: {
                              currentColor: true,
                          }
                      }]
                  }
              }
          }],
      }

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

    let tsLoader: {} = {};

    if (isDev) {
          // TS loader with disabled types checker.
          tsLoader = {
              test: /\.tsx?$/,
              use: [
                  {
                      loader: 'ts-loader',
                      options: {
                          transpileOnly: true,
                          getCustomTransformers: () => ({
                              before: [ReactRefreshTypeScript()].filter(Boolean),
                          }),
                      }
                  }
              ]
            }
        } else {
        // TS loader default.
        tsLoader = {
            test: /\.tsx?$/, // regular expression.
            use: 'ts-loader', // the loader.
            exclude: /node_modules/, // won't be processed.
        }
    }

    return [
        assetLoader,
        svgLoader,
        scssLoader,
        tsLoader
    ]
}
