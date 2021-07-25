// alert("Working");

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
// var stopGame = false;

// Adding method for comparing arrays:
//--------------------------------------------------------------------------------------------------------
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
// ----------------------------------------------------------------------------------------------------

function playSound(color)
{
    var sound = new Audio("sounds/" + color + ".mp3");
    // console.log("sounds/" + color + ".mp3");
    sound.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed")
    setTimeout(function() { $("#" + currentColor).removeClass("pressed"); }, 100);
}

var count = 0;
var gameStarted = false;

// $(document).keypress(
$(document).keydown(
    function()
    {
        if (count === 0)
        {
            gameStarted = true;
            gameOver = false;
            console.log("Key down");
        
            console.log(" first time");
            $("#level-title").text("Level " + level);
            setTimeout(function() { nextSequence(); }, 200);
            
        }
        count++;
    }
);

// var buttonClicked = false;
var clickedButtons = 0;
var gameOver = false;

function handleClick(event, clickedButton)
{
    // clickedButtons++;
    
    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.getAttribute("id"));
    
    var userChosenColor = event.target.getAttribute("id");
    // var userChosenColor = this.getAttribute("id");
    // var userChosenColor = this.attr("id"); <- attr() doe not exist?

    console.log(userChosenColor);
    if (gameStarted && !gameOver)
    {
        userClickedPattern.push(userChosenColor);  
    }
    
    console.log("userClickedPattern");
    console.log(userClickedPattern);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    if (gameStarted && !gameOver)
    //if (gameStarted)
    {
        // for(var i = 0; i < clickedButtons; ++i)
        // {
        //     checkSequence(i)
        // }
        console.log("clickedButtons");
        console.log(clickedButtons);
        if (clickedButton <= gamePattern.length)
        {
            if (checkSequence(clickedButton - 1))
            {
                // // gameStarted = false;
                // gameOver = true;
                // count = 0;

                // // clickedButtons = gamePattern.length + 1;
                // userClickedPattern = [];
                // gamePattern = [];
                // level = 0;
                // clickedButtons = 0;
                endGame();
                return;
            }

            if (clickedButton === gamePattern.length)
            {
                // buttonClicked = true; 
                
                setTimeout(function() { nextSequence(); clickedButtons = 0; userClickedPattern = []; }, 
                            1000);
            }
        }
        else
        {
            endGame();
            return;
        }
    }
}

$(".btn").click(
    function(event)
    {
        if (gameStarted && !gameOver)
        {
            clickedButtons++;
        }
        handleClick(event, clickedButtons);
    }
);

function nextSequence()
{
    var randomNumber = Math.floor(Math.random() * 4);
    //return randomNumber;
    // console.log(RandomNumber);

    var randomChosenColor = buttonColors[randomNumber];
    if (!gameOver)
    {
        gamePattern.push(randomChosenColor);

        console.log("gamePattern");
        console.log(gamePattern);
        
        $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);

        level++;
        $("#level-title").text("Level " + level);
    }

    // console.log($("#" + randomChosenColor));

    // var sound = new Audio("sounds/" + randomChosenColor + ".mp3");
    // console.log("sounds/" + randomChosenColor + ".mp3");
    // sound.play();

    // if (stopGame && buttonClicked)
    // {
    //     $("#level-title").text("Game over!");
    //     buttonClicked = false;
    //     return;
    // }


    // clickedButtons = 0;

    // while(true)
    // {
    //     if (!buttonClicked)
    //     {
    //         continue;
    //     }


    // }
}

function endGame()
{
    // gameStarted = false;
    gameOver = true;
    count = 0;

    // clickedButtons = gamePattern.length + 1;
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    clickedButtons = 0;
    
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function() { $("body").removeClass("game-over"); }, 200);

    // $("#level-title").text("Game over!");
    $("#level-title").text("Game over, Press Any Key to Restart");
}

function checkSequence(clickedButton)
{
    // console.log("!gamePattern.equals(userClickedPattern) && gameStarted && buttonClicked");
    // console.log(!gamePattern.equals(userClickedPattern) && gameStarted && buttonClicked);

    // console.log("!gamePattern.equals(userClickedPattern)");
    // console.log(!gamePattern.equals(userClickedPattern));
    
    // console.log("gamePattern");
    // console.log(gamePattern);
    
    // console.log("userClickedPattern");
    // console.log(userClickedPattern);

    // console.log("gameStarted");
    // console.log(gameStarted);

    // console.log("buttonClicked");
    // console.log(buttonClicked);

    // if (!gamePattern.equals(userClickedPattern) && gameStarted && buttonClicked)
    // {
    //    $("#level-title").text("Game over!");
    //     return;
    // }

    console.log("clickedButton");
    console.log(clickedButton);

    console.log("gamePattern[clickedButton]");
    console.log(gamePattern[clickedButton]);

    console.log("userClickedPattern[clickedButton]"); 
    console.log(userClickedPattern[clickedButton]); 

    //if (gamePattern[clickedButton] !== userClickedPattern[clickedButton] || clickedButton >= gamePattern.length)
    if (gamePattern[clickedButton] !== userClickedPattern[clickedButton])
    {
        // endGame();
        
        return true;
    }
    else
    {
        return false;
    }
    
    // buttonClicked = false;
}



//var randomChosenColor = buttonColors[nextSequence()];