let canvasSize = 400;
let colors = ['red', 'blue', 'yellow', 'white'];
let rectWidths = [40, 50, 60, 70, 80, 90];
let rectHeights = [30, 40, 50];
let paths = [];

function setup(){
  createCanvas(canvasSize, canvasSize);
  background(0);
  drawBackground();
  setPaths();
  drawPath();
  drawDots();
}

function drawBackground() {
  stroke(0);
  strokeWeight(5);

  let y = 0;
  while (y < canvasSize) {
    let x = 0;
    let h = random(rectHeights);
    if (y + h > canvasSize) h = canvasSize - y;

    while (x < canvasSize) {
      let w = random(rectWidths);
      if (x + w > canvasSize) w = canvasSize - x;

      fill(random(colors));
      rect(x, y, w, h);
      x += w;
    }
    y += h;
  }


  for(let i= 0; i<4; i++){
    let x2 = i* (canvasSize / 4)+ random(-10, 10);
    
  }
}

function setPaths(){
  let originalPaths = [
    // horizon paths
    [25, 25, 185, 25],
    [265, 25, 375, 25],
    [25, 105, 265, 105],
    [235, 175, 375, 175],
    [135, 175, 185, 175],
    [105, 225, 285, 225],
    [25, 275, 105, 275],
    [235, 275, 375, 275],
    [25, 375, 185, 375],
    [285, 375, 375, 375],
    // vertical paths
    [25, 25, 25, 100],
    [265, 25, 265, 175],
    [375, 25, 375, 175],
    [185, 25, 185, 105],
    [135, 105, 135, 175],
    [185, 175, 185, 375],
    [235, 175, 235, 275],
    [105, 225, 105, 275],
    [285, 225, 285, 375],
    [25, 275, 25, 375],
    [375, 275, 375, 375]
  ];

  // Convert each group of coordinates into an object {x1, y1, x2, y2} and store it in paths. 
  for (let p of originalPaths){
    paths.push({ x1: p[0], y1: p[1], x2: p[2], y2: p[3] });
  }
}

function drawPath(){
  stroke(0);
  strokeWeight(25);
  noFill();
  
  //draw all the paths
  for(let p of paths){
    line(p.x1, p.y1, p.x2, p.y2);
  }
}

function drawDots(){
  let dotSize = 4;
  let dotSpacing = 10;
  fill(255);
  noStroke();

  for (let p of paths){
    let dx = p.x2 - p.x1;
    let dy = p.y2 - p.y1;
    // cauculate the paths' length
    let length = dist(p.x1, p.y1, p.x2, p.y2);
    // cauculate the number of dots(get integer)
    let steps = int(length / dotSpacing);

    // draw dots
    for (let i = 0; i <= steps; i++){
      let x = p.x1 + (dx * i) / steps - dotSize / 2;
      let y = p.y1 + (dy * i) / steps - dotSize / 2;
      rect(x, y, dotSize, dotSize);
    }
  }
}