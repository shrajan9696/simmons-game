var gamePattern=[];

var userClickedpattern=[];
var randomColours=["red","blue","green","yellow"];

var level=0;

$(document).one("keypress",function(){
  $("#level-title").text("Level" + " " + level);
  nextSequence();
});


$(".btn").on("click",function(){

  var userChosencolour=this.id;
  userClickedpattern.push(userChosencolour);
playSound(userChosencolour);
animatePress(userChosencolour);
checkAnswer(userClickedpattern.length-1);

});



function nextSequence()
{
    userClickedpattern=[];
    level++;
    $("#level-title").text("Level" + " " + level);
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChoosencolours=randomColours[randomNumber];
    gamePattern.push(randomChoosencolours);
    $("#" + randomChoosencolours).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosencolours);
    animatePress(randomChoosencolours);
}



function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
            $("#"+currentColour).removeClass("pressed");
        },100);
}




function checkAnswer(currentLevel){

  if(userClickedpattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");

    if (userClickedpattern.length===gamePattern.length){
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
}
   }

    else{
      var audio=new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
      $("h1").text("Game Over, Press Any Key To Restart");
      startOver();
    }

}

function startOver(){

  level=0;
  userClickedpattern=[];
  gamePattern=[];
  $(document).one("keypress",function(){
    $("#level-title").text("Level" + " " + level);
    nextSequence();
  });
}
