let canvasSize = 400;
let colors = ['red', 'blue', 'yellow', 'White'];
let rectWidths = [40, 50, 60, 70, 80, 90];
let rectHeights = [30, 40, 50];

function setup(){
  createCanvas(canvasSize, canvasSize);
  background(0);
  stroke(0);
  strokeWeight(5);

  let y = 0;
  while(y< canvasSize){
    let x = 0
    let h = random(rectHeights);

    if(y + h> canvasSize){
      h = canvasSize - y;
    }

    while (x < canvasSize){
      let w = random(rectWidths);

      if (x+ w > canvasSize){
        w = canvasSize - x;
      }

      fill(random(colors));
      rect(x, y, w, h);
      x += w;
    }
    y += h;
  }
  drawPath();
}

function drawPath(){
  stroke(0);
  strokeWeight(30);
  noFill();
  
  //Horizon Path
  line(25, 25, 180, 25);
  line(260, 25, 375, 25);
  line(25, 100, 260, 100);
  line(230, 175, 375, 175);
  line(140, 175, 180, 175);
  line(100, 220, 290, 220);
  line(25, 270, 100, 270);
  line(230, 270, 375, 270);
  line(25, 375, 180, 375);
  line(290, 375, 375, 375);

  //Vertical Path
  line(25, 25, 25, 100);
  line(260, 25, 260, 175);
  line(375, 25, 375, 175);
  line(180, 25, 180, 100);
  line(140, 100, 140, 175);
  line(180, 175, 180, 220);
  line(180, 175, 180, 375);
  line(230, 175, 230, 270);
  line(100, 220, 100, 270);
  line(290, 220, 290, 375);
  line(25, 270, 25, 375);
  line(375, 270, 375, 375);
}
