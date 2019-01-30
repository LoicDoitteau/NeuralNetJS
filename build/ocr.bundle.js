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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_Network__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _lib_Layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _lib_ActivationFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);




let network;
let mnist;

const trainingSketch = p => {

    let image;
    let index;

    p.setup = () => {
        p.createCanvas(200, 200);
        image = p.createImage(28, 28);
        loadMNIST(data => {
            mnist = data;
        });
        let inputLayer = new _lib_Layer__WEBPACK_IMPORTED_MODULE_1__["Layer"](784);
        let hiddenLayers = [];
        let outputLayer = new _lib_Layer__WEBPACK_IMPORTED_MODULE_1__["Layer"](10, _lib_ActivationFunction__WEBPACK_IMPORTED_MODULE_2__["sigmoid"]);
        network = new _lib_Network__WEBPACK_IMPORTED_MODULE_0__["Network"](inputLayer, hiddenLayers, outputLayer, true);
        index = 0;
        p.background(0);
    };

    p.draw = () => {
        if(mnist) {
            const imageData = mnist.train_images[index];
            const imageLabel = mnist.train_labels[index];
            image.loadPixels();
            for(let i = 0, j = 0; i < 784; i++, j += 4) {
                const n = imageData[i];
                image.pixels[j] = n;
                image.pixels[j + 1] = n;
                image.pixels[j + 2] = n;
                image.pixels[j + 3] = 255;
            }
            image.updatePixels();
            p.image(image, 0, 0, 200, 200);

            let input = Array.from(imageData, x => x / 255);
            let output = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            output[imageLabel] = 1;
            const guess = network.train(0.05, input, output).reduce((acc, x, i) => acc.v > x ? acc : {k : i, v : x}, {k : -1, v : -1}).k;
            guess == imageLabel ? p.fill(0, 255, 0) : p.fill(255, 0, 0);
            p.text(guess, 10, 10);

            index = (index + 1) % mnist.train_labels.length;
        }
    };
};

const drawingSketch = p => {

    let graphics;

    p.setup = () => {
        p.createCanvas(200, 200);
        graphics = p.createGraphics(200, 200);
        graphics.pixelDensity(1);
        graphics.background(0);
    };

    p.draw = () => {
        p.image(graphics, 0, 0, 200, 200);
        if(network) {
            if (p.keyIsPressed == true && p.keyCode == 32) { //spacebar
                graphics.background(0);
            }
            if(p.mouseIsPressed) {
                graphics.stroke(255);
                graphics.strokeWeight(16);
                graphics.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
            }

            let image = graphics.get();
            image.resize(28, 28);
            image.loadPixels();
            let input = Array.from({length : 784}, (_, i) => image.pixels[i * 4] / 255);
            const guess = network.feedForward(input).reduce((acc, x, i) => acc.v > x ? acc : {k : i, v : x}, {k : -1, v : -1}).k;
            p.fill(255, 255, 0);
            p.text(guess, 10, 10);
        }
    };
};

const visualisationStetch = n => p => {

    let image;

    p.setup = () => {
        p.createCanvas(200, 200);
        image = p.createImage(28, 28);
    };

    p.draw = () => {
        if(network) {
            setVisualisation(image, n);
            p.image(image, 0, 0, 200, 200);
            p.fill(255, 255, 0);
            p.text(n, 10, 10);
        }
    };
};

p5.disableFriendlyErrors = true;
new p5(drawingSketch);
new p5(trainingSketch);
for(var i = 0; i < 10; i++) new p5(visualisationStetch(i));

function loadMNIST(callback) {
    let mnist = {};
    let files = {
        train_images: 'data/train-images.idx3-ubyte',
        train_labels: 'data/train-labels.idx1-ubyte'
    };

    return Promise.all(Object.keys(files).map(async file => {
        mnist[file] = await loadFile(files[file]);
    })).then(() => callback(mnist));
}

async function loadFile(file) {
    const buffer = await fetch(file).then(response => response.arrayBuffer());
    const view = new DataView(buffer);
    const header = view.getUint32(0);
    const size = view.getUint32(4);
    let data = [];

    switch(header) {
        case 2049 : // labels
            data = new Uint8Array(buffer, 8);
            break;
        case 2051 : // images
            const subSize = view.getUint32(8) * view.getUint32(12);
            data = Array.from({length : size}, (_, i) => new Uint8Array(buffer, i * subSize + 16, subSize));
            break;
        default : 
            throw "Invalid file";
            break;
    }

    return data;
}

function setVisualisation(image, n) {
    let values = network.weigths[0].data[n];
    let {min, max} = values.reduce((acc, x) => {
        return {min : acc.min < x ? acc.min : x, max : acc.max > x ? acc.max : x};
    }, {min : Infinity, max : -Infinity});
    values = values.map(x => (x - min) / (max - min) * 255);
    image.loadPixels();
    for(let i = 0, j = 0; i < 784; i++, j += 4) {
        const p = values[i];
        image.pixels[j] = p;
        image.pixels[j + 1] = p;
        image.pixels[j + 2] = p;
        image.pixels[j + 3] = 255;
    }
    image.updatePixels();
}

/***/ }),
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
    this.weigths.forEach((x, i) => x.add(_Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"].dotProduct(this.gradients[i], _Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"].transpose(this.layers[i].neurons)).multiply(learningRate)));
    this.biases.forEach((x, i) =>  x.add(_Matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"].multiply(this.gradients[i], learningRate)));
};

Network.prototype.log = function() {
    console.group("Network");
    this.layers.forEach((layer, i) => layer.log(this.weigths[i], this.biases[i - 1]));
    console.groupEnd();
}

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

Layer.prototype.log = function(weigths, biases) {
    console.group("Layer");
    console.group("Neurons");
    this.neurons.log();
    console.groupEnd();
    if(biases) {
        console.group("Biases");
        biases.log();
        console.groupEnd();
    }
    if(weigths) {
        console.group("Weigths");
        weigths.log();
        console.groupEnd();
    }
    console.groupEnd();
}




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix", function() { return Matrix; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);


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
    return this.map(() => Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["random"])(-0.1, 0.1));
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

Matrix.prototype.log = function() {
    console.table(this.data);
}

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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
const random = (min, max) => Math.random() * (max - min) + min;



/***/ }),
/* 5 */
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




/***/ })
/******/ ]);