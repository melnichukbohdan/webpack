import {PluginItem} from "@babel/core";

export function removeDataBabelPlugin(): PluginItem {
    return {
        visitor: {
            Program(path, state) {
                const forbiddenProps = state.opts.props || [];

                path.traverse({
                    JSXIdentifier(curent) {
                        const nodeName = curent.node.name;
                        if (forbiddenProps.includes(nodeName)) {
                            curent.parentPath.remove();
                        }
                    }
                })
            }
        }
    }
}
