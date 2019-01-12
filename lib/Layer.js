import {Matrix} from "./Matrix"

function Layer(size, activationFunction = null) {
    this.size = size;
    this.activationFunction = activationFunction;
    this.neurons = null;
    this.init();
};

Layer.prototype.init = function() {
    this.neurons = Matrix.fromArray(new Array(this.size).fill(0));
};

Layer.prototype.log = function(weigths, biases) {
    console.group("Layer");
    console.group("Neurons");
    this.neurons.log();
    console.groupEnd();
    if(biases) {
        console.group("Biases");
        biases.log();
        console.groupEnd();
    }
    if(weigths) {
        console.group("Weigths");
        weigths.log();
        console.groupEnd();
    }
    console.groupEnd();
}

export {Layer};
