let optionsContainer = document.getElementById("options-container");
let defaultContainer = document.getElementById("default");
let alienContainer = document.getElementById("alien");
let nightContainer = document.getElementById("night");

function showOptions()
{
    optionsContainer.style.display = "flex";
}

defaultContainer.addEventListener('click', function() {
    window.localStorage.setItem('selectedTheme', 'default');
    location.reload();
});
alienContainer.addEventListener('click', function() {
    window.localStorage.setItem('selectedTheme', 'alien');
    location.reload();
});
nightContainer.addEventListener('click', function() {
    window.localStorage.setItem('selectedTheme', 'night');
    location.reload();
});

