const initials = document.getElementById("intials");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const currentScore = localStorage.getItem("currentScore");
const highScore = document.getElementById("finalScore");
finalScore.innerText = currentScore;

saveScore = event => {
    event.preventDefault();
};