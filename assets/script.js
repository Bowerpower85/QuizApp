const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
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
    answer: 4
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
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

startGame();

