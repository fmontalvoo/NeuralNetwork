function NeuralNetwork(input_layer, hidden_layer, output_layer) {
    this.input_layer = input_layer;
    this.hidden_layer = hidden_layer;
    this.output_layer = output_layer;

    // Weigths inputs layer -> hidden layer
    this.weigths_ih = new Matrix(this.hidden_layer, this.input_layer);
    this.weigths_ih.randomize();
    // Weigths hiddenlayer -> output layer
    this.weigths_ho = new Matrix(this.output_layer, this.hidden_layer);
    this.weigths_ho.randomize();

    // Bias hidden layer
    this.bias_h = new Matrix(this.hidden_layer, 1);
    this.bias_h.randomize();
    // Bias output layer
    this.bias_o = new Matrix(this.output_layer, 1);
    this.bias_o.randomize();
}


// Funciones de clase

NeuralNetwork.prototype.feedForward = function (input_array = [0]) {

    let input = Matrix.fromArray(input_array);
    let hidden = Matrix.dot(this.weigths_ih, input);

    hidden.add(this.bias_h);
    hidden.map(NeuralNetwork.sigmoid);

    let output = Matrix.dot(this.weigths_ho, hidden);
    output.add(this.bias_o);

    output.map(NeuralNetwork.sigmoid);

    return output.toArray();
}

// Funciones estaticas

// Sigmoid function
// This is used for activation
// https://en.wikipedia.org/wiki/Sigmoid_function
NeuralNetwork.sigmoid = function (x = 0) {
    return 1 / (1 + Math.exp(-x));
    // return 1 / (1 + Math.pow(Math.E, -x));
}

// This is the Sigmoid derivative!
NeuralNetwork.dsigmoid = function (x = 0) {
    return x * (1 - x);
}

NeuralNetwork.tanh = function (x = 0) {
    return Math.tanh(x);
}

NeuralNetwork.dtanh = function (x = 0) {
    return 1 / (pow(Math.cosh(x), 2));
}