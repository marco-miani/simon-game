// Array of Colors and other Global variables
var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userclickedPattern = [];

var level = 0;

var started = false;

var maxLevel = 0;

var currentLevelComp = 0;



// Identify the Keyboard Press
$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $("h1").text("Good Luck!");
    }
})



// Identify the Click and Start the Game
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userclickedPattern.push(userChosenColor);
    makeSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userclickedPattern.length - 1);
});



// Function to randomize a sequence
function nextSequence() {
    userclickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    // Select a Color
    var randomChosenColor = buttonColors[randomNumber];

    // Fill the Game Pattern
    gamePattern.push(randomChosenColor);

    // Select the Button
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    makeSound(randomChosenColor);
}



// Play a sound
function makeSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



// Animate Buttons
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}



// Checking the user's answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userclickedPattern[currentLevel]) {
        console.log("Success!");

        if (userclickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        if (level >= 1) {
            $("h1").text("Good Luck!");
        }

        currentLevelComp = level;
        if (currentLevelComp >= maxLevel) {
            maxLevel = currentLevelComp;
            $(".record-title").text("Record: Level " + maxLevel);
        }
        console.log(maxLevel);
        console.log(currentLevelComp);
    }
    else {
        console.log("Wrong!");
        var wrongSong = new Audio("sounds/wrong.mp3");
        wrongSong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);
        $("h1").text("Game Over! Press any key to ReStart.");
        startOver();
    }
}



// Reestart Function
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}