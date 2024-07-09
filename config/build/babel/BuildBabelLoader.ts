import {BuildOptions} from "../types/types";
import {removeDataBabelPlugin} from "./removeDataBabelPlugin";

export function buildBabelLoader(options: BuildOptions) {
  const isDev = options.mode === 'development';
  const isProd = options.mode === 'production';
  let plugins = [];

  if (isProd) {
      plugins.push([
          removeDataBabelPlugin,
          {
              props: ['data-testid'],
          }
      ])
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
            presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                ["@babel/preset-react", {
                    runtime: isDev
                        ? 'automatic'
                        : 'classic',
                }],
            ],
            plugins: plugins.length ? plugins : undefined
        }
    }
  }
}
