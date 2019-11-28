function Bubble(x,y,speedX,speedY,theContext,theCanvas){

    this.canvas = theCanvas;
    this.context = theContext;
    this.x =x;
    this.y =y;
    //this.number =theNumber;

    this.innerW = this.w/2;
    this.innerH = this.h/2;
    //add in when we update
    this.speedX = speedX;
    this.speedY = speedY;
    this.innerX = this.x+this.innerW/2;
    this.innerY = this.y+this.innerH/2;

this.display = function(){

  //for(i = 0; i < this.number; i++) {
    this.context.beginPath();
    this.context.arc(this.x ,this.y ,80,0, Math.PI*2);
    this.context.closePath();
    this.context.fillStyle = "rgba(255,255,255,1)";
    this.context.fill();
    this.context.fillStyle = "rgba(0,0,0,1)";
    this.context.font = "20px Tinos";
    this.context.fillText("Test",this.x-17,this.y+10);



  //}

  }
  this.displayTwo = function(){
  this.context.beginPath();
  this.context.arc(this.x ,this.y ,50,0, Math.PI*2);
  this.context.closePath();
  this.context.fillStyle = "rgba(0,0,0,1)";
  this.context.fill();
  this.context.strokeStyle = "rgba(255,255,255,1)";
  this.context.lineWidth = 2;
  this.context.stroke();

  this.context.fillStyle = "rgba(255,255,255,1)";
  this.context.font = "20px Tinos";
  this.context.fillText("Test",this.x-15,this.y+6);


  this.context.beginPath();
  this.context.strokeStyle = "rgba(255,255,255,1)";
  this.context.lineWidth = 2;
  this.context.fillStyle = "rgba(0,0,0,1)";
  this.context.rect(this.x-120,this.y+30,250,100);
  this.context.fill();
  this.context.stroke();

  this.context.fillStyle = "rgba(255,255,255,1)";
  this.context.font = "15px Tinos";
  this.context.fillText("This is where the description should be",this.x-110,this.y+70);

}
  //update
  this.update = function(){

    //edges bouncing specifically for a rect with corner coords.
    if(this.x>(this.canvas.width-100)||this.x<50){
      this.speedX*=-1;
    }
    if(this.y>(this.canvas.height-100)||this.y<10){
      this.speedY*=-1;
    }

    //change by speed ...
    this.x+=this.speedX;
    this.y+=this.speedY;
    //need to update the inner vars here ....
    this.innerX = this.x+this.innerW/2;
    this.innerY = this.y+this.innerH/2;
  }
}
