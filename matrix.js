function Matrix(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = Array.from(Array(this.rows), () => new Array(this.cols).fill(0));
    // this.matrix = [];
    // for (let i = 0; i < this.rows; i++) {
    //     this.matrix[i] = [];
    //     for (let j = 0; j < this.cols; j++) {
    //         this.matrix[i][j] = 0;
    //     }
    // }
}

Matrix.prototype.add = function (m) {
    if (m instanceof Matrix) {
        this.matrix = this.matrix.map((row, r) =>
            row.map((value, c) => value + m.matrix[r][c])
        );
    } else {
        this.matrix = this.matrix.map((row) => {
            return row.map((value) => value + m);
        });
    }
};

Matrix.prototype.multiply = function (m) {
    if (m instanceof Matrix) {
        this.matrix = this.matrix.map((row, r) =>
            row.map((value, c) => value * m.matrix[r][c])
        );
    } else {
        this.matrix = this.matrix.map((row) => {
            return row.map((value) => value * m);
        });
    }
}

Matrix.prototype.dot = function (m) {
    if (m instanceof Matrix) {
        if (this.cols !== m.rows) {
            console.log(`Columns of M1 must match rows of M2.`);
            return undefined;
        }

        let a = this;
        let b = m;
        let result = new Matrix(a.rows, b.cols);
        for (let r = 0; r < result.rows; r++) {
            for (let c = 0; c < result.cols; c++) {
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.matrix[r][k] * b.matrix[k][c];
                }
                result.matrix[r][c] = sum;
            }
        }
        return result;
    }
};

Matrix.prototype.transpose = function () {
    let result = new Matrix(this.cols, this.rows);
    for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols; c++) {
            result.matrix[c][r] = this.matrix[r][c];
        }
    }
    return result;
}

Matrix.prototype.randomize = function () {
    this.matrix = this.matrix.map((row) => {
        return row.map((value) => Math.floor(Math.random() * 10));
    });
};
