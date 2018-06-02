import {Layer} from "./Layer";
import {Matrix} from "./Matrix";

function Network(inputLayer, hiddenLayers, outputLayer) {
    this.inputLayer = inputLayer;
    this.hiddenLayers = hiddenLayers;
    this.outputLayer = outputLayer;
    this.layers = [inputLayer, ...hiddenLayers, outputLayer];
    this.weigths = [];
    this.biases = [];
    this.gradients = [];
    this.init();
};

Network.prototype.init = function() {
    this.weigths = Array.from({length : this.layers.length - 1}, (_, i) => new Matrix(this.layers[i + 1].size, this.layers[i].size).randomize());
    this.biases = Array.from({length : this.layers.length - 1}, (_, i) => new Matrix(this.layers[i + 1].size, 1).randomize());
    this.gradients = Array.from({length : this.layers.length - 1}, (_, i) => new Matrix(this.layers[i + 1].size, 1));
};

Network.prototype.train = function(learningRate, input, output) {
    const guess = this.feedForward(input);
    this.backPropagate(learningRate, output);
    return guess;
};

Network.prototype.feedForward = function(input) {
    feedLayer(this, 0, Matrix.fromArray(input));
    return this.outputLayer.neurons.toArray();
};

Network.prototype.backPropagate = function(learningRate, output) {
    let errors = Matrix.substract(Matrix.fromArray(output), this.outputLayer.neurons);
    propagateLayer(this, this.layers.length - 1, errors);
    this.weigths.map((x, i) => x.add(Matrix.dotProduct(this.gradients[i], Matrix.transpose(this.layers[i].neurons)).multiply(learningRate)));
    this.biases.map((x, i) =>  x.add(Matrix.multiply(this.gradients[i], learningRate)));
};

function feedLayer(network, i, input) {
    let layer = network.layers[i];
    layer.neurons = input;

    if(i == network.layers.length - 1) return;

    layer = network.layers[i + 1];
    input = Matrix.dotProduct(network.weigths[i], input)
            .add(network.biases[i])
            .map(layer.activationFunction.activation);

    feedLayer(network, i + 1, input);
};

function propagateLayer(network, i, errors) {
    if(i == 0) return;

    let layer = network.layers[i];
    let gradient = Matrix.map(layer.neurons, layer.activationFunction.derivative)
                    .multiply(errors);

    network.gradients[i - 1] = gradient;

    errors = Matrix.dotProduct(Matrix.transpose(network.weigths[i - 1]), errors);

    propagateLayer(network, i - 1, errors);
};

export {Network};
