let canvasSize = 400;
let colors = ['red', 'blue', 'yellow'];
let rectWidths = [40, 50, 60, 70, 80, 90];
let rectHeights = [30, 40, 50];

function setup(){
  createCanvas(canvasSize, canvasSize);
  background(0);
  stroke(0);
  strokeWeight(6);

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
}