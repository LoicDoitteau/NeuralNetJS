import {Network} from "../../lib/Network";
import {Layer} from "../../lib/Layer";
import {tanh} from "../../lib/ActivationFunction";

const sketch = p => {
    let network;
    let i = 0;
    const resolution = 10;
    let p1, p2, p3, p4;

    p.setup = () => {
        p.createCanvas(400, 400);
        p.noStroke();
        let inputLayer = new Layer(2);
        let hiddenLayers = [new Layer(4, tanh)];
        let outputLayer = new Layer(1, tanh);
        network = new Network(inputLayer, hiddenLayers, outputLayer);
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
