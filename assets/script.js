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
var questionPageE1 = document.querySelector('#quiz-page');
var endbtnEl = document.querySelector("#End-button");
var submitbtn = document.querySelector("#submit-button");
var scores = [""];
// var scores = localStorage.getItem("scores");

// var scores = localStorage.getItem

// Function to start the quiz
function startQuiz() {
  // Hide the start button
  startButtonEl.classList.add("hide");
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
    choiceButton.setAttribute("class", "choice");
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
    feedbackEl.classList.remove("hide");
    feedbackEl.textContent = "Correct!";
  } else {
    time -= 10;
    timeEl.textContent = time;
    feedbackEl.classList.remove("hide");
    feedbackEl.textContent = "Wrong!";
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

  // Show the end screen
  var endScreenEl = document.querySelector("#end-page");
  endScreenEl.classList.remove("hide");

  // Display the final score
  var scoreEl = document.querySelector("#final-score");
  scoreEl.textContent = time;
  scores.unshift(scoreEl);
  console.log(scores);
  localStorage.setItem('scores', scores);
}

function displayScores() {
    console.log("work?")
    startQuiz();
    // var startpageEl = document.querySelector('#start-page');
    // startpageEl.classList.add("hide");
    // console.log("work?");
    // //diplay scores to screen
    // var scorePageEl = document.querySelector("#score-page")
    // scorePageEl.classList.remove("hide");
    // console.log("work again?");
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
startButtonEl.addEventListener("click", () => { console.log("sup"); startQuiz(); } );
endbtnEl.addEventListener("click", () =>  endQuiz() );
submitbtn.addEventListener("click", displayScores);