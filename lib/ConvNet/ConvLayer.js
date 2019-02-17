import {Volume} from "./Volume"
import {random} from "../Utils"
import {Matrix} from "../Matrix";

function ConvLayer(depth, size, stride, zeroPadding) {
    this.depth = depth;
    this.size = size;
    this.stride = stride;
    this.zeroPadding = zeroPadding;

    this.inputMatrix = null;
    this.weights = [];
    this.biases = [];
}

ConvLayer.prototype.init = function(depth) {
    // this.weights = Array.from({length : this.size * this.size * depth * this.depth}, () => random(-1, 1));
    // this.biases =  Array.from({length : this.depth}, () => random(-1, 1));
    this.weights = new Matrix(this.depth, this.size * this.size * depth).randomize();
    this.biases = new Matrix(this.depth, 1);
}

ConvLayer.prototype.compute = function(inputVolume) {
    const width = Math.floor(inputVolume.width - this.size + 2 * this.zeroPadding / this.stride) + 1;
    const height = Math.floor(inputVolume.height - this.size + 2 * this.zeroPadding / this.stride) + 1;
    const depth = this.depth;
    let volume = new Volume(width, height, depth);
    volume.map((_, x, y, z) => {
        this.biases[z];
    });
}