import {Neuron} from "./Neuron";

function Volume(width, height, depth) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.data = [];
    this.init();
}

Volume.prototype.init = function() {
    // this.data = Array.from({length : this.width}, () => Array.from({length : this.height}, () => new Array(this.depth).fill(0)));
    // this.data = new Array(this.width * this.height * this.depth).fill(0);
    this.data = Array.from({length : this.width * this.height * this.depth}, () => new Neuron());
    return this;
}

Volume.prototype.map = function(func) {
    // this.data = this.data.map((row, x) => row.map((col, y) => col.map((val, z) => func(val, x, y, z))));
    this.data = this.data.map((neuron, i) => neuron.value = func(neuron.value, i % this.width, Math.floor(i % (this.width * this.height) / this.width), Math.floor(i / (this.width * this.height))));
    return this;
}

Volume.prototype.sum = function() {
    return this.data.reduce((acc, neuron) => acc + neuron.value, 0);
}

Volume.prototype.reshape = function(width, height, depth) {
    if(width * height * depth != this.width * this.height * this.depth) throw "Invalid dimensions";
    this.width = width;
    this.height = height;
    this.depth = depth;
    return this;
}

export {Volume};