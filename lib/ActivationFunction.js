function ActivationFunction(activation, derivative) {
    this.activation = activation;
    this.derivative = derivative;
};

const _sigmoid = x => 1 / (1 + Math.exp(-x));
const sigmoid = new ActivationFunction(_sigmoid, x => _sigmoid(x) * (1 - _sigmoid(x)));

const _tanh = x => Math.tanh(x);
const tanh = new ActivationFunction(_tanh, x => 1 - _tanh(x) * _tanh(x));

export {ActivationFunction, sigmoid, tanh};
