//to start the time 
let time = 1;
let TimeInMinutes = time * 60 * 60;
quizTime = TimeInMinutes / 60;

let counting = document.getElementById("secLeft");

function timeLeft() {
    let quizTimer = setInterval (function(){
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `Time: ${min} :  ${sec}`;
        }
    }, 1000)
}
timeLeft();

//to create the quizzer we need to create the elements that we need
class Quizzer{
    constructor(questions){
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0; 
    }

    getQuestionIndex(){
        return this.questions[this.questionIndex];
    }

    guess(answer){
        if (this.getQuestionIndex().isCorrectAnswer(answer)){
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded(){
        return this.questionIndex === this.questions.length;
    }
}

class myQuestions{
    constructor(text, choices, answer){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    
    isCorrectAnswer(choice){
        return this.answer === choice;
    }
}
 
function displayQuestion(){
    if (quiz.isEnded()){
        showScores();

    } else {
        let questionElement = document.getElementById("allQuestions");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("option" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

//in order to apear: question, options, answer
let questions = [
    new myQuestions(
        "Which of the following symbols is used to choose one option or the other?", ["===","||","&&",">="], "||"
    ),
    new myQuestions(
        "It allows the user to interact with the website and manages the logic of the website....", ["HTML","URL","JavaScript","CSS"], "JavaScript"
    ),
    new myQuestions(
        "You can use this function to check if an expression is true or false...", ["boolean()","pop()","slice()","string()"], "boolean()"
    ), 
    new myQuestions(
        "It allows JavaScript to style the website by changing HTML attributes, adding classes, etc.", ["DOM","JavaScript","HTML","Array"], "DOM"
    ),
    new myQuestions(
        "The ... provides access to the browser's debugging console.", ["while(counter > 2){}","close()","assert()","console.log()"], "console.log()"
    ),
    new myQuestions(
        "This is a function that returns a new pseudorandom number between zero (inclusive) and one (exclusive) every time you call it.", ["Math.floor","Math.cos","Math.random","Math.ceil"], "Math.random"
    ),
    new myQuestions(
        "Displays a dialog box that the visitor needs to full for input", ["print()","open()","moveTo()","prompt()"], "prompt()"
    )
];

let quiz = new Quizzer (questions);

displayQuestion();


function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
}

function showScores() {
    let quizEndHTML =
    `
        <h1>Quiz Completed</h1>
        <h2 id="score">You Scored: ${quiz.score} of ${quiz.questions.length}</h2>
        <div class= "submit-score">
        <input id="placeholder" placeholder="Enter your initials">
            <a href="highscores.html">Submit</a>
        </div>
        <div class= "again">
            <a href="index.html">Take Quiz Again</a>
        </div>
        <div class= "high-scores">
            <a href="highscores.html">High Scores</a>
        </div>
        <div class= "home">
            <a href="main.html">Home</a>
        </div>

    `;
    let quizElement = document.getElementById("quizzer");
    quizElement.innerHTML = quizEndHTML;
}



incrementScore = num => {
    score += num
    scoreText.innerHTML = score
}

