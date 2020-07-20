const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const rightScore = 10;
const totalQuestions = 4;
const timeEl = document.getElementById("timer");

let currentQuestion = {};
let acceptingAnswers = false;
let secondsLeft= 30;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "How would you get your console to output, (Hello, World)?",
    choice1: "console.boolean(Hello, World)",
    choice2: "console = (Hello, World)",
    choice3: "console.log(Hello, World)",
    choice4: "console.alert(Hello, World)",
    answer: 3
  },
  {
    question:
      "What is a function in JavaScript",
    choice1: "A set of statements that performs a task?",
    choice2: "An argument to be resolved?",
    choice3: "Only used for math?",
    choice4: "A job for computer Gnomes to secretly perform?",
    answer: 1
  },
  {
    question: "What is the differece between (Let) and (Const)?",
    choice1: "One creates a variable, (Let) the other creates a function (Const)?",
    choice2: "One creates a variable, (Const) the other creates a function (Let)?",
    choice3: "There is no difference?",
    choice4: "Both create variables, (Const) is constatant and (Let) can be changed?",
    answer: 4
  },
  {
    question: "A loop is?",
    choice1: "A circle?",
    choice2: "Essential for Hula Hoops?",
    choice3: "A structure of code where you can perform the same action multiple times in a row?",
    choice4: "None of the above?",
    answer: 3
  }
];

// //CONSTANTS
// const rightScore = 10;
// const totalQuestions = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
  setTime();

   function setTime() {
    // let secondsLeft = "45";
    let timerInterval = setInterval(function() {
      document.getElementById("timer").innerHTML="" + secondsLeft;
      secondsLeft--;
      
      if (secondsLeft === 0) {
        return window.location.assign("gameover.html");
      }
    }, 1000);
  }
  };
  
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >=totalQuestions) {
    localStorage.setItem("currentScore", score);
    //go to the end page
    return window.location.assign("gameover.html");
  }
  questionCounter++;
  // questionCounterText.innerText = `${questionCounter}/${totalQuestions}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  answers.forEach((answer) => {
    const number = answer.dataset["number"];
    answer.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

answers.forEach((answers) => {
  answers.addEventListener("click", event => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    
    if (classToApply === "correct") {
      incrementScore(rightScore);
    } else {
      let timerInterval = setInterval(function() {
        document.getElementById("timer").innerHTML="" + secondsLeft;
        secondsLeft--;
      }, 6000);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

// window.localStorage.setItem("currentScore", "score");

startGame();


