let brain;

function setup() {
    createCanvas(400, 400);
    brain = new NeuralNetwork(3, 3, 1);
    matrix = new Matrix(3, 3);
    matrix.randomize();
    matrix.multiply(3);
    console.table(matrix.matrix);
}

function draw() {
    background(220);
}