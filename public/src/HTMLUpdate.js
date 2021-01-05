import { game } from "./Game.js";

function updateLength(length) {
    var updateLength = document.getElementsByClassName("length");

    for (var i = 0; i < updateLength.length; i++) {
        updateLength[i].innerHTML = "Length: " + length;
    }
}

function gameOver(length) {
    document.getElementById("input-box").style.display = "flex";
    document.getElementById("submit").onclick = () => submitScore(length);
}

function submitScore(score) {
    const name = document.getElementById("name").value;
    document.getElementById("input-box").style.display = "none";
    document.getElementById("submit").onclick = null;

    game.scene.stop("world");
    game.scene.start("leaderboard", { name: name, score: score }); 

    document.getElementById("replay").style.display = "block";
    document.getElementById("replay").onclick = () => replay();
}

function replay() {
    game.scene.stop("leaderboard");
    game.scene.start("world");
    document.getElementById("replay").style.display = "none";
    document.getElementById("replay").onclick = null;
}


export { gameOver, updateLength };