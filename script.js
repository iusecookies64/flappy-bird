// getting root element size for responsive design
let rootSize = getComputedStyle(document.getElementById("root")).fontSize;
rootSize = Number.parseInt(rootSize);

// getting page height and width
let pageH = Number.parseInt(document.documentElement.clientHeight);
let pageW = Number.parseInt(document.documentElement.clientWidth);


// game container
let container = document.getElementById("container");
// getting container dimensions
let canvasX = container.getBoundingClientRect().left;
let canvasY = container.getBoundingClientRect().top;
let canvasHeight = container.getBoundingClientRect().height;
let canvasWidth = container.getBoundingClientRect().width;


// getting up html canvas
let canvasEl = document.getElementById("canvas1");
let canvasEl2 = document.getElementById("canvas2");
let context = canvasEl.getContext('2d');
let context2 = canvasEl2.getContext('2d');


// setting canvas background image according to theme
canvasEl.style.backgroundImage = `url(${modes[currMode].backgroundPath})`;
canvasEl2.style.backgroundImage = `url(${modes[currMode].floorPath})`;


// setting canvas height width
canvasEl.height = canvasHeight;
canvasEl.width = canvasWidth;
canvasEl2.height = canvasHeight;
canvasEl2.width = canvasWidth;


let itemsLoaded = 0, score = 0, highestScore = 0;


let factor = 1;

// getting bird image
let bird;
let defaultBird;
let birdImg = new Image();
birdImg.src = modes[currMode].birdPath;
let birdHeadLightGradient;

birdImg.onload = function() {
    bird = {
        x: canvasWidth/8,
        y: canvasHeight/2,
        jumpSpeed: -0.4 * rootSize,
        gravity: 0.025 * rootSize,
        velocityY: 0,
        width: 3.5 * rootSize,
        height: 2.6 * rootSize,
    };
    defaultBird = {
        x: bird.x,
        y: bird.y,
        velocityY: 0
    }
    birdHeadLightGradient = context.createLinearGradient(bird.x, bird.y, canvasEl.width, bird.y);
    birdHeadLightGradient.addColorStop(0, "rgba(255, 255, 0, 0.4)")
    birdHeadLightGradient.addColorStop(1, "rgba(255, 255, 255, 0)")
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    // item loaded
    itemsLoaded++;
}


// Pipes stores pipes and their property
let pipeList = new LinkedList();
let pipeProperties = {
    speedX: -0.2*rootSize,
}


// getting obstacle
let topPipeImg = new Image();
let bottomPipeImg = new Image();
topPipeImg.src = modes[currMode].topPipePath;
bottomPipeImg.src = modes[currMode].bottomPipePath;

topPipeImg.onload = function() {
    pipeProperties.height = 38.4 * rootSize;
    pipeProperties.width = 4.8 * rootSize;
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
        y: 0 - pipeProperties.height / 2 - Math.floor((Math.random() * pipeProperties.height / 3)),
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


function drawHeadLight(x, y, context)
{
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(canvasEl.width, y + 6 * rootSize);
    context.lineTo(canvasEl.width, y - 6 * rootSize);
    context.lineTo(x, y);
    context.fillStyle = birdHeadLightGradient;
    context.fill();
    context.closePath();
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
    bird.y = Math.min(bird.y, canvasHeight - bird.height);
    context2.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // drawing headlight from bird
    if(modes[currMode].showHeadLight) drawHeadLight(bird.x + bird.width - rootSize, bird.y + bird.height/2, context2);

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
    context.font = `${3 * rootSize}px Arial`;
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
    explode(bird.x + bird.width / 2, bird.y + bird.height / 2, canvasEl.width, canvasEl.height, modes[currMode].color1, modes[currMode].color2, context2);

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
    context.font = `${3 * rootSize}px Arial`;
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.fillText(`Final Score: ${score}`, canvasWidth/2, canvasHeight/8);
    

    // showing highest score
    if(score > highestScore) highestScore = score;
    context.font = `${1.5 * rootSize}px Arial`;
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.fillText(`Highest Score: ${highestScore}`, canvasWidth/2, canvasHeight/4);

    // resetting score
    score = 0;

    // removing all pipes
    pipeList.clear();

    // displaying buttons
    startBtn.style.display = "flex";
    selectBtn.style.display = "flex";
    btnContainer.style.display = "flex";

    gameRunning = false;
    gameOverStatus = false;
}


// adding buttons
var startBtn = document.getElementById('start-button');
var selectBtn = document.getElementById("theme-button");
var btnContainer = document.getElementById("btn-container");

let temp = setInterval(function()
{
    if(itemsLoaded == 3)
    {
        clearInterval(temp);
        startBtn.style.display = "flex";
        selectBtn.style.display = "flex";
        btnContainer.style.display = "flex";
    }
}, 500);

startBtn.addEventListener('click', function()
{
    startBtn.style.display = "none";
    selectBtn.style.display = "none";
    btnContainer.style.display = "none";
    startGame();
});

selectBtn.addEventListener('click', function() {
    startBtn.style.display = "none";
    selectBtn.style.display = "none";
    btnContainer.style.display = "none";
    showOptions();
})

window.addEventListener('click', function(){
    if(gameRunning && !gameOverStatus) bird.velocityY = bird.jumpSpeed;
});

