const initials = document.getElementById("initials");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const currentScore = localStorage.getItem("currentScore");
const finalScore = document.getElementById("finalScore");
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
finalScore.innerText = currentScore;

saveScore = event => {
    event.preventDefault();

    const score = {
        score: currentScore,
        name: initials.value
    };
    highScore.push(score);
};