/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Network", function() { return Network; });
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _Matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



function Network(inputLayer, hiddenLayers, outputLayer, randomize = true) {
    this.inputLayer = inputLayer;
    this.hiddenLayers = hiddenLayers;
    this.outputLayer = outputLayer;
    this.layers = [inputLayer, ...hiddenLayers, outputLayer];
    this.weigths = [];
    this.biases = [];
    this.gradients = [];
    this.init(randomize);
};

Network.prototype.init = function(randomize) {
    if(randomize) {
        this.weigths = Array.from({length : this.layers.length - 1}, (_, i) => new _Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"](this.layers[i + 1].size, this.layers[i].size).randomize());
        this.biases = Array.from({length : this.layers.length - 1}, (_, i) => new _Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"](this.layers[i + 1].size, 1).randomize());
    } else {
        this.weigths = Array.from({length : this.layers.length - 1}, (_, i) => new _Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"](this.layers[i + 1].size, this.layers[i].size));
        this.biases = Array.from({length : this.layers.length - 1}, (_, i) => new _Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"](this.layers[i + 1].size, 1));
    }
    this.gradients = Array.from({length : this.layers.length - 1}, (_, i) => new _Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"](this.layers[i + 1].size, 1));
};

Network.prototype.train = function(learningRate, input, output) {
    const guess = this.feedForward(input);
    this.backPropagate(learningRate, output);
    return guess;
};

Network.prototype.feedForward = function(input) {
    feedLayer(this, 0, _Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"].fromArray(input));
    return this.outputLayer.neurons.toArray();
};

Network.prototype.backPropagate = function(learningRate, output) {
    let errors = _Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"].substract(_Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"].fromArray(output), this.outputLayer.neurons);
    propagateLayer(this, this.layers.length - 1, errors);
    this.weigths.map((x, i) => x.add(_Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"].dotProduct(this.gradients[i], _Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"].transpose(this.layers[i].neurons)).multiply(learningRate)));
    this.biases.map((x, i) =>  x.add(_Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"].multiply(this.gradients[i], learningRate)));
};

function feedLayer(network, i, input) {
    let layer = network.layers[i];
    layer.neurons = input;

    if(i == network.layers.length - 1) return;

    layer = network.layers[i + 1];
    input = _Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"].dotProduct(network.weigths[i], input)
            .add(network.biases[i])
            .map(layer.activationFunction.activation);

    feedLayer(network, i + 1, input);
};

function propagateLayer(network, i, errors) {
    if(i == 0) return;

    let layer = network.layers[i];
    let gradient = _Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"].map(layer.neurons, layer.activationFunction.derivative)
                    .multiply(errors);

    network.gradients[i - 1] = gradient;

    errors = _Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"].dotProduct(_Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"].transpose(network.weigths[i - 1]), errors);

    propagateLayer(network, i - 1, errors);
};




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return Layer; });
/* harmony import */ var _Matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


function Layer(size, activationFunction = null) {
    this.size = size;
    this.activationFunction = activationFunction;
    this.neurons = null;
    this.init();
};

Layer.prototype.init = function() {
    this.neurons = _Matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix"].fromArray(new Array(this.size).fill(0));
};




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix", function() { return Matrix; });
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




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivationFunction", function() { return ActivationFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sigmoid", function() { return sigmoid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tanh", function() { return tanh; });
function ActivationFunction(activation, derivative) {
    this.activation = activation;
    this.derivative = derivative;
};

const _sigmoid = x => 1 / (1 + Math.exp(-x));
const sigmoid = new ActivationFunction(_sigmoid, x => _sigmoid(x) * (1 - _sigmoid(x)));

const _tanh = x => Math.tanh(x);
const tanh = new ActivationFunction(_tanh, x => 1 - _tanh(x) * _tanh(x));




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_Network__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _lib_Layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _lib_ActivationFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




const sketch = p => {
    let network;
    let i = 0;
    const resolution = 10;
    let p1, p2, p3, p4;

    p.setup = () => {
        p.createCanvas(400, 400);
        p.noStroke();
        let inputLayer = new _lib_Layer__WEBPACK_IMPORTED_MODULE_1__["Layer"](2);
        let hiddenLayers = [new _lib_Layer__WEBPACK_IMPORTED_MODULE_1__["Layer"](4, _lib_ActivationFunction__WEBPACK_IMPORTED_MODULE_2__["tanh"])];
        let outputLayer = new _lib_Layer__WEBPACK_IMPORTED_MODULE_1__["Layer"](1, _lib_ActivationFunction__WEBPACK_IMPORTED_MODULE_2__["tanh"]);
        network = new _lib_Network__WEBPACK_IMPORTED_MODULE_0__["Network"](inputLayer, hiddenLayers, outputLayer);
        p1 = p.createP();
        p2 = p.createP();
        p3 = p.createP();
        p4 = p.createP();
    };

    p.draw = () => {
        network.train(0.05, [0, 0], [0]);
        network.train(0.05, [0, 1], [1]);
        network.train(0.05, [1, 0], [1]);
        network.train(0.05, [1, 1], [0]);

        for(let x = 0; x < p.width; x += resolution) {
            for(let y = 0; y < p.height; y += resolution) {
                let guess = network.feedForward([x / p.width, y / p.height]);
                p.fill((1 - guess[0]) * 255);
                p.rect(x, y, resolution, resolution);
            }
        }
        
        p1.html("0 XOR 0 = " + Math.round(network.feedForward([0, 0])[0] * 1000) / 1000);
        p2.html("0 XOR 1 = " + Math.round(network.feedForward([0, 1])[0] * 1000) / 1000);
        p3.html("1 XOR 0 = " + Math.round(network.feedForward([1, 0])[0] * 1000) / 1000);
        p4.html("1 XOR 1 = " + Math.round(network.feedForward([1, 1])[0] * 1000) / 1000);

        if(++i == 1000) p.noLoop();
    };
};

p5.disableFriendlyErrors = true;
new p5(sketch);


/***/ })
/******/ ]);