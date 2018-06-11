module.exports = {
    mode: 'none',
    entry: {
        ocr : "./examples/ocr/sketch",
        xor : "./examples/xor/sketch",
        autoencoder : "./examples/autoencoder/sketch"
    },
    output: {
        path: __dirname + "/build",
        filename: "[name].bundle.js"
    },
    devServer: {
        open: true,
        openPage: "examples/index.html"
    }
};