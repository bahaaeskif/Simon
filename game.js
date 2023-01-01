
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

document.querySelector(".score").classList.add("d-none");

document.querySelector(".start-re").onclick =function() {
  if (!started) {
    document.querySelector("#level-title").innerHTML = `Level ${level}`;
    nextSequence();
    document.querySelector(".start-re").classList.add("d-none");
    started = true;
    document.querySelector(".score").classList.remove("d-none");
  }
};

$(".btn").click(function(e) {

  var userChosenColour = e.target.getAttribute("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      document.querySelector("body").classList.add("game-over");
      document.querySelector("#level-title").innerHTML = "Game Over, Click on button to Restart";
      document.querySelector(".start-re").innerHTML = "Restart";
      document.querySelector(".start-re").classList.remove("d-none");
      setTimeout(function () {
        document.querySelector("body").classList.remove("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  saveScoreInLocal();
  document.querySelector("#level-title").innerHTML = `Level ${level}`;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function saveScoreInLocal (){
  if (localStorage.getItem("Score") < level){
    localStorage.setItem("Score" , level-1);
  }
  document.querySelector(".score").innerHTML = `Your best Score is : ${localStorage.getItem("Score")}`;
}