function setup() {
    createCanvas(400, 400);
    let a = new Matrix(2, 3);
    let b = new Matrix(3, 2);
    a.randomize();
    b.randomize();
    a.print();
    b.print();

    let c = Matrix.dot(a, b);
    c.print();

    let d = Matrix.transpose(c);
    d.print();

}

function draw() {
    background(220);
}