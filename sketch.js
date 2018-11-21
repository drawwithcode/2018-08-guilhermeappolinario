function setup() {

      createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);
  img = loadImage("assets/plane.svg");
  system = new ParticleSystem(createVector(+width/20-width/50, -height/20+height/10));

}

function draw() {
  background('black');
  noStroke();

  // Understanding device orientation: ALPHA = rotationZ
  // draw ALPHA red rectangle
  // fill('#F24440');
  // rect(0,0,map(rotationZ,0,360,1,width),height/3);
  // // print values
  // fill('#333333');
  // textAlign(LEFT)
  // text('0',5,height/6);
  // textAlign(CENTER)
  // text(round(rotationZ), width/2, height/6);
  // textAlign(RIGHT)
  // text('360',width-5,height/6);

  // Understanding device orientation: BETA = rotationX
  // draw BETA blue rectangle
  // fill('#1785FB');
  // rect(0,height/3,map(rotationX,-180,180,1,width),height/3);
  // // print values
  // fill('#333333');
  // textAlign(LEFT)
  // text('-180',5,height/2);
  // textAlign(CENTER)
  // text(round(rotationX), width/2, height/2);
  // textAlign(RIGHT);
  // text('180',width-5,height/2);



  // Understanding device orientation: GAMMA = rotationY
  // draw GAMMA green rectangle
  // fill('#73C86B');
  // rect(0,height/3*2,map(rotationY,-90,90,1,width),height/3);
  // //RETANGULO 2
  // // rect(width/2,height/2,10,10)
  // // print values
  // fill('#333333');
  // textAlign(LEFT);
  // text('-90',5,height/6*5)
  // textAlign(CENTER);
  // text(round(rotationY), width/2, height/6*5);
  // textAlign(RIGHT);
  // text('90',width-5,height/6*5)

  //plane
  // Displays the image at its actual size at point (0,0)
    //
    //   rotate(rotationY);


    // draw rect in gray
fill(192);
// rect(40, 40, 40, 40);
// rect(width/2,height/2, width/10,width/10);
// save drawing state for later
push();

// move the origin to the pivot point
translate(width/2,height/2);

// then pivot the grid
rotate(rotationY);

// draw rect in black at the new origin
fill(0);
// rect(-width/20, -width/20, width/10,width/10)
// imageMode(CENTER);
image(img, -width/20, -width/20, width/10, width/10);

//revert to original drawing state
// pop();

 system.addParticle();
 system.run();
}

// A simple Particle class
var Particle = function(position) {
 this.acceleration = createVector(0, 0.05);
 this.velocity = createVector(random(-0.1, 0.1), random(-1, 0));
 this.position = position.copy();
 this.lifespan = 255;
};

Particle.prototype.run = function() {
 this.update();
 this.display();
};

// Method to update position
Particle.prototype.update = function(){
 this.velocity.add(this.acceleration);
 this.position.add(this.velocity);
 this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
 stroke(200, this.lifespan);
 strokeWeight(0);
 fill(255, this.lifespan);
 ellipse(this.position.x, this.position.y, width/200, width/200);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
 return this.lifespan < 0;
};

var ParticleSystem = function(position) {
 this.origin = position.copy();
 this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
 this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
 for (var i = this.particles.length-1; i >= 0; i--) {
   var p = this.particles[i];
   p.run();
   if (p.isDead()) {
     this.particles.splice(i, 1);
   }
 }

}
