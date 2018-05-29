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

export {Layer};
