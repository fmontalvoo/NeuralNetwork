function Matrix(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = Array(this.rows).fill(Array(this.cols).fill(0));
    // for (let i = 0; i < this.rows; i++) {
    //   this.matrix[i] = [];
    //   for (let j = 0; j < this.cols; j++) {
    //     this.matrix[i][j] = 0;
    //   }
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
    this.matrix = this.matrix.map((row) => {
        return row.map((value) => value * m);
    });
};

Matrix.prototype.randomize = function () {
    this.matrix = this.matrix.map((row) => {
        return row.map((value) => Math.floor(Math.random() * 10));
    });
};
