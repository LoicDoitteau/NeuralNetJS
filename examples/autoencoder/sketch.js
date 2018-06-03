import {Network} from "../../lib/Network";
import {Layer} from "../../lib/Layer";
import {tanh} from "../../lib/ActivationFunction";

const sketch = p => {
    let network;

    p.setup = () => {
        p.createCanvas(400, 400);
        let inputLayer = new Layer(2);
        let hiddenLayers = [new Layer(4, tanh)];
        let outputLayer = new Layer(2, tanh);
        network = new Network(inputLayer, hiddenLayers, outputLayer);
        p.mouseX = p.width / 2;
        p.mouseY = p.height / 2;
    };

    p.draw = () => {
        p.background(200);
        const x = p.constrain(p.mouseX, 0, p.width) / p.width * 2 - 1;
        const y = p.constrain(p.mouseY, 0, p.height) / p.height * 2 - 1;
        const guess = network.train(0.1, [x, y], [x, y]);
        p.ellipse((guess[0] + 1) / 2 * p.width, (guess[1] + 1) / 2 * p.height, 20, 20);
    };
};

p5.disableFriendlyErrors = true;
new p5(sketch);
