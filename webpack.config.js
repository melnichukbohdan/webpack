const path = require('path');

module.exports = (env) => {
    return {
        mode: env.mode ?? 'development', // mode of build development(don't not optimized)/production (optimized)
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'build'), // folder to saving compiled file.
            filename: '[name].js', // the compiled file mame.
            clean: true // flag to remove old compiled file before compiling.
        }
    }
}