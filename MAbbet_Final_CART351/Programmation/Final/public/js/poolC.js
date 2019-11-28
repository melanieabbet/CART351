window.onload = function(){
console.log("we have launched client script");
//jQuery.fx.interval = 100;
let clientSocket = io.connect('http://localhost:4200');
let x;
let y;
let socketId =100;
let usernumber = 2;
let shapesAddedToDrawingBoard = [];
//set up the client socket to connect to the socket.io server
clientSocket.on('connect', function(data) {
  console.log("connected");
  $(".screenuserport").hide();
  $(".screennewpool").hide();
 $.ajax({
        type: "POST",
        url: "http://localhost:4200/displayEndPoint",
        contentType: 'application/json',
        processData: false,//prevents from converting into a query string
        cache: false,
        timeout: 600000,
        success: function (response) {
        //console.log(response);
        //use the JSON .parse function to convert the JSON string into a Javascript object
        let parsedJSON = JSON.parse(response);
        console.log(parsedJSON);
        for(var i=0; i< parsedJSON.length; i++)
        {
         let nom = parsedJSON[i];

         let divpool = $("<div class='pool'>");
         let nompool = $("<h1>");
         $(nompool).html(nom.pool);
         $(nompool).attr("id",nom.pool);
         $(divpool).appendTo(".pools");
         $(nompool).appendTo(divpool);

         $(divpool).on("click", function(event){
           console.log($(nompool).html())
           clientSocket.emit('poolchoice',$(nompool).html());
           $(".screenconnection").hide();
           $(".screennewpool").show();
             $("#newpooltitle").text($(nompool).html());
             document.getElementById("twouser").addEventListener("click", function(){
               usernumber = 2;
               console.log(usernumber);
               document.getElementById("twouser").style.backgroundColor = "white";
               document.getElementById("twouser").style.color = "black";
               document.getElementById("threeuser").style.backgroundColor = "black";
               document.getElementById("threeuser").style.color = "white";
               document.getElementById("fouruser").style.backgroundColor = "black";
               document.getElementById("fouruser").style.color = "white";
             });
             document.getElementById("threeuser").addEventListener("click", function(){
               usernumber = 3;
               console.log(usernumber);
               document.getElementById("twouser").style.backgroundColor = "black";
               document.getElementById("twouser").style.color = "white";
               document.getElementById("threeuser").style.backgroundColor = "white";
               document.getElementById("threeuser").style.color = "black";
               document.getElementById("fouruser").style.backgroundColor = "black";
               document.getElementById("fouruser").style.color = "white";
             });
             document.getElementById("fouruser").addEventListener("click", function(){
               usernumber = 4;
               console.log(usernumber);
               document.getElementById("twouser").style.backgroundColor = "black";
               document.getElementById("twouser").style.color = "white";
               document.getElementById("threeuser").style.backgroundColor = "black";
               document.getElementById("threeuser").style.color = "white";
               document.getElementById("fouruser").style.backgroundColor = "white";
               document.getElementById("fouruser").style.color = "black";
             });
             $(".buttonleft").on("click", function(){
                 $(".screennewpool").hide();
                 $("#newpooltitle").text("Name");
                 $(".screenconnection").show();
              });

             $(".buttonright").on("click", function(){
                 let datatosend = {
                  usernumber: usernumber,
                  poolname: $(nompool).html()
                }
                 clientSocket.emit('numberchoice', datatosend);
                 $(".screennewpool").hide();
                 $(".screenuserport").show();
                 switch(usernumber){
                  case 3:
                  $("#four").hide();
                  break;
                  case 4:
                  break;
                  default:
                  $("#four").hide();
                  $("#three").hide();
                }
                 $("body").css("background-image","url('css/assets/fond2.png')");
                 $.ajax({
                  type: "POST",
                  url: "http://localhost:4200/displayEndPointtwo",
                  contentType: 'application/json',
                  processData: false,//prevents from converting into a query string
                  cache: false,
                  timeout: 600000,
                  success: function (response) {
                    //console.log(response);
                    //use the JSON .parse function to convert the JSON string into a Javascript object
                    let parsedJSON = JSON.parse(response);
                    //console.log(parsedJSON);
                    for(var i=0; i< parsedJSON.length; i++)
                     {
                      let pool = parsedJSON[i].pool;
                      let style = parsedJSON[i].style;
                      let directionx = parsedJSON[i].directionx;
                      let directiony = parsedJSON[i].directiony;


                      if( pool == $(nompool).html()){
                        console.log(parsedJSON[i].style);
                        console.log("direction x " + parsedJSON[i].directionx + "direction y"+parsedJSON[i].directiony );
                        shapesAddedToDrawingBoard.push(new Shape( parsedJSON[i].clientid, parsedJSON[i].size,$(window).width()/2- parsedJSON[i].size/2,$(window).height()/2- parsedJSON[i].size/2, parseInt(parsedJSON[i].directionx), parseInt(parsedJSON[i].directiony), parsedJSON[i].title, style, parsedJSON[i].keywordone, parsedJSON[i].keywordtwo, parsedJSON[i].keywordthree,parsedJSON[i].text));

                      }
                      for(let i =0; i<shapesAddedToDrawingBoard.length; i++ ){

                       let pause=false;
                       $(shapesAddedToDrawingBoard[i].shape).on("click",function(){

                        console.log("hello iave beeclik");
                        if (pause==false){
                          shapesAddedToDrawingBoard[i].speed = 0;

                          $(".elementinfo").show();
                          pause = true;
                        }else if (pause == true){
                          shapesAddedToDrawingBoard[i].speed =  1;

                          $(".elementinfo").hide();
                          pause =false;
                        }
                      });

                      };
                    }


                 },
                    error:function(){
                    console.log("error occurred");
                    }
                }); //fin ajax
             });
             clientSocket.emit('Pooljoin', 'msg:: client joined');
             // handler for receiving client id
             clientSocket.on("joinedClientPoolId", function(data){
               socketId = data;
               console.log("Pool"+socketId);

            });// fin on joinedpool
             clientSocket.on("elementtodisplay", function(result){
              console.log(result);
              console.log("data applied");
             //use data send from client throught the server //here live
             switch (result.clientid){
               case 1:
               x = $(window).width()/2-result.size/2;
               y = 0;
               break;
               case 2:
               x = ($(window).width()/2)-result.size/2;
               y = $(window).height()-result.size;
               break;
               case 3:
               x = $(window).width()-result.size;
               y = $(window).height()/2-result.size/2;
               break;
               case 4:
               x=0;
               y = $(window).height()/2-result.size/2;
               break;
               default:
               x=0;
               y=0;
             }
             //console.log(result.clientid);
             //console.log("position x " + x +" position y " +y);
             //console.log("window  width " + $(window).width() +"windowheight" +$(window).height());



              shapesAddedToDrawingBoard.push(new Shape(result.clientid,result.size,x,y,result.directionx,result.directiony,result.title,result.style,result.keywordone,result.keywordtwo,result.keywordthree,result.text));

              for(let i =0; i<shapesAddedToDrawingBoard.length; i++ ){

               console.log("Dx "+shapesAddedToDrawingBoard[i].directionx +" Dy" +shapesAddedToDrawingBoard[i].directiony)
               let pause=false;
               $(shapesAddedToDrawingBoard[i].shape).on("click",function(){
                console.log("hello iave beeclik");
                if (pause==false){
                  shapesAddedToDrawingBoard[i].speed = 0;
                  pause = true;
                }else if (pause == true){
                  shapesAddedToDrawingBoard[i].speed =  1;
                  pause =false;
                }
              });

              };

             })

         });

        }
      },//fin response
       error:function(){
      console.log("error occurred");
    }});

$("#connection").on("click", function(){
 console.log("pool clicked");



     // put code here that should only execute once the client is connected
     $(".screenconnection").hide();
     $(".screennewpool").show();

     document.getElementById("titlename").addEventListener("click", function(){
      $(".poolname").toggle();
     });
     document.getElementById("twouser").addEventListener("click", function(){
       usernumber = 2;
       console.log(usernumber);
       document.getElementById("twouser").style.backgroundColor = "white";
       document.getElementById("twouser").style.color = "black";
       document.getElementById("threeuser").style.backgroundColor = "black";
       document.getElementById("threeuser").style.color = "white";
       document.getElementById("fouruser").style.backgroundColor = "black";
       document.getElementById("fouruser").style.color = "white";
     });
     document.getElementById("threeuser").addEventListener("click", function(){
       usernumber = 3;
       console.log(usernumber);
       document.getElementById("twouser").style.backgroundColor = "black";
       document.getElementById("twouser").style.color = "white";
       document.getElementById("threeuser").style.backgroundColor = "white";
       document.getElementById("threeuser").style.color = "black";
       document.getElementById("fouruser").style.backgroundColor = "black";
       document.getElementById("fouruser").style.color = "white";
     });
     document.getElementById("fouruser").addEventListener("click", function(){
       usernumber = 4;
       console.log(usernumber);
       document.getElementById("twouser").style.backgroundColor = "black";
       document.getElementById("twouser").style.color = "white";
       document.getElementById("threeuser").style.backgroundColor = "black";
       document.getElementById("threeuser").style.color = "white";
       document.getElementById("fouruser").style.backgroundColor = "white";
       document.getElementById("fouruser").style.color = "black";
     });


     $(".buttonright").on("click", function(){

       let datatosend = {
         usernumber: usernumber,
         poolname: $("#poolname").val()
       }
       clientSocket.emit('numberchoice', datatosend);

       $(".screennewpool").hide();
       $(".screenuserport").show();

       switch(usernumber){
         case 3:
         $("#four").hide();
         break;
         case 4:
         break;
         default:
         $("#four").hide();
         $("#three").hide();
       }

       $("body").css("background-image","url('css/assets/fond2.png')");
     });


     $(".buttonleft").on("click", function(){

       $(".screennewpool").hide();
       $(".screenconnection").show();

     });


     clientSocket.emit('Pooljoin', 'msg:: client joined');
     // handler for receiving client id
     clientSocket.on("joinedClientPoolId", function(data){
       socketId = data;
       console.log("Pool"+socketId);
       //ajax //call once onload, and display it (can be the same fonction as element to diplay)

     });


     clientSocket.on("elementtodisplay", function(result){
      console.log(result);
      console.log("data applied");
     //use data send from client throught the server //here live

     switch (result.clientid){

       case 1:
       x = $(window).width()/2-result.size/2;
       y = 0;
       break;
       case 2:
       x = ($(window).width()/2)-result.size/2;
       y = $(window).height()-result.size;
       break;
       case 3:
       x = $(window).width()-result.size;
       y = $(window).height()/2-result.size/2;
       break;
       case 4:
       x=0;
       y = $(window).height()/2-result.size/2;
       break;
       default:
       x=0;
       y=0;
     }
     //console.log(result.clientid);
     //console.log("position x " + x +" position y " +y);
     //console.log("window  width " + $(window).width() +"windowheight" +$(window).height());



      shapesAddedToDrawingBoard.push(new Shape(result.clientid,result.size,x,y,result.directionx,result.directiony,result.title,result.style,result.keywordone,result.keywordtwo,result.keywordthree,result.text));

      for(let i =0; i<shapesAddedToDrawingBoard.length; i++ ){

       //console.log("Dx "+shapesAddedToDrawingBoard[i].directionx +" Dy" +shapesAddedToDrawingBoard[i].directiony)
       let pause=false;
       $(shapesAddedToDrawingBoard[i].shape).on("click",function(){
        console.log("hello iave beeclik");
        if (pause==false){
          shapesAddedToDrawingBoard[i].speed = 0;
          pause = true;

        }else if (pause == true){
          shapesAddedToDrawingBoard[i].speed =  1;

          pause =false;
        }
      });

      };

     })

});

window.requestAnimationFrame(animate);

function animate(){

  for(let i =0; i<shapesAddedToDrawingBoard.length; i++ ){
   //console.log(shapesAddedToDrawingBoard[i]);
    let x = $(shapesAddedToDrawingBoard[i].shape).css("left");
    let y = $(shapesAddedToDrawingBoard[i].shape).css("top");

    //console.log(x);
    let xPos = parseInt(x.substr(0,x.length-2));
    let yPos = parseInt(y.substr(0,y.length-2));

 if (xPos> $(window).width()-(shapesAddedToDrawingBoard[i].size/1.4)||xPos<0){
    shapesAddedToDrawingBoard[i].directionx *=-1;
   }

   if (yPos> $(window).height()-(shapesAddedToDrawingBoard[i].size/1.4) ||yPos<0){
     shapesAddedToDrawingBoard[i].directiony *=-1;
   }




    xPos= xPos+(shapesAddedToDrawingBoard[i].directionx*shapesAddedToDrawingBoard[i].speed);
    yPos= yPos+(shapesAddedToDrawingBoard[i].directiony*shapesAddedToDrawingBoard[i].speed);

    let newPosX = xPos.toString()+"px";
    let newPosY = yPos.toString()+"px";
    $(shapesAddedToDrawingBoard[i].shape).css({"left":newPosX,"top":newPosY});
}
  window.requestAnimationFrame(animate);
}


});//celui la
}
