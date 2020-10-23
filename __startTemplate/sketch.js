

// Global variables
let balls = [];
let paddle;
let score;
let numBalls = 3
let gameOver = false;
// put setup code here
function setup() {
  //push fish into an array of fish image objects
  var cnv = createCanvas(800, 900);
  cnv.position((windowWidth - width) / 2, 10);
  background(80, 80, 80);
  //create a ball to follow the mouse
  let loc = createVector(width / 2, height * 2 / 3);
  paddle = new Paddle(loc, color(255, 0, 0));
  score = 0;
  loadballs();
}


function Ball() {
  this.loc = createVector(x, y);
  this.vel = createVector(random(-3, 3), random(-3, 3));
  this.acc = createVector(0, 0);
  this.diam = 15;
  this.col = color(random(100, 255), random(100), random(150, 255));

  this.run = function () {
    this.checkEdges();
    this.update();
    this.render();
  }

  this.update = function () {
    if (this !== balls[0]) {
      let d = this.loc.dist(balls[this.id - 1].loc)
      if (d < 700) {
        this.acc = p5.Vector.sub(balls[this.id - 1].loc, this.loc);
      }
      if (d < 15) {
        this.acc = p5.Vector.sub(this.loc, balls[this.id - 1].loc);
      }
      this.acc.normalize();   // set acc length to 1
      this.acc.mult(0.5);   // multiply by a small number
      this.vel.add(this.acc); // add acc to vel
      this.vel.limit(2);     // vel can't get bigger than 3
      this.loc.add(this.vel); // add vel to loc
    }
  }

  this.render = function () {
    if (this === balls[0]) {
      fill(20, 200, 100);
    } else {
      fill(this.clr);
    }

    this.checkEdges = function () {
      if (this.loc.x > width) this.loc.x = 0
      if (this.loc.x < 0) this.loc.x = width
      if (this.loc.y > height) this.loc.y = 0
      if (this.loc.y < 0) this.loc.y = height
    }
  }
}

function Paddle(x, y) {
  // paddle properties
  this.loc = createVector(x, y);
  this.col = color(random(100, 255), random(100), random(150, 255));
  this.paddleWidth = 10;
  this.paddleHeight = 5;

  // paddle functions
  this.run = function () {
    this.update();
    this.render();
  }

  this.update = function () {
    this.update = function () {
      if (this !== paddles[0]) {
        let d = this.loc.dist(paddles[this.id - 1].loc)
        if (d < 700) {
          this.acc = p5.Vector.sub(paddles[this.id - 1].loc, this.loc);
        }
        if (d < 15) {
          this.acc = p5.Vector.sub(this.loc, paddles[this.id - 1].loc);
        }

        this.acc.normalize();   // set acc length to 1
        this.acc.mult(0.5);   // multiply by a small number
        this.vel.add(this.acc); // add acc to vel
        this.vel.limit(2);     // vel can't get bigger than 3
        this.loc.add(this.vel); // add vel to loc
      }
    }
  }

  this.render = function () {
    if (this === paddles[0]) {
      fill(20, 50, 100);
    } else {
      fill(this.clr);
    }
  }

}