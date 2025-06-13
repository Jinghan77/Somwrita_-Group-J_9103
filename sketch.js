let offsetX = -170;
let offsetY = -400;
let pixelFont;
let pointsPacman = [];
let pointsPiet = [];
let screenSize = 400;
let colors = ['red', 'blue', 'yellow', 'white'];
let rectWidths = [40, 50, 60, 70, 80, 90];
let rectHeights = [30, 40, 50];
let paths = [];

let layer; 


let pacmanIndex = 0;
let ghostIndex = 0;
let pacmanProgress = 0;
let ghostProgress = 0;

let pacmanX = 0, pacmanY = 0;
let ghostX = 0, ghostY = 0;


let lastStepTime = 0;
const stepInterval = 100;
let animationStarted = false;
let timer = null;



const numCharacters = 5;
let charLastPath = new Array(numCharacters).fill(-1);  // path last time
let charReverse = new Array(numCharacters).fill(false); // if turned back or not

let charIndices = new Array(numCharacters).fill(0);     // index of current path
let charProgress = new Array(numCharacters).fill(0);    // steps on this path
let charPositions = new Array(numCharacters).fill({x:0, y:0}); // current location
let charStepCounters = new Array(numCharacters).fill(0); 



function preload() {
  pixelFont = loadFont("assets/pixelFont.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  noStroke();
  textAlign(CENTER);
  
  push();
  textFont(pixelFont);
  fill(255);
  pixelDensity(2);

  setInterval(regenerateBackground, 5000);

  pointsPacman = pixelFont.textToPoints("Pacman", 130 + offsetX, 70, 100, {
    sampleFactor: 0.12,
  });
  pointsPiet = pixelFont.textToPoints("* PIET", 270 + offsetX, 180, 100, {
    sampleFactor: 0.12,
  });
  pop();
  
push();
  layer = createGraphics(screenSize, screenSize);
  layer.stroke(0);
  layer.strokeWeight(4);
// initial background drawing method
  let y = 0;
  while (y < screenSize) {
    let x = 0;
    let h = random(rectHeights);
    if (y + h > screenSize) h = screenSize - y;

    while (x < screenSize) {
      let w = random(rectWidths);
      if (x + w > screenSize) w = screenSize - x;

      layer.fill(random(colors));
      layer.rect(x, y, w, h);
      x += w;
    }
    y += h;
  }
  for(let i= 0; i<4; i++){
    let x2 = i* (screenSize / 4)+ random(-10, 10);
    let w2 = random([40, 50, 60]);

    let y2= 0;
     while(y2 < screenSize){
      let h2 = random(rectHeights);
      if(y2+h2 > screenSize){
       h2 = screenSize - y2;
      }
     layer.fill(random(colors));
     layer.rect(x2, y2, w2, h2);
     y2 += h2;
  }
}
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 250, 205);

  push();
  translate(width / 2, height / 2);
  translate(offsetX, offsetY);

  drawBody();
  drawScreen();
  drawBackground(); 
  setPaths();
  buildPathGraph();
  drawPath();
  drawDots();
  

  if (animationStarted && millis() - lastStepTime > stepInterval) {
    stepCharacters();
    lastStepTime = millis();
  }

  // draw the character in its initial position
  if (animationStarted) {
    drawPixelPacman(charPositions[0].x - 42, charPositions[0].y + 260, color(255, 255, 0)); // Pac-Man
    drawPixelGhost(charPositions[1].x - 42, charPositions[1].y + 260, color(255, 0, 0));     // red
    drawPixelGhost(charPositions[2].x - 42, charPositions[2].y + 260, color(255, 100, 0));   // orange
    drawPixelGhost(charPositions[3].x - 42, charPositions[3].y + 260, color(0, 200, 0));     // green
    drawPixelGhost(charPositions[4].x - 42, charPositions[4].y + 260, color(90, 90, 255));   // purple
  }
  
  pop();

  fill(255, 255, 255, 150);
  rect(width / 2 - 310, height - 70, 620, 50, 10)

  fill(0);
  textSize(32);
  text("Click the screen to start the animation.", width / 2, height - 30);
}

function drawBackground() {
  image(layer, 138 + offsetX, 270);
}

function drawScreen() {
  fill(255, 255, 255);
  rect(138 + offsetX, 270, 400, 400);

  // Brightness range 100 ~ 255
  let t = millis() / 500;
  let brightness = 100 + 155 * abs(sin(t));  // abs smoother
  drawNeonText(pointsPacman, brightness);
  drawNeonText(pointsPiet, brightness);
}


function setPaths(){
  let originalPaths = [
    [25, 25, 185, 25],     // 0
    [265, 25, 375, 25],    // 1
    [25, 105, 265, 105],   // 2
    [235, 175, 375, 175],  // 3
    [135, 175, 185, 175],  // 4
    [105, 225, 285, 225],  // 5
    [25, 275, 105, 275],   // 6
    [235, 275, 375, 275],  // 7
    [25, 375, 185, 375],   // 8
    [285, 375, 375, 375],  // 9
    [25, 25, 25, 105],     // 10
    [265, 25, 265, 175],   // 11
    [375, 25, 375, 175],   // 12
    [185, 25, 185, 105],   // 13
    [135, 105, 135, 175],  // 14
    [185, 175, 185, 375],  // 15
    [235, 175, 235, 275],  // 16
    [105, 225, 105, 275],  // 17
    [285, 225, 285, 375],  // 18
    [25, 275, 25, 375],    // 19
    [375, 275, 375, 375]   // 20
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
    line(p.x1 - 32, p.y1 + 270, p.x2 - 32, p.y2 + 270);
  }
}

// dots on the road
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
      rect(x - 32, y + 270, dotSize, dotSize);
    }
  }
}

function drawPixelGhost(x, y, bodyColor) {
  const s = 2; // Pixel block size
  
  // 0=transparent，1=body，2=eye-white，3=eye
  let pixels = [
    [0,0,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1],
    [1,2,2,1,1,2,2,1],
    [1,3,2,1,1,3,2,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,0,1,0,1,0,1,1],
    
  ];
  
  for (let row = 0; row < pixels.length; row++) {
    for (let col = 0; col < pixels[row].length; col++) {
      let val = pixels[row][col];
      if (val === 1) fill(bodyColor); 
      else if (val === 2) fill(255); 
      else if (val === 3) fill(0); 
      else continue; 
      rect(x + col * s, y + row * s, s, s);
    }
  }
}

function drawPixelPacman(x, y, bodyColor) {
  const s = 2;

  // 0=transparent，1=body，2=mouth（transparent）
  let pixels = [
    [0,0,0,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,2,0],
    [1,1,1,1,1,1,1,1,2,2,2,2],
    [1,1,1,1,1,1,2,2,2,2,2,2],
    [1,1,1,1,1,1,1,1,2,2,2,2],
    [0,1,1,1,1,1,1,1,1,1,2,2],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0]
  ];

  for (let row = 0; row < pixels.length; row++) {
    for (let col = 0; col < pixels[row].length; col++) {
      let val = pixels[row][col];
      if (val === 1) fill(bodyColor); 
      else if (val === 2) fill(0);
      else continue;  
      rect(x + col * s, y + row * s, s, s);
    }
  }
}

function mousePressed() {
  if (!animationStarted) {
    animationStarted = true;

    // initialize all character positions and states
    setInitialPositions();

    // set the timer only once, prevent duplicate registration
    if (!timer) {
      timer = setInterval(stepCharacters, stepInterval);
    }
  }
}

function resetAnimation() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  animationStarted = false;
}

function keyPressed() {
  if (key === 'r') {
    resetAnimation();
  }
}


function setInitialPositions() {
  for (let i = 0; i < numCharacters; i++) {
    // initialize the starting path index for each character
    charIndices[i] = (i * 3) % paths.length;

    // initialize the character's progress on the path
    charProgress[i] = 0;

    // initialize the "last path" is -1 (indicates none)
    charLastPath[i] = -1;

    // initialize the path direction of each character 
    // (forward by default, from x1,y1 -> x2,y2)
    charReverse[i] = false;

    // initialize the path selection sequence number of the green ghost
    charStepCounters[i] = 0;

    // set initial coordinates
    let p = paths[charIndices[i]];
    let x = p.x1;
    let y = p.y1;

    // Save current location
    charPositions[i] = { x: x, y: y };
  }
}

function pointsMatch(p1, p2) {
  return dist(p1.x, p1.y, p2.x, p2.y) < 0.5;
}

function pointsMatch(p1, p2) {
  return dist(p1.x, p1.y, p2.x, p2.y) < 0.5;
}

function isReversePath(fromPoint, toPath, wasReversed) {
  let toA = { x: toPath.x1, y: toPath.y1 };
  let toB = { x: toPath.x2, y: toPath.y2 };
  let otherEnd = wasReversed ? toB : toA;
  return pointsMatch(fromPoint, otherEnd);
}


function moveAlongPath(i) {
  let index = charIndices[i];
  let progress = charProgress[i];
  let p = paths[index];

  // calculate direction
  let dx = charReverse[i] ? p.x1 - p.x2 : p.x2 - p.x1;
  let dy = charReverse[i] ? p.y1 - p.y2 : p.y2 - p.y1;
  let len = dist(p.x1, p.y1, p.x2, p.y2);
  let steps = Math.floor(len / 5);

  progress++;

  if (progress > steps) {
    let fromPoint = charReverse[i]
      ? { x: p.x1, y: p.y1 }
      : { x: p.x2, y: p.y2 };

    // choose the path to take
    let nextCandidates = pathGraph[index].filter(j => j !== charLastPath[i]);

    if (nextCandidates.length > 0) {
      // Weighting to reduce the probability of going back
      const reverseBias = 1;
      const turnBias = 3;

      let weighted = [];

      for (let next of nextCandidates) {
        let nextP = paths[next];
        if (isReversePath(fromPoint, nextP, charReverse[i])) {
         
          for (let n = 0; n < reverseBias; n++) weighted.push(next);
        } else {
          
          for (let n = 0; n < turnBias; n++) weighted.push(next);
        }
      }

      let next = random(weighted);
      let nextP = paths[next];

      // determine the direction to go
      if (pointsMatch(fromPoint, { x: nextP.x1, y: nextP.y1 })) {
        charReverse[i] = false;
      } else if (pointsMatch(fromPoint, { x: nextP.x2, y: nextP.y2 })) {
        charReverse[i] = true;
      } else {
        charProgress[i] = steps;
        return;
      }

      // switch path
      charLastPath[i] = index;
      index = next;
      progress = 1;

      // update path data
      p = paths[index];
      dx = charReverse[i] ? p.x1 - p.x2 : p.x2 - p.x1;
      dy = charReverse[i] ? p.y1 - p.y2 : p.y2 - p.y1;
      len = dist(p.x1, p.y1, p.x2, p.y2);
      steps = Math.floor(len / 5);
    } else {
      progress = steps; // stop at the end
    }
  }

  // insert data to updata location
  let t = progress / steps;
  let xStart = charReverse[i] ? p.x2 : p.x1;
  let yStart = charReverse[i] ? p.y2 : p.y1;
  let newX = xStart + dx * t;
  let newY = yStart + dy * t;

  charIndices[i] = index;
  charProgress[i] = progress;
  charPositions[i] = { x: newX, y: newY };
}



function stepCharacters() {
  console.log("moving");
  for (let i = 0; i < numCharacters; i++) {
    moveAlongPath(i);  
  }
}


let pathGraph = [];

function buildPathGraph() {
  pathGraph = [];

  // add all path to the empty list
  for (let i = 0; i < paths.length; i++) {
    pathGraph.push([]);
  }

  // paths endpoints connect
  for (let i = 0; i < paths.length; i++) {
    let p1a = { x: paths[i].x1, y: paths[i].y1 };
    let p1b = { x: paths[i].x2, y: paths[i].y2 };

    for (let j = 0; j < paths.length; j++) {
      if (i === j) continue;

      let p2a = { x: paths[j].x1, y: paths[j].y1 };
      let p2b = { x: paths[j].x2, y: paths[j].y2 };

      if (pointsMatch(p1a, p2a) || pointsMatch(p1a, p2b) ||
          pointsMatch(p1b, p2a) || pointsMatch(p1b, p2b)) {
        if (!pathGraph[i].includes(j)) {
          pathGraph[i].push(j);
        }
      }
    }
  }
}

// Close endpoints are considered the same point
function pointsMatch(p1, p2) {
  return dist(p1.x, p1.y, p2.x, p2.y) < 0.5; // Control accuracy
}


function regenerateBackground() {
  layer = createGraphics(screenSize, screenSize);
  layer.stroke(0);
  layer.strokeWeight(4);

  let y = 0;
  while (y < screenSize) {
    let x = 0;
    let h = random(rectHeights);
    if (y + h > screenSize) h = screenSize - y;

    while (x < screenSize) {
      let w = random(rectWidths);
      if (x + w > screenSize) w = screenSize - x;

      layer.fill(random(colors));
      layer.rect(x, y, w, h);
      x += w;
    }
    y += h;
  }

  for (let i = 0; i < 4; i++) {
    let x2 = i * (screenSize / 4) + random(-10, 10);
    let w2 = random([40, 50, 60]);
    let y2 = 0;
    while (y2 < screenSize) {
      let h2 = random(rectHeights);
      if (y2 + h2 > screenSize) h2 = screenSize - y2;
      layer.fill(random(colors));
      layer.rect(x2, y2, w2, h2);
      y2 += h2;
    }
  }
}





function drawBody(){
  // black
    fill(0, 0, 0);
  rect(78 + offsetX, -30, 520, 220);
  rect(88 + offsetX, 220, 500, 500);
  rect(68 + offsetX, 200, 540, 10);
  rect(68 + offsetX, -60, 540, 10);
  rect(68 + offsetX, -60, 10, 260);
  rect(598 + offsetX, -60, 10, 260);
  rect(78 + offsetX, 210, 520, 10);
  rect(50 + offsetX, -80, 30, 10);
  rect(598 + offsetX, -80, 30, 10);
  rect(68 + offsetX, -70, 20, 10);
  rect(588 + offsetX, -70, 20, 10);
  rect(42 + offsetX, -70, 8, 280);
  rect(628 + offsetX, -70, 8, 280);
  rect(48 + offsetX, 210, 10, 10);
  rect(618 + offsetX, 210, 10, 10);
  rect(58 + offsetX, 220, 10, 510);
  rect(608 + offsetX, 220, 10, 510);
  rect(50 + offsetX, 730, 8, 20);
  rect(618 + offsetX, 730, 8, 30);
  rect(80 + offsetX, 720, 516, 20);
  rect(50 + offsetX, 730, 8, 30);
  rect(42 + offsetX, 760, 8, 30);
  rect(626 + offsetX, 760, 8, 30);
  rect(34 + offsetX, 790, 8, 30);
  rect(634 + offsetX, 790, 8, 30);
  rect(26 + offsetX, 820, 8, 110);
  rect(642 + offsetX, 820, 8, 110);
  rect(48 + offsetX, 840, 580, 90);
  rect(56 + offsetX, 930, 564, 20);
  rect(72 + offsetX, 950, 532, 20);
  rect(80 + offsetX, 970, 516, 220);

  // dark grey
  fill(62, 58, 57);
  rect(58 + offsetX, 740, 560, 110);

  // light red
  fill(218, 60, 52);
  rect(78 + offsetX, -50, 520, 20);
  rect(50 + offsetX, -70, 20, 270);
  rect(608 + offsetX, -70, 20, 270);
  rect(68 + offsetX, 220, 20, 500);
  rect(588 + offsetX, 220, 20, 500);
  rect(58 + offsetX, 730, 22, 20);
  rect(596 + offsetX, 730, 22, 30);
  rect(68 + offsetX, 720, 12, 10);
  rect(596 + offsetX, 720, 12, 10);
  rect(58 + offsetX, 730, 14, 30);
  rect(50 + offsetX, 760, 14, 30);
  rect(612 + offsetX, 760, 14, 30);
  rect(42 + offsetX, 790, 14, 30);
  rect(620 + offsetX, 790, 14, 30);
  rect(34 + offsetX, 820, 14, 110);
  rect(628 + offsetX, 820, 14, 110);
  rect(58 + offsetX, 970, 22, 220);
  rect(596 + offsetX, 970, 22, 220);
  rect(221 + offsetX, 980, 10, 150);
  rect(431 + offsetX, 980, 10, 150);
  rect(231 + offsetX, 1130, 200, 10);

  // red
  fill(156, 31, 36);
  rect(78 + offsetX, 190, 520, 10);
  rect(62 + offsetX, -70, 8, 270);
  rect(608 + offsetX, -70, 8, 270);
  rect(50 + offsetX, 200, 20, 10);
  rect(608 + offsetX, 200, 20, 10);
  rect(80 + offsetX, 220, 8, 500);
  rect(588 + offsetX, 220, 8, 500);
  rect(34 + offsetX, 930, 14, 20);
  rect(628 + offsetX, 930, 14, 20);
  rect(50 + offsetX, 950, 14, 20);
  rect(612 + offsetX, 950, 14, 20);
  rect(72 + offsetX, 970, 8, 220);
  rect(596 + offsetX, 970, 8, 220);
  rect(58 + offsetX, 970, 14, 50);
  rect(604 + offsetX, 970, 14, 50);
  rect(58 + offsetX, 1170, 14, 20);
  rect(604 + offsetX, 1170, 14, 20);
  rect(221 + offsetX, 1010, 10, 10);
  rect(431 + offsetX, 1010, 10, 10);

  // heavy red
  fill(99, 16, 24);
  rect(58 + offsetX, 210, 20, 10);
  rect(598 + offsetX, 210, 20, 10);
  rect(72 + offsetX, 730, 8, 20);
  rect(596 + offsetX, 730, 8, 20);
  rect(64 + offsetX, 760, 8, 20);
  rect(604 + offsetX, 760, 8, 20);
  rect(56 + offsetX, 790, 8, 20);
  rect(612 + offsetX, 790, 8, 20);
  rect(48 + offsetX, 820, 8, 20);
  rect(620 + offsetX, 820, 8, 20);
  rect(34 + offsetX, 850, 14, 80);
  rect(628 + offsetX, 850, 14, 80);
  rect(48 + offsetX, 930, 14, 20);
  rect(614 + offsetX, 930, 14, 20);
  rect(56 + offsetX, 950, 16, 20);
  rect(604 + offsetX, 950, 16, 20);
  rect(72 + offsetX, 970, 8, 50);
  rect(596 + offsetX, 970, 8, 50);
  rect(231 + offsetX, 970, 200, 10);
  rect(221 + offsetX, 980, 10, 30);
  rect(431 + offsetX, 980, 10, 30);

  // dark grey detail
  fill(62, 58, 57);
  rect(138 + offsetX, 250, 400, 10);
  rect(128 + offsetX, 260, 10, 10);
  rect(538 + offsetX, 260, 10, 10);
  rect(118 + offsetX, 270, 10, 400);
  rect(548 + offsetX, 270, 10, 400);
  rect(128 + offsetX, 670, 10, 10);
  rect(538 + offsetX, 670, 10, 10);
  rect(138 + offsetX, 680, 400, 10);
  rect(88 + offsetX, 720, 500, 10);
  rect(251 + offsetX, 1000, 160, 120);

  // black buttons
  fill(0, 0, 0);
  rect(72 + offsetX, 750, 8, 30);
  rect(596 + offsetX, 750, 8, 30);
  rect(64 + offsetX, 780, 8, 30);
  rect(604 + offsetX, 780, 8, 30);
  rect(56 + offsetX, 810, 8, 30);
  rect(612 + offsetX, 810, 8, 30);
  rect(34 + offsetX, 930, 8, 20);
  rect(634 + offsetX, 930, 8, 20);
  rect(42 + offsetX, 950, 8, 20);
  rect(626 + offsetX, 950, 8, 20);
  rect(50 + offsetX, 970, 8, 220);
  rect(618 + offsetX, 970, 8, 220);
  rect(58 + offsetX, 1190, 38, 20);
  rect(580 + offsetX, 1190, 38, 20);
  rect(372 + offsetX, 1000, 40, 60);
  rect(272 + offsetX, 1052, 40, 40);

  // red button
  fill(0);
  rect(492 + offsetX, 750, 40, 48);
  rect(484 + offsetX, 758, 56, 32);
  rect(500 + offsetX, 742, 24, 64);
  fill(218, 60, 52);
  rect(500 + offsetX, 750, 24, 40);
  rect(492 + offsetX, 758, 40, 24);
  fill(156, 31, 36);
  rect(492 + offsetX, 782, 8, 8);
  rect(524 + offsetX, 782, 8, 8);
  rect(500 + offsetX, 790, 24, 8);
  fill(255);
  rect(500 + offsetX, 758, 8, 8);

  // yellow button
  fill(0);
  rect(412 + offsetX, 770, 40, 48);
  rect(420 + offsetX, 762, 24, 64);
  rect(404 + offsetX, 778, 56, 32);
  fill(255, 215, 0);
  rect(420 + offsetX, 770, 24, 40);
  rect(412 + offsetX, 778, 40, 24);
  fill(255, 165, 0);
  rect(412 + offsetX, 802, 8, 8);
  rect(444 + offsetX, 802, 8, 8);
  rect(420 + offsetX, 810, 24, 8);
  fill(255);
  rect(420 + offsetX, 780, 10, 10);

  // joystick (enlarged 1.5x)
  let scale = 1.5;
  let baseX = 140 + offsetX;
  let baseY = 708;
  fill(0);
  rect(baseX, baseY, 56 * scale, 32 * scale);
  rect(baseX + 8 * scale, baseY + 32 * scale, 40 * scale, 8 * scale);
  rect(baseX + 16 * scale, baseY + 40 * scale, 24 * scale, 30 * scale);
  rect(baseX + 8 * scale, baseY + 54 * scale, 40 * scale, 24 * scale);
  rect(baseX + 16 * scale, baseY + 78 * scale, 24 * scale, 8 * scale);
  rect(baseX, baseY + 62 * scale, 56 * scale, 8 * scale);
  fill(62, 58, 57);
  rect(baseX + 24 * scale, baseY + 48 * scale, 8 * scale, 14 * scale);
  rect(baseX + 16 * scale, baseY + 70 * scale, 24 * scale, 8 * scale);
  rect(baseX + 8 * scale, baseY + 62 * scale, 8 * scale, 8 * scale);
  rect(baseX + 40 * scale, baseY + 62 * scale, 8 * scale, 8 * scale);
  fill(0, 86, 179);
  rect(baseX + 8 * scale, baseY + 14 * scale, 40 * scale, 18 * scale);
  rect(baseX + 16 * scale, baseY + 32 * scale, 24 * scale, 8 * scale);
  fill(0, 123, 255);
  rect(baseX + 16 * scale, baseY - 8 * scale, 24 * scale, 40 * scale);
  rect(baseX + 8 * scale, baseY, 40 * scale, 14 * scale);
  fill(255);
  rect(baseX + 16 * scale, baseY, 8 * scale, 8 * scale); 
}

function drawNeonText(points, brightness, offsetX = 0, offsetY = 0) {
  for (let pt of points) {
    fill(255, 255, 0, brightness);
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(255, 255, 0, brightness);
    ellipse(pt.x + offsetX, pt.y + offsetY, 5);
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = color(0, 0, 0, 0);
    noFill();
  }
}