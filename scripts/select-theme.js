// pipe options menu
let pipeOptionsContainer = document.getElementById("pipe-options-container");
let defaultPipe = pipeOptionsContainer.children[0];
let winterPipe = pipeOptionsContainer.children[1];
let alienPipe = pipeOptionsContainer.children[2];
let nightPipe = pipeOptionsContainer.children[3];

defaultPipe.addEventListener('click', function()
{
    window.localStorage.topPipePath = modes.default.topPipePath;
    window.localStorage.bottomPipePath = modes.default.bottomPipePath;
    pipeOptionsContainer.style.display = "none";
    customOptionsContainer.style.display = "flex";
});
alienPipe.addEventListener('click', function()
{
    window.localStorage.topPipePath = modes.alien.topPipePath;
    window.localStorage.bottomPipePath = modes.alien.bottomPipePath;
    pipeOptionsContainer.style.display = "none";
    customOptionsContainer.style.display = "flex";
});
winterPipe.addEventListener('click', function()
{
    window.localStorage.topPipePath = modes.winter.topPipePath;
    window.localStorage.bottomPipePath = modes.winter.bottomPipePath;
    pipeOptionsContainer.style.display = "none";
    customOptionsContainer.style.display = "flex";
});
nightPipe.addEventListener('click', function()
{
    window.localStorage.topPipePath = modes.night.topPipePath;
    window.localStorage.bottomPipePath = modes.night.bottomPipePath;
    pipeOptionsContainer.style.display = "none";
    customOptionsContainer.style.display = "flex";
});


// background options menu
let backgroundOptionsContainer = document.getElementById("background-options-container");
let defaultBackground = backgroundOptionsContainer.children[0];
let winterBackground = backgroundOptionsContainer.children[1];
let alienBackground = backgroundOptionsContainer.children[2];
let nightBackground = backgroundOptionsContainer.children[3];

defaultBackground.addEventListener('click', function()
{
    window.localStorage.backgroundPath = modes.default.backgroundPath;
    window.localStorage.floorPath = modes.default.floorPath;
    backgroundOptionsContainer.style.display = "none";
    customOptionsContainer.style.display = "flex";
});
alienBackground.addEventListener('click', function()
{
    window.localStorage.backgroundPath = modes.alien.backgroundPath;
    window.localStorage.floorPath = modes.alien.floorPath;
    backgroundOptionsContainer.style.display = "none";
    customOptionsContainer.style.display = "flex";
});
winterBackground.addEventListener('click', function()
{
    window.localStorage.backgroundPath = modes.winter.backgroundPath;
    window.localStorage.floorPath = modes.winter.floorPath;
    backgroundOptionsContainer.style.display = "none";
    customOptionsContainer.style.display = "flex";
});
nightBackground.addEventListener('click', function()
{
    window.localStorage.backgroundPath = modes.night.backgroundPath;
    window.localStorage.floorPath = modes.night.floorPath;
    backgroundOptionsContainer.style.display = "none";
    customOptionsContainer.style.display = "flex";
});


// bird options menu
let birdOptionsContainer = document.getElementById("bird-options-container");
let defaultBird = birdOptionsContainer.children[0];
let winterBird = birdOptionsContainer.children[1];
let alienBird = birdOptionsContainer.children[2];
let nightBird = birdOptionsContainer.children[3];

defaultBird.addEventListener('click', function()
{
    window.localStorage.birdPath = modes.default.birdPath;
    birdOptionsContainer.style.display = 'none';
    customOptionsContainer.style.display = "flex";
});
alienBird.addEventListener('click', function()
{
    window.localStorage.birdPath = modes.alien.birdPath;
    birdOptionsContainer.style.display = 'none';
    customOptionsContainer.style.display = "flex";
});
winterBird.addEventListener('click', function()
{
    window.localStorage.birdPath = modes.winter.birdPath;
    birdOptionsContainer.style.display = 'none';
    customOptionsContainer.style.display = "flex";
});
nightBird.addEventListener('click', function()
{
    window.localStorage.birdPath = modes.night.birdPath;
    birdOptionsContainer.style.display = 'none';
    customOptionsContainer.style.display = "flex";
});

// custom selection menu
let customOptionsContainer = document.getElementById("custom-options-container");
let birdOptions = customOptionsContainer.children[1];
let pipeOptions = customOptionsContainer.children[2];
let backgroundOptions = customOptionsContainer.children[3];
let done = customOptionsContainer.children[0];

done.addEventListener('click', function()
{
    window.localStorage.setItem('selectedTheme', 'custom');
    location.reload();
})

birdOptions.addEventListener('click', function() {
    customOptionsContainer.style.display = "none";
    birdOptionsContainer.style.display = "flex";
});
pipeOptions.addEventListener('click', function() {
    customOptionsContainer.style.display = "none";
    pipeOptionsContainer.style.display = "flex";
});
backgroundOptions.addEventListener('click', function() {
    customOptionsContainer.style.display = "none";
    backgroundOptionsContainer.style.display = "flex";
});


// setting themes options
let themeOptionsContainer = document.getElementById("theme-options-container");
let defaultOption = document.getElementById("default");
let alienOption = document.getElementById("alien");
let nightOption = document.getElementById("night");
let winterOption = document.getElementById("winter");
let customOption = document.getElementById("customize");

function showOptions()
{
    themeOptionsContainer.style.display = "flex";
}

defaultOption.addEventListener('click', function() {
    window.localStorage.setItem('selectedTheme', 'default');
    location.reload();
});
alienOption.addEventListener('click', function() {
    window.localStorage.setItem('selectedTheme', 'alien');
    location.reload();
});
nightOption.addEventListener('click', function() {
    window.localStorage.setItem('selectedTheme', 'night');
    location.reload();
});
winterOption.addEventListener('click', function()
{
    window.localStorage.setItem('selectedTheme', 'winter');
    location.reload();
});
customOption.addEventListener('click', function()
{
    themeOptionsContainer.style.display = "none";
    customOptionsContainer.style.display = "flex";
});

