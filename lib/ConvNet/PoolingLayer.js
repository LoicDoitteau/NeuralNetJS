import {Volume} from "./Volume"

function PoolingLayer(size, stride) {
    this.size = size;
    this.stride = stride;

    this.weights = [];
    this.biases = [];
}

PoolingLayer.prototype.compute = function(inputVolume) {
    const width = Math.floor(inputVolume.width - this.size / this.stride) + 1;
    const height = Math.floor(inputVolume.height - this.size / this.stride) + 1;
    const depth = inputVolume.depth;
    let volume = new Volume(width, height, depth);
}