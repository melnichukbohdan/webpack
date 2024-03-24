import {Configuration} from "webpack";
import {BuildOptions} from "./types/types";

export function buildResolvers (options: BuildOptions): Configuration['resolve'] {
    return {
        //extension of source code files for loader processing.
        extensions: ['.tsx', '.ts', '.js'],
    }
}