let training_data = [
    {
        inputs: [0, 0],
        outputs: [0]
    },
    {
        inputs: [0, 1],
        outputs: [1]
    },
    {
        inputs: [1, 0],
        outputs: [1]
    },
    {
        inputs: [1, 1],
        outputs: [0]
    },
]

function setup() {
    let nn = new NeuralNetwork(2, 2, 1);

    for (let i = 0; i < 10000; i++) {
        for (const data of training_data) {
            nn.train(data.inputs, data.outputs);
        }
    }

    for (const data of training_data) {
        const output = nn.predict(data.inputs);
        console.log(data.outputs, output);
    }
}