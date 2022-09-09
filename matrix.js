function Matrix(rows = 1, cols = 1) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from(Array(this.rows), () => new Array(this.cols).fill(0));
}

// Metodos de clase

Matrix.prototype.add = function (m) {
    if (m instanceof Matrix) {
        if (this.rows !== n.rows || this.cols !== n.cols) {
            console.error('Columns and Rows of M1 must match Columns and Rows of M2.');
            return;
        }
        return this.map((value, row, col) => value + m[row][col]);
    } else {
        return this.map(value => value + m);
    }
};

Matrix.prototype.multiply = function (m) {
    if (m instanceof Matrix) {
        if (this.rows !== n.rows || this.cols !== n.cols) {
            console.error('Columns and Rows of M1 must match Columns and Rows of M2.');
            return;
        }
        return this.map((value, row, col) => value * m[row][col]);
    } else {
        return this.map(value => value * m);
    }
}

Matrix.prototype.map = function (callback = (value = [[0]], row = 0, col = 0) => 0) {
    for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
            let value = this.data[row][col];
            this.data[row][col] = callback(value, row, col);
        }
    }
    return this;
}

Matrix.prototype.toArray = function () {
    const array = [];
    this.data.map((row, r) => {
        return row.map((value, c) => array.push(value));
    });
    return array;
}

Matrix.prototype.randomize = function () {
    this.map(() => Math.floor(Math.random() * 10));
};

Matrix.prototype.print = function () {
    console.table(this.data);
}


// Metodos estaticos

Matrix.transpose = function (matrix = Matrix) {
    return new Matrix(matrix.cols, matrix.rows)
        .map((_, row, col) => matrix.data[col][row]);
}

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
};
