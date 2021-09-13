let recHeightGap=150;
let recWidthGap=80;
let cellH;
function setup()
{
	createCanvas(windowWidth,windowHeight);
	background(0);

	//create the background
	fill("#463f3a");
	rect(recWidthGap,recHeightGap,windowWidth-2*recWidthGap,windowHeight-recHeightGap*1.5);
	cellH=(windowHeight-recHeightGap*1.5)/9;
	for(let i=0;i<9;i++)
	{
		stroke("#a78a7f");
		line(recWidthGap, recHeightGap+cellH*i, windowWidth-recWidthGap, recHeightGap+cellH*i);
	}	
}

function draw(){

}


//question: using p5?or html?