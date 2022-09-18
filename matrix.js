function Matrix(rows = 1, cols = 1) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from(Array(this.rows), () => new Array(this.cols).fill(0));
}

// Metodos de clase

Matrix.prototype.add = function (m) {
    if (m instanceof Matrix) {
        if (this.rows !== m.rows || this.cols !== m.cols) {
            console.error('Columns and Rows of M1 must match Columns and Rows of M2.');
            return;
        }
        return this.map((value, row, col) => value + m.data[row][col]);
    } else {
        return this.map(value => value + m);
    }
}

Matrix.prototype.multiply = function (m) {
    if (m instanceof Matrix) {
        if (this.rows !== m.rows || this.cols !== m.cols) {
            console.error('Columns and Rows of M1 must match Columns and Rows of M2.');
            return;
        }
        return this.map((value, row, col) => value * m.data[row][col]);
    } else {
        return this.map(value => value * m);
    }
}

Matrix.prototype.map = function (callback = (value = [[0]], row = 0, col = 0) => 0) {
    for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
            const value = this.data[row][col];
            this.data[row][col] = callback(value, row, col);
        }
    }
    return this;
}

Matrix.prototype.print = function () {
    console.table(this.data);
}

Matrix.prototype.randomize = function (min = -1, max = 1) {
    this.map(() => Math.floor((Math.random() * (max - min + 1)) + min));
}

Matrix.prototype.toArray = function () {
    const array = [];
    this.data.map((row, r) => {
        return row.map((value, c) => array.push(value));
    });
    return array;
}


// Metodos estaticos

Matrix.dot = function (a = Matrix, b = Matrix) {
    if (a instanceof Matrix && b instanceof Matrix) {
        if (a.cols !== b.rows) {
            console.error(`Columns of M1 must match rows of M2.`);
            return undefined;
        }

        return new Matrix(a.rows, b.cols)
            .map((_, row, col) => {
                let sum = 0;
                for (let k = 0; k < a.cols; k++)
                    sum += a.data[row][k] * b.data[k][col];
                return sum;
            });
    }
    return undefined;
}

Matrix.fromArray = function (array = [0]) {
    return new Matrix(array.length, 1)
        .map((_, row) => array[row]);
}

Matrix.map = function (matrix = Matrix, callback = (value = [[0]], row = 0, col = 0) => 0) {
    return new Matrix(matrix.rows, matrix.cols)
        .map((_, row, col) => callback(matrix.data[row][col], row, col));
}

Matrix.subtract = function (a = Matrix, b = Matrix) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
        console.error('Columns and Rows of A must match Columns and Rows of B.');
        return;
    }

    return new Matrix(a.rows, a.cols)
        .map((_, row, col) => a.data[row][col] - b.data[row][col]);
}

Matrix.transpose = function (matrix = Matrix) {
    return new Matrix(matrix.cols, matrix.rows)
        .map((_, row, col) => matrix.data[col][row]);
}