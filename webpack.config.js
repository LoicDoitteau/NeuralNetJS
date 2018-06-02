module.exports = {
    entry: {
        xor : "./Examples/XOR/sketch",
        autoencoder : "./Examples/AutoEncoder/sketch"
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