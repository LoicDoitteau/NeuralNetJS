function Network(inputLayer, hiddenLayers, outputLayer) {
    this.inputLayer = inputLayer;
    this.hiddenLayers = hiddenLayers;
    this.outputLayer = outputLayer;
}

Network.prototype.activate() = function(input) {
    throw "Not implemented";
}

Network.prototype.backPropagation = function(learningRate, output) {
    throw "Not implemented";
}