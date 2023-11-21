let modes = {
    default: {
        birdPath: "./assets/default/flappybird.png",
        backgroundPath: "./assets/default/flappybirdbg.png",
        bottomPipePath: "./assets/default/bottompipe.png",
        topPipePath: "./assets/default/toppipe.png",
        floorPath: "./assets/default/floor.png",
        showHeadLight: false,
        color1: "yellow",
        color2: "red"
    },
    alien: {
        birdPath: "./assets/alien/flappybird.png",
        backgroundPath: "./assets/alien/flappybirdbg.png",
        bottomPipePath: "./assets/alien/bottompipe.png",
        topPipePath: "./assets/alien/toppipe.png",
        floorPath: "./assets/alien/floor.png",
        showHeadLight: false,
        color1: "#157334",
        color2: "#041c5c"
    },
    night: {
        birdPath: "./assets/night/flappybird.png",
        backgroundPath: "./assets/night/flappybirdbg.png",
        bottomPipePath: "./assets/night/bottompipe.png",
        topPipePath: "./assets/night/toppipe.png",
        floorPath: "./assets/night/floor.png",
        showHeadLight: true,
        color1: "#cc9706",
        color2: "#8f0c03"
    },
    winter: {
        birdPath: "./assets/winter/flappybird.png",
        backgroundPath: "./assets/winter/flappybirdbg.png",
        bottomPipePath: "./assets/winter/bottompipe.png",
        topPipePath: "./assets/winter/toppipe.png",
        floorPath: "./assets/winter/floor.png",
        showHeadLight: false,
        color1: "#2596be",
        color2: "#873e23"
    },
    custom: {
        birdPath: "./assets/default/flappybird.png",
        backgroundPath: "./assets/default/flappybirdbg.png",
        bottomPipePath: "./assets/default/bottompipe.png",
        topPipePath: "./assets/default/toppipe.png",
        floorPath: "./assets/default/floor.png",
        showHeadLight: false,
        color1: "yellow",
        color2: "red"
    }
}

let currMode = "default";

if(window.localStorage.selectedTheme) currMode = window.localStorage.selectedTheme;
else window.localStorage.set("selectedTheme", currMode);

if(currMode == "custom")
{
    // currMode = "default";
    modes.custom.backgroundPath = window.localStorage.backgroundPath;
    modes.custom.floorPath = window.localStorage.floorPath;
    modes.custom.topPipePath = window.localStorage.topPipePath;
    modes.custom.bottomPipePath = window.localStorage.bottomPipePath;
    modes.custom.birdPath = window.localStorage.birdPath;
    modes.custom.showHeadLight = false;
    if(modes.custom.birdPath == modes.default.birdPath)
    {
        modes.custom.color1 = modes.default.color1;
        modes.custom.color2 = modes.default.color2;
    }
    if(modes.custom.birdPath == modes.night.birdPath)
    {
        modes.custom.showHeadLight = true;
        modes.custom.color1 = modes.night.color1;
        modes.custom.color2 = modes.night.color2;
    }
    if(modes.custom.birdPath == modes.winter.birdPath)
    {
        modes.custom.color1 = modes.winter.color1;
        modes.custom.color2 = modes.winter.color2;
    }
    if(modes.custom.birdPath == modes.alien.birdPath)
    {
        modes.custom.color1 = modes.alien.color1;
        modes.custom.color2 = modes.alien.color2;
    }
}