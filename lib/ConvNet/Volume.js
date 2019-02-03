function Volume(width, height, depth) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.data = [];
    this.init();
}

Volume.prototype.init = function() {
    // this.data = Array.from({length : this.width}, () => Array.from({length : this.height}, () => new Array(this.depth).fill(0)));
    this.data = new Array(this.width * this.height * this.depth).fill(0);
    return this;
}

Volume.prototype.map = function(func) {
    // this.data = this.data.map((row, x) => row.map((col, y) => col.map((val, z) => func(val, x, y, z))));
    this.data = this.data.map((val, i) => func(val, i % this.width, Math.floor(i % (this.width * this.height) / this.width), Math.floor(i / (this.width * this.height))));
    return this;
}

export {Volume};