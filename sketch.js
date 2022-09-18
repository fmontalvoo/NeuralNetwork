let training_data = [
    {
        inputs: [0, 0],
        targets: [0]
    },
    {
        inputs: [0, 1],
        targets: [1]
    },
    {
        inputs: [1, 0],
        targets: [1]
    },
    {
        inputs: [1, 1],
        targets: [0]
    },
]

function setup() {
    // createCanvas(400, 400);

    let nn = new NeuralNetwork(2, 2, 1);

    for (let i = 0; i < 1000000; i++) {
        for (data of training_data) {
            nn.train(data.inputs, data.targets);
        }
    }

    for (data of training_data) {
        const output = nn.predict(data.inputs);
        console.log(data.targets, output);
    }

}

// function draw() {
//     background(220);
// }