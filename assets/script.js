document.addEventListener("DOMContentLoaded", function () {

// Set variables for the quiz
var questions = [
  {
    question: "Commonly used data types do not include:",
    choices: ["stirngs", "booleans", "Alerts", "Numbers"],
    answer: "Alerts"
  },
  {
    question: "The condition in an if/else statement is enclosed with ____:",
    choices: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    answer: "Parenthesis"
  },
  {
    question: "Arrays in Javascript can be used to store: ",
    choices: ["Numbers and strings", "Other Arrays", "Booleans", "All of the above"],
    answer: "All of the above"
  }
];

var currentQuestionIndex = 0;
var time = 60;
var timerId;

// Get references to DOM elements
var startButtonEl = document.querySelector("#start-button");
var questionEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");
var timeEl = document.querySelector("#time-remaining");

var endbtnEl = document.querySelector("#End-button");
var submitbtn = document.querySelector("#submit-button");
var rtnbtn = document.querySelector("#return-button");
//screens
var startScreenE1 = document.querySelector("#start-page");
var questionPageE1 = document.querySelector('#quiz-page');
var endScreenEl = document.querySelector("#end-page");
var scorePageEl = document.querySelector("#score-page");
var scoreEl = document.querySelector("#final-score");

let highScores = [];

var scores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(scores);

// Function to start the quiz
function startQuiz() {
  // Hide the start button
  startScreenE1.classList.add("hide");
  // Show the question container
    questionPageE1.classList.remove("hide");
  // Start the timer
  timerId = setInterval(clockTick, 1000);

  // Display the first question
  displayQuestion();
}

// Function to display a question
function displayQuestion() {
  // Get the current question
  var currentQuestion = questions[currentQuestionIndex];

  // Display the question
  questionEl.textContent = currentQuestion.question;

  // Clear the choices
  choicesEl.innerHTML = "";

  // Loop through the choices and create buttons for each one
  currentQuestion.choices.forEach(function(choice, i) {
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "btn btn-primary btn-lg");
    choiceButton.setAttribute("value", choice);
    choiceButton.textContent = i + 1 + ". " + choice;
    choiceButton.onclick = checkAnswer;
    choicesEl.appendChild(choiceButton);
  });
}

// Function to check the user's answer
function checkAnswer() {
  // Get the user's answer
  var userAnswer = this.value;

  // Check if the answer is correct
  if (userAnswer === questions[currentQuestionIndex].answer) {
    //pring green correct
    feedbackEl.classList.remove("hide");
    feedbackEl.textContent = "Correct!";
    feedbackEl.classList.add("text-success", "fst-italic", "fw-bolder");
  } else {
    //print red wrong! on screen and subtract 10 sec from clock
    time -= 10;
    timeEl.textContent = time;
    feedbackEl.classList.remove("hide");
    feedbackEl.textContent = "Wrong!";
    feedbackEl.classList.add("text-danger", "fst-italic", "fw-bolder");
  }

  // Move to the next question
  currentQuestionIndex++;

  // Check if we've reached the end of the quiz
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    displayQuestion();
  }
}

// Function to end the quiz
function endQuiz() {
  // Stop the timer
  clearInterval(timerId);

  // Hide the question container
  questionPageE1.classList.add("hide");
  scoreEl = time;
  time = 60;
  // Show the end screen
  var endScreenEl = document.querySelector("#end-page");
  endScreenEl.classList.remove("hide");

  // Display the final score
  var endingDetails = document.querySelector("#final-page-details");
  endingDetails.innerHTML = `Your Score is: <strong>${scoreEl}</strong>`;
}

function displayScores() {
//add initials to scores
let initials = document.getElementById("initials");
let playersRecord = {
  name: initials.value,
  score: scoreEl
}
//sort scores numericaly
highScores.push(playersRecord);
highScores.sort(function(a, b) {
  return b.score - a.score;
});

//save the scores to local storage
localStorage.setItem("highScores", JSON.stringify(highScores));
    // Hide the question container
  questionPageE1.classList.add("hide");
  // Hide the end screen
  endScreenEl.classList.add("hide");
// hide the start page
startScreenE1.classList.add("hide");
  // Show the scores screen
  scorePageEl.classList.remove("hide");
  // scoreEl.appendChild
  let scoresList = document.getElementById("final-score");
  scoresList.innerHTML = "";

  //displaying the highscores to screen
  highScores.forEach((scores) => {
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item")
    listItem.textContent = `${scores.name}: ${scores.score}`;
    scoresList.appendChild(listItem);
  })
}

function backToQuiz() {
    scorePageEl.classList.add('hide');
    startScreenE1.classList.remove("hide");

}


// Function to update the timer
function clockTick() {
  // Update the time
  time--;
  timeEl.textContent = time;

  // Check if we've reached the end of the quiz
  if (time <= 0) {
    endQuiz();
  }
}

// Add event listener for the start button
startButtonEl.addEventListener("click", () => startQuiz() );
endbtnEl.addEventListener("click", () =>  endQuiz() );
submitbtn.addEventListener("click", function(event) {
    event.preventDefault();
    displayScores();
});
rtnbtn.addEventListener("click", function(event) {
    event.preventDefault();
    backToQuiz();
});

});