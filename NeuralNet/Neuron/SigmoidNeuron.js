function SigmoidNeuron(bias) {
    this.bias = bias || 0;
}

SigmoidNeuron.prototype.activate = function(x) {
    return 1 / (1 + Math.exp(-x));
}