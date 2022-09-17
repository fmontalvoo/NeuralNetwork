function setup() {
    createCanvas(400, 400);

    let nn = new NeuralNetwork(2, 4, 1);

    let input = [1, 0];

    let output = nn.feedForward(input);

    console.log(output);

}

function draw() {
    background(220);
}