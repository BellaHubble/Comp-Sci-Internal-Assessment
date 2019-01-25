window.onload = initAll;
var canvas;
var ctx;

//GENERAL VARIABLES
var ticker;                 //sets the interval at which the countdown is displayed on the screen
var lostGame = false;       //when true, it iniates certain methods and data structures to stop the game & display the questions
var deaths = 0;             //counts how many times the user's bird has "died"/lost the game

//BIRD VARIABLES 
var birdImage = new Image();    //creates a new image and ad
birdImage.src = 'bird.png';     //makes the image a png of the flappy bird sprite 
birdImage.height = 50;          //specifies the height of the bird image
var boxX = 0;                   //specifies the x-position of the bird image
var boxY = 200;                 //specifies the y-position of the bird image
var upPressed = true;           //makes the bird go up when the up arrow key is pressed 
var jumpVelocity = 3;           //sets speed at which the bird goes up when pressed

//MAZE VARIABLES
var mazeWidth = 30;                             //sets width of the tubes
var mazeX = 200;                                //specifies x-position of first tube
var mazeX2 = 450;                               //specific x-position of second tube
var mazeXSpeed = -2;                            //makes the tubes move to the left at a speed of 2
var mazeHeight1 = (Math.random()*150)+20;       //randomizes height1 of first set of tubes
var mazeHeight2 = (Math.random()*150)+20;       //randomizes height2 of first set of tubes
var mazeHeightOne = (Math.random()*150)+20;     //randomizes height1 of second set of tubes
var mazeHeightTwo = (Math.random()*150)+20;     //randomizes height2 of second set of tubes 

var stopStartButton;    //creates a variable that represents the Start Button created
                        //in the HTML code 

function initAll()
{
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    document.addEventListener("keyup", keyDownHandler, false);
    play();
}

function startGame()
{
    jumpVelocity = 3;
    countdown(3);
}

function countdown(number) 
{
    if (number > 0) 
    {
        play();
        ctx.beginPath();
        ctx.font = "40px Arial";
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.fillText(number+"", 200, 200);
        ctx.closePath();
        setTimeout(function() { countdown(number - 1); }, 1000);
    } else {
        ticker = setInterval(play, 10);
    }
}

function play()
{
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawBird();
    drawMaze();
    mazeXSpeed = -2;
    mazeX+=mazeXSpeed;
    mazeX2+=mazeXSpeed;
    
    //get maze to redraw
    if(mazeX < 0)
    {
        mazeX = 480;
        mazeHeight1 = (Math.random()*150);
        mazeHeight2 = (Math.random()*150);
    }
    if(mazeX2 < 0)
    {
        mazeX2 = 480;
        mazeHeightOne = (Math.random()*150);
        mazeHeightTwo = (Math.random()*150);
    }
   
    //if box hits canvas
    if(boxY <= 0 || boxY >= 400)
    {
        stopGame();
    } 
    //if box hits maze
    if((boxX >= mazeX && boxX <= mazeX+mazeWidth && boxY >= 0 && boxY <= mazeHeight1) 
    || (boxY <= canvas.height && boxY >= canvas.height-mazeHeight2))
    {
        stopGame();
    }
    if((boxX >= mazeX2 && boxX <= mazeX2+mazeWidth && boxY >= 0 && boxY <= mazeHeightOne) 
    || (boxY <= canvas.height && boxY >= canvas.height-mazeHeightTwo))
    {
        stopGame();
    }
}

function drawBird()
{
    moveBird();
    ctx.beginPath();
    ctx.drawImage(birdImage, boxX, boxY);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
}

function moveBird()
{
    if(upPressed == true && boxY > 0)
    {
        if(lostGame == false)
            jumpVelocity = 2;
        upPressed = false;
    }
    boxY-=jumpVelocity;
    jumpVelocity-= 0.1;
}

function drawMaze()
{
    ctx.beginPath();
    ctx.rect(mazeX, 0, mazeWidth, mazeHeight1);
    ctx.rect(mazeX, canvas.height-mazeHeight2, mazeWidth, mazeHeight2);
    ctx.rect(mazeX2, 0, mazeWidth, mazeHeightOne);
    ctx.rect(mazeX2, canvas.height-mazeHeightTwo, mazeWidth, mazeHeightTwo);
    ctx.fillStyle = "#00FF7F";
    ctx.fill();
    ctx.closePath();
}

function stopGame()
{
    if(deaths ==3)
    {
        alert("You've exhausted your lives. Reload the page to play again.")
    }
    restartPosition();
    clearInterval(ticker);
    stopStartButton = document.getElementById("start");
    stopStartButton.disabled = true;
    lostGame = true;
    jumpVelocity = 0;
    mazeXSpeed = 0;
    if(lostGame == true)
    {
        deaths++;
        lostGame = false;
    }
    showQuestions();
}

function restartPosition()
{ 
    boxX = 200;
    boxY = 200;
}

function showQuestions()
{
    document.getElementsByClassName('answers')[deaths - 1].style.display = 'block';
}

function keyDownHandler(e)
{
    e.preventDefault();
    upPressed = e.keyCode == 38;
}

onclick = function(e) 
{
    if (e.target.matches('.answers button')) 
    {
        var answer1 = document.getElementById("firstDiv").children.item(2);
        var answer2 = document.getElementById("secondDiv").children.item(2);
        var answer3 = document.getElementById("thirdDiv").children.item(0);

        if(answer1 == e.target)
        {
            answer1.style.background = "#228B22";
            stopStartButton.disabled = false;
        }
        if(answer2 == e.target)
        {
            answer2.style.background = "#228B22";
            stopStartButton.disabled = false;
        }
        if(answer3 == e.target)
        {
            answer3.style.background = "#228B22";
            stopStartButton.disabled = false;
        }
    }
}