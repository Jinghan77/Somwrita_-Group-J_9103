let offsetX = -170;
let offsetY = -400;
let pixelFont;
let pointsPacman = [];
let pointsPiet = [];

function preload() {
  pixelFont = loadFont("assets/pixelFont.TTF");
}

function setup() { 
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont(pixelFont);
  fill(255);
  textAlign(CENTER);

  pointsPacman = pixelFont.textToPoints("Pacman", 130 + offsetX, 70, 100, {
    sampleFactor: 0.12,
  });
  pointsPiet = pixelFont.textToPoints("* PIET", 270 + offsetX, 180, 100, {
    sampleFactor: 0.12,
  });
  pixelDensity(2);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // background
  background(255, 250, 205); 
  
  push();
  translate(width / 2, height / 2);
  translate(offsetX, offsetY);

  drawBody();
  drawScreen();
  pop();

  fill(255, 255, 255);
  rect(width / 2 - 310, height - 70, 620, 50)

  fill(0);
  textSize(32);
  text("Click the screen to start the music", width / 2, height - 30);
}

function drawScreen() {
  fill(255, 255, 255);
  rect(138 + offsetX, 270, 400, 400);
  let brightness = 255;
  drawNeonText(pointsPacman, brightness);
  drawNeonText(pointsPiet, brightness);
}

function drawBody(){
  // black (机身)
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