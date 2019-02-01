import {Volume} from "./Volume"

function ConvLayer(depth, size, stride, zeroPadding) {
    this.depth = depth;
    this.size = size;
    this.stride = stride;
    this.zeroPadding = zeroPadding;

    this.weights = [];
    this.biases = [];
}

ConvLayer.prototype.compute = function(inputVolume) {
    const width = (inputVolume.width - this.size + 2 * this.zeroPadding) / this.stride + 1;
    const height = (inputVolume.height - this.size + 2 * this.zeroPadding) / this.stride + 1;
    const depth = this.depth;
    let volume = new Volume(width, height, depth);
}