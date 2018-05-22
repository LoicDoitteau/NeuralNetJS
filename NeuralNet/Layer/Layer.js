function Layer(size, neuronsType) {
    this.size = size;
    this.neuronsType = neuronsType;
    this.neurons = [];
    this.init();
}

Layer.prototype.init = function() {
    switch(this.neuronsType) {
        case NEURONS.PERCEPTRON:
            throw "Not implemented";
            break;
        case NEURONS.SIGMOID:
            this.neurons = new Array(this.size).map(n => new SigmoidNeuron());
            break;
        case NEURONS.RELU:
            throw "Not implemented";
            break;
        default:
            throw "Not implemented";
            break;
    }
}
