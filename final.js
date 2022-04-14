//1920x950
//2400x1218
var bcg,bcg1;

function preload() {

	bcg=loadImage('images/bcg.jpg');
	bcg1=loadImage('images/bcg1.jpg');
	bcg2=loadImage('images/bcg2.jpg');
	bcg3=loadImage('images/bcg3.jpg');
	 bcg4=loadImage('images/bcg4.jpg');
	game=loadImage('images/game.png');	
	
      
      }
function setup() {
	
	createCanvas(windowWidth,windowHeight );
      }

function draw() {
	
	 background(bcg4)
	 game.resize(750*2.4, 260*3.4)
	 imageW=game.width;
	 imageH=game.height; 
	
	 image(game, width/2-imageW/2, height/2-imageH/2+80, imageW, imageH)
	
	fill(0);
	
	// rect(350,350,windowWidth-700,windowHeight-400);
	

}
