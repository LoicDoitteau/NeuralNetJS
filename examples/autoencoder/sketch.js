import {Network} from "../../lib/Network";
import {Layer} from "../../lib/Layer";
import {tanh} from "../../lib/ActivationFunction";

const sketch = p => {
    let network;

    p.setup = () => {
        p.createCanvas(400, 400);
        let inputLayer = new Layer(2);
        let hiddenLayers = [new Layer(2, tanh)];
        let outputLayer = new Layer(2, tanh);
        network = new Network(inputLayer, hiddenLayers, outputLayer);
        p.mouseX = p.width / 2;
        p.mouseY = p.height / 2;
    };

    p.draw = () => {
        p.background(200);
        p.mouseX = p.constrain(p.mouseX, 0, p.width);
        p.mousey = p.constrain(p.mouseY, 0, p.height);
        let guess = network.train(0.1, [p.mouseX / p.width, p.mouseY / p.height], [p.mouseX / p.width, p.mouseY / p.height]);
        p.ellipse(guess[0] * p.width, guess[1] * p.height, 20, 20)
        return false;
    };
};

p5.disableFriendlyErrors = true;
new p5(sketch);
