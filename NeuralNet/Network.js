import {Layer} from "./Layer";
import {Matrix} from "./Matrix";

function Network(inputLayer, hiddenLayers, outputLayer) {
    this.inputLayer = inputLayer;
    this.hiddenLayers = hiddenLayers;
    this.outputLayer = outputLayer;
    this.layers = [inputLayer, ...hiddenLayers, outputLayer];
    this.weigths = [];
    this.biases = [];
    this.init();
};

Network.prototype.init = function() {
    this.weigths = Array.from({length : this.layers.length - 1}, (_, i) => new Matrix(this.layers[i].size, this.layers[i + 1].size).randomize());
    this.biases = Array.from({length : this.layers.length - 1}, (_, i) => new Matrix(this.layers[i + 1].size, 1).randomize());
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
    propagateLayer(this, this.layers.length, learningRate, errors);
};

function feedLayer(network, i, input) {
    let layer = network.layers[i];
    layer.neurons = input;

    if(i == network.weigths.length - 1) return;

    layer = network.layer[i + 1];
    input = Matrix.multiply(network.weigths[i], input)
            .add(network.biases[i])
            .map(layer.activationFunction.activate);

    feedLayer(network, i + 1, input);
};

function propagateLayer(network, i, learningRate, errors) {
    if(i == 0) return;

    let layer = network.layers[i];
    let gradients = Matrix.map(layer.neurons, layer.activationFunction.derivative)
                    .multiply(errors)
                    .multiply(learningRate);

    let layer = network.layer[i - 1];
    network.weigths[i - 1].add(Matrix.multiply(gradients, Matrix.transpose(layer.neurons)));
    network.biases[i - 1].add(gradients);

    errors = Matrix.multiply(Matrix.transpose(network.weigths[i - 1]), errors);

    propagateLayer(network, i - 1, learningRate, errors);
};

export {Network};
