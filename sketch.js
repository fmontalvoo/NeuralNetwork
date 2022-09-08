function setup() {
    createCanvas(400, 400);
    let a = new Matrix(2, 3);
    let b = new Matrix(3, 2);
    a.randomize();
    b.randomize();
    console.table(a.matrix);
    console.table(b.matrix);

    let c = a.dot(b);
    console.table(c.matrix);

}

function draw() {
    background(220);
}