let offsetX = 40;
let pixelFont;
let pointsPacman = [];
let pointsPiet = [];
let pointsLine2 = [];
let song, analyser;
let button;

function preload() {
  pixelFont = loadFont("pixelFont.ttf");
  song = loadSound("assets/final project music.mp3");
}

function setup() { 
  createCanvas(680, 1500);
  noStroke();
  textFont(pixelFont);
  fill(255, 255, 255);
  textAlign(CENTER);

  pointsPacman = pixelFont.textToPoints("Pacman", 150, 100, 100, {
  sampleFactor: 0.2, 
  simplifyThreshold: 0
  });

  pointsPiet = pixelFont.textToPoints("* PIET", 290, 200, 90, {
  sampleFactor: 0.2,
  simplifyThreshold: 0
  });

  analyser = new p5.Amplitude();
  analyser.setInput(song);

  button = createButton('Play / Pause');
  button.position((width - button.width) / 2, height - 50);
  button.mousePressed(togglePlay);
}

function draw() {
  // background
  background(255, 250, 205); 

  // black (机身)
  fill(0, 0, 0);
  rect(38 + offsetX, 50, 520, 140); 
  rect(48 + offsetX, 220, 500, 500); 
  rect(28 + offsetX, 200, 540, 10); 
  rect(28 + offsetX, 20, 540, 10); 
  rect(28 + offsetX, 30, 10, 170); 
  rect(558 + offsetX, 30, 10, 170); 
  rect(38 + offsetX, 210, 520, 10); 
  rect(10 + offsetX, 0, 30, 10); 
  rect(558 + offsetX, 0, 30, 10); 
  rect(28 + offsetX, 10, 20, 10); 
  rect(548 + offsetX, 10, 20, 10); 
  rect(2 + offsetX, 10, 8, 200); 
  rect(588 + offsetX, 10, 8, 200); 
  rect(8 + offsetX, 210, 10, 10);
  rect(578 + offsetX, 210, 10, 10);
  rect(18 + offsetX, 220, 10, 510);
  rect(568 + offsetX, 220, 10, 510);
  rect(10 + offsetX, 730, 8, 20);
  rect(578 + offsetX, 730, 8, 30);
  rect(40 + offsetX, 720, 516, 20);
  rect(50, 730, 8, 30);
  rect(42, 760, 8, 30);
  rect(626, 760, 8, 30);
  rect(34, 790, 8, 30);
  rect(634, 790, 8, 30);
  rect(34, 790, 8, 30);
  rect(634, 790, 8, 30);
  rect(26, 820, 8, 110);
  rect(642, 820, 8, 110);
  rect(48, 840, 580, 90);
  rect(56, 930, 564, 20);
  rect(72, 950, 532, 20);
  rect(80, 970, 516, 220);
  
  // dark grey #3E3A39
  fill(62, 58, 57);
  rect(58, 740, 560, 110);

  // light red #DA3C34
  fill(218, 60, 52);
  rect(38 + offsetX, 30, 520, 20);
  rect(10 + offsetX, 10, 20, 200);
  rect(568 + offsetX, 10, 20, 200);
  rect(28 + offsetX, 220, 20, 500);
  rect(548 + offsetX, 220, 20, 500);
  rect(18 + offsetX, 730, 22, 20);
  rect(556 + offsetX, 730, 22, 30);
  rect(28 + offsetX, 720, 12, 10);
  rect(556 + offsetX, 720, 12, 10);
  rect(58, 730, 14, 30);
  rect(50, 760, 14, 30);
  rect(612, 760, 14, 30);
  rect(42, 790, 14, 30);
  rect(620, 790, 14, 30);
  rect(34, 820, 14, 110);
  rect(628, 820, 14, 110);
  rect(58, 970, 22, 220);
  rect(596, 970, 22, 220);
  rect(221, 980, 10, 150);
  rect(431, 980, 10, 150);
  rect(231, 1130, 200, 10);
  
  // red #9C1F24
  fill(156, 31, 36);
  rect(38 + offsetX, 190, 520, 10);
  rect(22 + offsetX, 10, 8, 190);
  rect(568 + offsetX, 10, 8, 190);
  rect(10 + offsetX, 200, 20, 10);
  rect(568 + offsetX, 200, 20, 10);
  rect(40 + offsetX, 220, 8, 500);
  rect(548 + offsetX, 220, 8, 500);
  rect(34, 930, 14, 20);
  rect(628, 930, 14, 20);
  rect(50, 950, 14, 20);
  rect(612, 950, 14, 20);
  rect(72, 970, 8, 220);
  rect(596, 970, 8, 220);
  rect(58, 970, 14, 50);
  rect(604, 970, 14, 50);
  rect(58, 1170, 14, 20);
  rect(604, 1170, 14, 20);
  rect(221, 1010, 10, 10);
  rect(431, 1010, 10, 10);

  // heavy red #631018
  fill(99, 16, 24);
  rect(18 + offsetX, 210, 20, 10);
  rect(558 + offsetX, 210, 20, 10);
  rect(72, 730, 8, 20);
  rect(596, 730, 8, 20);
  rect(64, 760, 8, 20);
  rect(604, 760, 8, 20);
  rect(56, 790, 8, 20);
  rect(612, 790, 8, 20);
  rect(48, 820, 8, 20);
  rect(620, 820, 8, 20);
  rect(34, 850, 14, 80);
  rect(628, 850, 14, 80);
  rect(48, 930, 14, 20);
  rect(614, 930, 14, 20);
  rect(56, 950, 16, 20);
  rect(604, 950, 16, 20);
  rect(72, 970, 8, 50);
  rect(596, 970, 8, 50);
  rect(231, 970, 200, 10);
  rect(221, 980, 10, 30);
  rect(431, 980, 10, 30);

  // dark grey #3E3A39
  fill(62, 58, 57);
  rect(98 + offsetX, 250, 400, 10);
  rect(88 + offsetX, 260, 10, 10);
  rect(498 + offsetX, 260, 10, 10);
  rect(78 + offsetX, 270, 10, 400);
  rect(508 + offsetX, 270, 10, 400);
  rect(88 + offsetX, 670, 10, 10);
  rect(498 + offsetX, 670, 10, 10);
  rect(98 + offsetX, 680, 400, 10);
  rect(48 + offsetX, 720, 500, 10);
  rect(251, 1000, 160, 120);

  //black
  fill(0, 0, 0);
  rect(72, 750, 8, 30);
  rect(596, 750, 8, 30);
  rect(64, 780, 8, 30);
  rect(604, 780, 8, 30);
  rect(56, 810, 8, 30);
  rect(612, 810, 8, 30);
  rect(34, 930, 8, 20);
  rect(634, 930, 8, 20);
  rect(42, 950, 8, 20);
  rect(626, 950, 8, 20);
  rect(50, 970, 8, 220);
  rect(618, 970, 8, 220);
  rect(58, 1190, 38, 20);
  rect(580, 1190, 38, 20);
  rect(372, 1000, 40, 60);
  rect(272, 1052, 40, 40);

  //button
  //black
  fill(0, 0, 0);
  rect(492, 750, 40, 48);
  rect(484, 758, 56, 32);
  rect(500, 742, 24, 64);

  // light red #DA3C34
  fill(218, 60, 52);
  rect(380, 1010, 20, 40);
  rect(280, 1060, 20, 20);

  rect(500, 750, 24, 40);
  rect(492, 758, 40, 24);
  // red #9C1F24
  fill(156, 31, 36);
  rect(492, 782, 8, 8);
  rect(524, 782, 8, 8);
  rect(500, 790, 24, 8);
  //highlight
  fill(255);
  rect(500, 758, 8, 8);
  
    //yellow button
    //black
    fill(0, 0, 0);
    rect(412, 770, 40, 48);
    rect(420, 762, 24, 64);
    rect(404, 778, 56, 32);
    // gold #FFD700
    fill(255, 215, 0);
    rect(420, 770, 24, 40);
    rect(412, 778, 40, 24);
    // gold #FFA500
    fill(255, 165, 0);
    rect(412, 802, 8, 8);
    rect(444, 802, 8, 8);
    rect(420, 810, 24, 8);
    //highlight
    fill(255);
    rect(420, 780, 10, 10);

    // 摇杆放大版（1.5x 缩放）
    let scale = 1.5;
    let baseX = 114;
    let baseY = 708;

    // black
    fill(0, 0, 0);
    rect(baseX, baseY, 56 * scale, 32 * scale);
    rect(baseX + 8 * scale, baseY + 32 * scale, 40 * scale, 8 * scale);
    rect(baseX + 16 * scale, baseY + 40 * scale, 24 * scale, 30 * scale);
    rect(baseX + 8 * scale, baseY + 54 * scale, 40 * scale, 24 * scale);
    rect(baseX + 16 * scale, baseY + 78 * scale, 24 * scale, 8 * scale);
    rect(baseX, baseY + 62 * scale, 56 * scale, 8 * scale);

    // dark grey #3E3A39
    fill(62, 58, 57);
    rect(baseX + 24 * scale, baseY + 48 * scale, 8 * scale, 14 * scale);
    rect(baseX + 16 * scale, baseY + 70 * scale, 24 * scale, 8 * scale);
    rect(baseX + 8 * scale, baseY + 62 * scale, 8 * scale, 8 * scale);
    rect(baseX + 40 * scale, baseY + 62 * scale, 8 * scale, 8 * scale);

    // Darker Blue #0056B3
    fill(0, 86, 179);
    rect(baseX + 8 * scale, baseY + 14 * scale, 40 * scale, 18 * scale);
    rect(baseX + 16 * scale, baseY + 32 * scale, 24 * scale, 8 * scale);

    // blue #007BFF
    fill(0, 123, 255);
    rect(baseX + 16 * scale, baseY - 8 * scale, 24 * scale, 40 * scale);
    rect(baseX + 8 * scale, baseY, 40 * scale, 14 * scale);

    // highlight
    fill(255);
    rect(baseX + 16 * scale, baseY, 8 * scale, 8 * scale);

  //highlight
  fill(98, 99, 99);
  rect(56, 840, 562, 10);  
  
  
  //screen
  fill(255, 255, 255);
  rect(98 + offsetX, 270, 400, 400);

  let volume = analyser.getLevel();

  drawDotText(pointsPacman, volume, color(55, 100, 100));
  drawDotText(pointsPiet, volume, color(200, 100, 100));
}

function drawDotText(points, volume, baseColor) {
  colorMode(HSB, 360, 100, 100);
  for (let i = 0; i < points.length; i++) {
    let p = points[i];

    let bright = random(1) < volume * 200;

    if (bright) {
      let jitterX = random(-1, 1);
      let jitterY = random(-1, 1);
      let hue = map(i, 0, points.length, 45, 60); // 黄色区间
      fill(hue, 100, 100);
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = color(hue, 100, 100);
      ellipse(p.x + jitterX, p.y + jitterY, 10, 10);
    } else {
      fill(0, 0, 30); // 灰色灭灯状态
      drawingContext.shadowBlur = 0;
      ellipse(p.x, p.y, 8, 8);
    }
  }
  drawingContext.shadowBlur = 0;
  colorMode(RGB, 255); // 恢复颜色模式
}

function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}



