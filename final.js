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
	 game.resize(windowWidth*0.85, windowHeight*0.8)
	 imageW=game.width;
	 imageH=game.height; 
	
	image(game, width/2-imageW/2, height/2-imageH/2+80, imageW, imageH)

	
	fill(0);
	
	// rect(350,350,windowWidth-700,windowHeight-400);
	

}

function jump(){
 window.location.href="guideline.html";
}

var jumpButton = new Nexus.TextButton('#jump', {
	'size': [150, 50],
	'numberOfButtons': 1,
	'active': -1,
	'text': "Guideline",
	
    })
    jumpButton.on('change', function (v) {
                 
	if (v == 0 ) {
		jump();
	}})
 

	//from https://www.programminghunter.com/article/16011806823/
	var a_idx=0;
jQuery(document).ready(function($){$("body").click(function(e){
        var a=new Array("❤","❤","❤","❤","❤","❤","❤","❤","❤","❤","❤","❤");
        var $i=$("<span></span>").text(a[a_idx]);a_idx=(a_idx+1)%a.length;
        var x=e.pageX,y=e.pageY;
        $i.css({"z-index":999999999999999999999999999999999999999999999999999999999999999999999,"top":y-20,"left":x-20,"position":"absolute","font-weight":"bold","color":"#6699CC"});
        $("body").append($i);$i.animate({"top":y-180,"opacity":0},1500,function(){$i.remove();});
    });});