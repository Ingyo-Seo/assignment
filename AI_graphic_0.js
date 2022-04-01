var cols, rows;
var scl = 20;
var w = 2000;
var h = 2000;

var cam_x = 300;
var cam_y = 0;
var cam_z = 600;

var flying = 0;

var terrain = [];

var back_r = 80;
var back_g = 188;
var back_b = 223;

sea_light = 50;

function setup() {
  createCanvas(900, 450, WEBGL);
  cols = w / scl;
  rows = h / scl;
  noStroke();
  for (var x = 0; x < cols; x++) 
  {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) 
    {
      terrain[x][y] = 0;
    }
  }
}
var sp = 0;
function draw() {

  flying -= 0.05;
  var yoff = flying;
  for (var y = 0; y < rows; y++) 
  {
    var xoff = 0;
    for (var x = 0; x < cols; x++) 
    {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.09;
    }
    yoff += 0.09;
  }
 
  background(back_r,back_g,back_b);
  translate(0, 50);
  rotateX(PI / 3);
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) 
  {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) 
    {
      let v = map(terrain[x][y],-100,100,0,255);
      fill(0,0,255-v);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
    ambientLight(sea_light);
  }
  
  push();
  fill(255,102,0);
  translate(0,200,300);
  sphere(100);
  pop();
  
  push();
  translate(mouseX - 300,mouseY - 300);
  ambientLight(mouseX);
  ambientMaterial(255, 255, 153);
  sphere(50);
  pop();
  
  push();
  texture(img);
  translate(1300,1400,200+noise(sp)*3);
  box(50);
  pop();
  sp++;
  camera(cam_x,cam_y,600,0,0,0,0,1,0);
  
  
}

function preload() 
{
  img = loadImage('https://images.rawpixel.com/image_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00NTEtYmctMDYuanBn.jpg?s=kHZrcQKZZc9RSDNE5ESX_Vfga_Vx42F5lfhOqpwmV0E');
}

function keyPressed() 
{
  if(key=='p' || key =='P')
  {
    noLoop();
  }
  else if(key=='s' || key == 'S')
  {
    loop();
  }
  else if(keyCode === UP_ARROW)
  {
    back_r = back_r + 50;
    back_g = back_g + 30;
    back_b = back_b + 70;
    
    if(back_r > 255)
    {
      back_r = 0;
    }
    else if(back_g > 255)
    {
      back_g = 0;
    }
    else if(back_b > 255)
    {
      back_b = 0;
    }
  }
  else if(keyCode === DOWN_ARROW)
  {
    back_r = back_r - 40;
    back_g = back_g - 70;
    back_b = back_b - 15;
    
    if(back_r < 0)
    {
      back_r = 0;
    }
    else if(back_g < 0)
    {
      back_g = 0;
    }
    else if(back_b < 0)
    {
      back_b = 0;
    }
  }
  else if(keyCode === LEFT_ARROW)
  {
    sea_light = sea_light - 5;
    
    if(sea_light<0)
    {
      sea_light = 0;
    }
  }
  else if(keyCode === RIGHT_ARROW)
  {
    sea_light = sea_light + 5;
    
    if(sea_light>255)
    {
      sea_light = 0;
    }
  }
}

function mousePressed()
{
  cam_x=mouseX;
  cam_y=mouseY;
}
