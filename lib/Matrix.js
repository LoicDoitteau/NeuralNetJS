function Matrix(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];
    this.init();
};

Matrix.prototype.init = function() {
    this.data = Array.from({length : this.rows}, () => new Array(this.cols).fill(0));
};

Matrix.prototype.copy = function() {
    return new Matrix(this.rows, this.cols).map((_, i, j) => this.data[i, j]);
}

Matrix.prototype.map = function(func) {
    this.data = this.data.map((row, i) => row.map((col, j) => func(col, i, j)));
    return this;
};

Matrix.prototype.randomize = function() {
    return this.map(() => Math.random() * 2 - 1);
};

Matrix.prototype.multiply = function(m) {
    if(m instanceof Matrix) {
        if (this.rows != m.rows || this.cols != m.cols) throw "Invalid operation";
        return this.map((x, i, j) => x * m.data[i][j]);
    } else {
        return this.map(x => x * m);
    }
};

Matrix.prototype.add = function(m) {
    if(m instanceof Matrix) {
        if (this.rows != m.rows || this.cols != m.cols) throw "Invalid operation";
        return this.map((x, i, j) => x + m.data[i][j]);
    } else {
        return this.map(x => x + m);
    }
};

Matrix.prototype.substract = function(m) {
    if(m instanceof Matrix) {
        if (this.rows != m.rows || this.cols != m.cols) throw "Invalid operation";
        return this.map((x, i, j) => x - m.data[i][j]);
    } else {
        return this.map(x => x - m);
    }
};

Matrix.prototype.toArray = function() {
    return [].concat(...this.data);
};

Matrix.map = function(m, func) {
    return new Matrix(m.rows, m.cols).map((_, i, j) => func(m.data[i][j], i, j));
};

Matrix.transpose = function(m) {
    return new Matrix(m.cols, m.rows).map((_, i, j) => m.data[j][i]);
};

Matrix.dotProduct = function(m1, m2) {
    if (m1.cols != m2.rows) throw "Invalid operation";
    return new Matrix(m1.rows, m2.cols).map((_, i, j) => m1.data[i].reduce((acc, x, k) => acc + x * m2.data[k][j], 0));
};

Matrix.multiply = function(m1, m2) {
    if(m2 instanceof Matrix) {
        if (m1.rows != m2.rows || m1.cols != m2.cols) throw "Invalid operation";
        return new Matrix(m1.rows, m1.cols).map((_, i, j) => m1.data[i][j] * m2.data[i][j]);
    } else {
        return new Matrix(m1.rows, m1.cols).map((_, i, j) => m1.data[i][j] * m2);
    }
};

Matrix.add = function(m1, m2) {
    if(m2 instanceof Matrix) {
        if (m1.rows != m2.rows || m1.cols != m2.cols) throw "Invalid operation";
        return new Matrix(m1.rows, m1.cols).map((_, i, j) => m1.data[i][j] + m2.data[i][j]);
    } else {
        return new Matrix(m1.rows, m1.cols).map((_, i, j) => m1.data[i][j] + m2);
    }
};

Matrix.substract = function(m1, m2) {
    if(m2 instanceof Matrix) {
        if (m1.rows != m2.rows || m1.cols != m2.cols) throw "Invalid operation";
        return new Matrix(m1.rows, m1.cols).map((_, i, j) => m1.data[i][j] - m2.data[i][j]);
    } else {
        return new Matrix(m1.rows, m1.cols).map((_, i, j) => m1.data[i][j] - m2);
    }
};

Matrix.fromArray = function(arr) {
    return new Matrix(arr.length, 1).map((_, i) => arr[i]);
};

export {Matrix};
