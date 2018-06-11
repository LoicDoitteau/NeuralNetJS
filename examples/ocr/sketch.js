import {Network} from "../../lib/Network";
import {Layer} from "../../lib/Layer";
import {sigmoid} from "../../lib/ActivationFunction";

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
        let inputLayer = new Layer(784);
        let hiddenLayers = [];
        let outputLayer = new Layer(10, sigmoid);
        network = new Network(inputLayer, hiddenLayers, outputLayer, false);
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

const zeroSketch  = p => {

    let image;

    p.setup = () => {
        p.createCanvas(200, 200);
        image = p.createImage(28, 28);
    };

    p.draw = () => {
        if(network) {
            setVisualisation(image, 0);
            p.image(image, 0, 0, 200, 200);
            p.fill(255, 255, 0);
            p.text(0, 10, 10);
        }
    };
};

const oneSketch  = p => {

    let image;

    p.setup = () => {
        p.createCanvas(200, 200);
        image = p.createImage(28, 28);
    };

    p.draw = () => {
        if(network) {
            setVisualisation(image, 1);
            p.image(image, 0, 0, 200, 200);
            p.fill(255, 255, 0);
            p.text(1, 10, 10);
        }
    };
};

const twoSketch  = p => {

    let image;

    p.setup = () => {
        p.createCanvas(200, 200);
        image = p.createImage(28, 28);
    };

    p.draw = () => {
        if(network) {
            setVisualisation(image, 2);
            p.image(image, 0, 0, 200, 200);
            p.fill(255, 255, 0);
            p.text(2, 10, 10);
        }
    };
};

const threeSketch  = p => {

    let image;

    p.setup = () => {
        p.createCanvas(200, 200);
        image = p.createImage(28, 28);
    };

    p.draw = () => {
        if(network) {
            setVisualisation(image, 3);
            p.image(image, 0, 0, 200, 200);
            p.fill(255, 255, 0);
            p.text(0+3, 10, 10);
        }
    };
};

const fourSketch  = p => {

    let image;

    p.setup = () => {
        p.createCanvas(200, 200);
        image = p.createImage(28, 28);
    };

    p.draw = () => {
        if(network) {
            setVisualisation(image, 4);
            p.image(image, 0, 0, 200, 200);
            p.fill(255, 255, 0);
            p.text(4, 10, 10);
        }
    };
};

const fiveSketch  = p => {

    let image;

    p.setup = () => {
        p.createCanvas(200, 200);
        image = p.createImage(28, 28);
    };

    p.draw = () => {
        if(network) {
            setVisualisation(image, 5);
            p.image(image, 0, 0, 200, 200);
            p.fill(255, 255, 0);
            p.text(5, 10, 10);
        }
    };
};

const sixSketch  = p => {

    let image;

    p.setup = () => {
        p.createCanvas(200, 200);
        image = p.createImage(28, 28);
    };

    p.draw = () => {
        if(network) {
            setVisualisation(image, 6);
            p.image(image, 0, 0, 200, 200);
            p.fill(255, 255, 0);
            p.text(6, 10, 10);
        }
    };
};

const sevenSketch  = p => {

    let image;

    p.setup = () => {
        p.createCanvas(200, 200);
        image = p.createImage(28, 28);
    };

    p.draw = () => {
        if(network) {
            setVisualisation(image, 7);
            p.image(image, 0, 0, 200, 200);
            p.fill(255, 255, 0);
            p.text(7, 10, 10);
        }
    };
};

const eightSketch  = p => {

    let image;

    p.setup = () => {
        p.createCanvas(200, 200);
        image = p.createImage(28, 28);
    };

    p.draw = () => {
        if(network) {
            setVisualisation(image, 8);
            p.image(image, 0, 0, 200, 200);
            p.fill(255, 255, 0);
            p.text(8, 10, 10);
        }
    };
};

const nineSketch  = p => {

    let image;

    p.setup = () => {
        p.createCanvas(200, 200);
        image = p.createImage(28, 28);
    };

    p.draw = () => {
        if(network) {
            setVisualisation(image, 9);
            p.image(image, 0, 0, 200, 200);
            p.fill(255, 255, 0);
            p.text(9, 10, 10);
        }
    };
};

p5.disableFriendlyErrors = true;
new p5(drawingSketch);
new p5(trainingSketch);
new p5(zeroSketch);
new p5(oneSketch);
new p5(twoSketch);
new p5(threeSketch);
new p5(fourSketch);
new p5(fiveSketch);
new p5(sixSketch);
new p5(sevenSketch);
new p5(eightSketch);
new p5(nineSketch);

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
            throw "Invalid file"
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