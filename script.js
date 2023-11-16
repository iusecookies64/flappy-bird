// setting up html canvas
let canvasEl = document.getElementById("canvas1");
let canvasEl2 = document.getElementById("canvas2");
let canvasX, canvasY;
let context = canvasEl.getContext('2d');
let context2 = canvasEl2.getContext('2d');

let itemsLoaded = 0, score = 0, highestScore = 0;

// setting up the background image
let background = new Image();
background.src = "./assets/flappybirdbg.png" ;
let canvasHeight;
let canvasWidth;


background.onload = function() {
    // setting up values for canvas height and width
    canvasHeight = background.naturalHeight * 1.2;
    canvasWidth = background.naturalWidth * 1.4;

    // resizing canvas element
    canvasEl.height = canvasHeight;
    canvasEl.width = canvasWidth;
    canvasEl2.height = canvasHeight;
    canvasEl2.width = canvasWidth;
    canvasX = canvasEl.getBoundingClientRect().left;
    canvasY = canvasEl.getBoundingClientRect().top;

    // item loaded
    itemsLoaded++;
};


// setting up floor image
let floorImg = new Image();
floorImg.src = "./assets/floor.png";
floorImg.onload = function() {
    
}

// getting bird image
let bird;
let defaultBird;
let birdImg = new Image();
birdImg.src = "./assets/flappybird.png";

birdImg.onload = function() {
    bird = {
        x: canvasWidth/8,
        y: canvasHeight/2,
        jumpSpeed: -7,
        gravity: 0.4,
        velocityY: 0,
        width: birdImg.naturalWidth / 7,
        height: birdImg.naturalHeight / 7,
    };
    defaultBird = {
        x: bird.x,
        y: bird.y,
        velocityY: 0
    }
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    // item loaded
    itemsLoaded++;
}


// Pipes stores pipes and their property
let pipeList = new LinkedList();
let pipeProperties = {
    speedX: -3,
}


// getting obstacle
let topPipeImg = new Image();
let bottomPipeImg = new Image();
topPipeImg.src = './assets/toppipe.png';
bottomPipeImg.src = './assets/bottompipe.png';

topPipeImg.onload = function() {
    pipeProperties.height = topPipeImg.naturalHeight / 5;
    pipeProperties.width = topPipeImg.naturalWidth / 4;
    pipeProperties.gap = canvasHeight / 5;

    // item loaded
    itemsLoaded++;
}

bottomPipeImg.onload = function() {
    // item loaded
    itemsLoaded++;
}

function makePipe() {
    let topPipe = {
        img: topPipeImg,
        x: canvasWidth,
        y: 0 - pipeProperties.height / 3 - Math.floor((Math.random() * pipeProperties.height / 2)),
        passed: false,
    }

    let bottomPipe = {
        img: bottomPipeImg,
        x: topPipe.x,
        y: topPipe.y + pipeProperties.height + pipeProperties.gap,
        passed: false,
    }

    pipeList.addElement(topPipe);
    pipeList.addElement(bottomPipe);
}


// function that will update bird and pipes and check for collision
function update()
{
    // clearing canvas from previous drawing
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context2.clearRect(0, 0, canvasWidth, canvasHeight);

    // drawing bird
    bird.velocityY += bird.gravity;
    bird.y = Math.max(bird.y + bird.velocityY, 0);              // so that bird doesn't fly out of map
    context2.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // checking first pipe
    let currNode = pipeList.head;

    // checking if currNode has passed screen
    if(currNode != null && currNode.data.x <= -pipeProperties.width)
    {
        pipeList.removeHead();
        currNode = pipeList.head;
    }

    let endGame = false;
    // iterating over pipes and updating them
    for(let i = 0; i < pipeList.length; i++)
    {
        pipe = currNode.data;
        // shifting the pipe to left and drawing
        pipe.x += pipeProperties.speedX;

        // checking for collision between bird and pipe
        if(detectCollision(pipe))
        {
            endGame = true;
        }

        // checking if bird passed this pipe
        if(!pipe.passed && pipe.x + pipeProperties.width <= bird.x)
        {
            score += 0.5;
            pipe.passed = true;
        }
        context.drawImage(pipe.img, pipe.x, pipe.y, pipeProperties.width, pipeProperties.height);

        currNode = currNode.next;
    }

    // drawing score
    context.font = "50px Arial";
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.fillText(`${score}`, canvasWidth/2, canvasHeight/8);

    if(endGame)
    {
        gameOver();
    }
}

function detectCollision(pipe)
{
    if(pipe.x <= bird.x + bird.width && bird.x <= pipe.x + pipeProperties.width)
    {
        if(pipe.y <= 0)
        {
            // pipe is top pipe
            if(pipe.x >= bird.x + bird.width / 5)
            {
                if(pipe.y + pipeProperties.height >= bird.y + bird.height / 5) return true;
            }
            else
            {
                if(pipe.y + pipeProperties.height >= bird.y) return true;
            }
        }
        else
        {
            // pipe is bottom pipe
            if(pipe.y <= bird.y + bird.height) return true;
        }
    }
    return false;
}


// game state controls

let gameAnimationId = null, pipeIntervalId = null, gameRunning = false, gameOverStatus = false;


function startGame() {
    gameAnimationId = setInterval(update, 15);
    pipeIntervalId = setInterval(makePipe, 1500);
    gameRunning = true;
}

function gameOver()
{
    // stopping the animation
    clearInterval(gameAnimationId);
    clearInterval(pipeIntervalId);

    // removing bird from game
    context2.clearRect(0, 0, canvasEl.width, canvasEl.height);
    explode(bird.x + bird.width / 2, bird.y + bird.height / 2, canvasEl.width, canvasEl.height, "yellow", context2);

    gameOverStatus = true;
    setTimeout(resetGame, 1000);
}

function resetGame() {
    // resetting bird properties
    bird.x = defaultBird.x;
    bird.y = defaultBird.y;
    bird.velocityY = defaultBird.velocityY;

    // redrawing bird
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // showing final score
    context.font = "50px Arial";
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.fillText(`Final Score: ${score}`, canvasWidth/2, canvasHeight/8);
    

    // showing highest score
    if(score > highestScore) highestScore = score;
    context.font = "25px Arial";
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.fillText(`Highest Score: ${highestScore}`, canvasWidth/2, canvasHeight/4);

    // resetting score
    score = 0;

    // removing all pipes
    pipeList.clear();

    // displaying startGame
    startBtn.style.display = "flex";

    gameRunning = false;
    gameOverStatus = false;
}


// adding buttons
var startBtn = document.getElementById('start-button');
let temp = setInterval(function()
{
    if(itemsLoaded == 4)
    {
        clearInterval(temp);
        startBtn.style.display = "flex";
    }
}, 500);

startBtn.addEventListener('click', function()
{
    startBtn.style.display = "none";
    startGame();
});

window.addEventListener('click', function(){
    if(gameRunning && !gameOverStatus) bird.velocityY = bird.jumpSpeed;
});

