let interval = 0; // Store interval globally
let gameActive = false; // Track if the game is active
let score = 0; // Initialize score
let hit = 0; // Initialize hit
let hitCount = 0; // Initialize hit count
var time = 30;

function runTimer() {
    var timer = document.querySelector("#timer");

    gameActive = true;
    timer.textContent = time;
    clearInterval(interval); // Clear any previous timer
    interval = setInterval(function () {
        time--;
        timer.textContent = time;
        if (time <= 0) {
            clearInterval(interval);
            gameActive = false;
            document.querySelector("#pbottom").innerHTML = `<div class = "message">Time's up!🥺</div>`;
            time = 30; // Reset time
            document.querySelector("#score").textContent = score;
            setTimeout(function () { document.querySelector("#pbottom").innerHTML = `<div class = "message">Your score is: <span class="finalscore">${score}</span>🚀</div>`  }, 2000);
            // hitCount = 0; // Reset hit count
            document.querySelector("#hit").textContent = "";
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    gameActive = false;
    alert("Game stopped!");
    // document.querySelector("#pbottom").innerHTML = "Game stopped!";
    document.querySelector("#hit").textContent = "";
}

function resetGame() {
    clearInterval(interval);
    gameActive = false;
    score = 0;
    hitCount = 0;
    time = 30; // Reset time
    document.querySelector("#timer").textContent = time;
    document.querySelector("#score").textContent = score;
    document.querySelector("#hit").textContent = "";
    document.querySelector("#pbottom").innerHTML = "";
}

// function resetScore() {
//     score = 0;
//     document.querySelector("#score").textContent = score;
// }
function makeBubbles() {
    if (!gameActive) return;
    var clutter = "";
    for (var i = 1; i < 153; i++) {
        var rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${rn}</div>`;
    }
    document.querySelector("#pbottom").innerHTML = clutter;
}

function getNewHit() {
    if (!gameActive) return;
    var rn = Math.floor(Math.random() * 10);
    document.querySelector("#hit").textContent = rn;
}


function incrementScore() {
    if (!gameActive) return;
    score += 10;
    document.querySelector("#score").textContent = score;
}


document.querySelector("#start").addEventListener("click", function () {
    if (gameActive) return; // Prevent starting again if already running
    runTimer();
    makeBubbles();
    getNewHit();
    // resetScore();

});

document.querySelector("#stop").addEventListener("click", function () {
    if (!gameActive) return; // Prevent stopping if game is not active
    stopTimer();
});

document.querySelector("#reset").addEventListener("click", function () {
    if (!gameActive) return; // Prevent resetting if game is not active
    clearInterval(interval); // Clear interval on reset
    resetGame();
    document.querySelector("#pbottom").innerHTML = `<div class = "message">Game reset! Click on Start to Play Again!!☺️</div>`;

});

document.querySelector("#pbottom").addEventListener("click", function (event) {
    if (!gameActive) return; // Prevent clicking if game is not active
    var target = event.target;
    if (target.classList.contains("bubble")) {
        var bubbleValue = parseInt(target.textContent);
        var hitValue = parseInt(document.querySelector("#hit").textContent);
        if (bubbleValue === hitValue) {
            incrementScore();
            hitCount++;
            target.remove(); // Remove the clicked bubble
            getNewHit(); // Get a new hit value
        }
    }
});
document.querySelector("#pbottom").addEventListener("mouseover", function (event) {
    if (!gameActive) return; // Prevent mouseover if game is not active
    var target = event.target;
    if (target.classList.contains("bubble")) {
        target.style.backgroundColor = "red"; // Change color on hover
    }
});
document.querySelector("#pbottom").addEventListener("mouseout", function (event) {
    if (!gameActive) return; // Prevent mouseout if game is not active
    var target = event.target;
    if (target.classList.contains("bubble")) {
        target.style.backgroundColor = ""; // Reset color on mouseout
    }
});



