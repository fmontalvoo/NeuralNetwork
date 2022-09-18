function NeuralNetwork(input_layer, hidden_layer, output_layer) {
    this.input_layer = input_layer;
    this.hidden_layer = hidden_layer;
    this.output_layer = output_layer;
    this.setLearningRate();

    // Weigths inputs layer -> hidden layer
    this.weights_ih = new Matrix(this.hidden_layer, this.input_layer);
    this.weights_ih.randomize();
    // Weigths hiddenlayer -> output layer
    this.weights_ho = new Matrix(this.output_layer, this.hidden_layer);
    this.weights_ho.randomize();

    // Bias hidden layer
    this.bias_h = new Matrix(this.hidden_layer, 1);
    this.bias_h.randomize();
    // Bias output layer
    this.bias_o = new Matrix(this.output_layer, 1);
    this.bias_o.randomize();
}


// Funciones de clase

NeuralNetwork.prototype.setLearningRate = function (alpha = 0.1) {
    this.learning_rate = alpha;
}

NeuralNetwork.prototype.predict = function (inputs_array = [0]) {
    let inputs = Matrix.fromArray(inputs_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);

    hidden.add(this.bias_h);
    hidden.map(NeuralNetwork.sigmoid);

    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);

    outputs.map(NeuralNetwork.sigmoid);

    return outputs.toArray();
}

NeuralNetwork.prototype.train = function (inputs_array = [0], targets_array = [0]) {
    let inputs = Matrix.fromArray(inputs_array);
    let targets = Matrix.fromArray(targets_array);

    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(NeuralNetwork.sigmoid);

    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(NeuralNetwork.sigmoid);

    // Calculo de error de la capa de salida
    let output_errors = Matrix.subtract(targets, outputs);

    // Calculo gradiente de la capa de salida
    let output_gradients = Matrix.map(outputs, NeuralNetwork.dsigmoid);
    output_gradients.mult(output_errors);
    output_gradients.mult(this.learning_rate);

    // Calculo deltas de la capa de salida
    let hidden_T = Matrix.transpose(hidden);
    let weigths_ho_deltas = Matrix.multiply(output_gradients, hidden_T);

    // Ajuste de pesos y bias en la capa de salida
    this.weights_ho.add(weigths_ho_deltas);
    this.bias_o.add(output_gradients);

    // Calculo de error de la capa oculta
    let weigths_ho_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(weigths_ho_t, output_errors);

    // Calculo gradiente de la capa oculta
    let hidden_gradients = Matrix.map(hidden, NeuralNetwork.dsigmoid);
    hidden_gradients.mult(hidden_errors);
    hidden_gradients.mult(this.learning_rate);

    // Calculo deltas de la capa oculta
    let inputs_T = Matrix.transpose(inputs);
    let weigths_ih_deltas = Matrix.multiply(hidden_gradients, inputs_T);

    // Ajuste de pesos y bias en la capa oculta
    this.weights_ih.add(weigths_ih_deltas);
    this.bias_h.add(hidden_gradients);
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