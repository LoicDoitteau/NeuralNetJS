function Volume(width, height, depth) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.data = [];
    this.init();
}

Volume.prototype.init = function() {
    this.data = Array.from({length : this.width}, () => Array.from({length : this.height}, () => new Array(this.depth).fill(0)));
}

Volume.prototype.map = function(func) {
    this.data = this.data.map((row, x) => row.map((col, y) => col.map((val, z) => func(val, x, y, z))));
}

export {Volume};