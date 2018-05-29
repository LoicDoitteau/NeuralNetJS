function ActivationFunction(activation, derivative) {
    this.activation = activation;
    this.derivate = derivative;
};

const _sigmoid = x => 1 / (1 + Math.exp(-x));
const sigmoid = new ActivationFunction(_sigmoid, x => _sigmoid(x) * (1 - _sigmoid(x)));

export {ActivationFunction, sigmoid};
