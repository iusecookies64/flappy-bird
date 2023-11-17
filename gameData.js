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
    }
}

let currMode = "default";

if(window.localStorage.selectedTheme) currMode = window.localStorage.selectedTheme;
else window.localStorage.set("selectedTheme", currMode);