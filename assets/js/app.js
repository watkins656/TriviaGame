// It will give us the correct answer, show a gif, and move on to the next question with no user input at all
// When timer hits 0 shows we are out of time, show correct answer, show a gif, with no user input move on to next question
// When we get to the end, shows you "all done, here's how you did! correct answers incorrect answers, unanswered, start over link  
// When you click start over, it does not reload the page, it resets the game 


$(document).ready(function () {
    $(document).on("click", ".answer", checkAnswer);
    $(document).on("click", "#restart-button", restartGame);
    $('#welcome').show();
    $('#question').hide();
    $('#game-over').hide();


    // When start button is pressed, 
    $('#start-button').on('click', function () {
        runGame();
    });
    function restartGame() {
        resetGame();
        runGame();
    };
    function runGame() {
        $('#welcome').hide();
        $('#question').show();
        $('#game-over').hide();
        runQuestion();

    }
    // TODO: add a new div foreach answer and incorrect answer.  set an attribute equal to the "answer/incorrect attribute for determining the correct answer later"
    var bond = {
        question: "What was James Bond's favorite drink?",
        answer: "Vodka Martini, shaken not stirred",
        incorrect1: "3 fingers of 18 year Glenlivit, neat.",
        incorrect2: "1959 Armand de Brignac Ace of Spades",
        incorrect3: "Water, light ice",
        correctImage: "assets/img/bond.gif",
        incorrectImage: "assets/img/bond-inc.gif"
    };
    var bond2 = {
        question: "How much beer did Americans consume last year?",
        answer: "6.3 billion gallons",
        incorrect1: "1 million gallons",
        incorrect2: "50 thousand gallons",
        incorrect3: "875 thousand gallons",
        correctImage: "assets/img/a97188_g126_8-biggest-bottle.jpg",
        incorrectImage: "assets/img/a97188_g126_8-biggest-bottle.jpg",
    };
    var bond3 = {
        question: "Who is the biggest beer drinker in the world?",
        answer: "Czech Republic",
        incorrect1: 'Poland ',
        incorrect2: 'Ireland',
        incorrect3: 'America',
        correctImage: "assets/img/Czech.jpg",
        incorrectImage: "assets/img/Czech.jpg"

    };
    var bond4 = {
        question: 'The most expensive beer in the world costs: ',
        answer: "$765",
        incorrect1: '$500',
        incorrect2: '$3,000',
        incorrect3: '2.4 million',
        correctImage: "assets/img/EndOfHistory.jpg",
        incorrectImage: "assets/img/EndOfHistory.jpg"

    };
    var questions = [bond, bond2, bond3, bond4];

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;
    function resetGame() {
        questions = [bond, bond2, bond3, bond4];
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
    }
    function runQuestion() {
        if (questions.length > 0) {
            $('#question').empty();
            shuffle(questions);
            currentQuestion = questions.pop();
            var question = $('<h4>');
            question.addClass('question');
            question.text(currentQuestion.question);
            randomAnswerButtons(currentQuestion);
            var time = $('<div>');
            time.addClass('show-seconds');
            time.html("<h2>Time remaining: " + timer.time + " seconds</h2>");
            $('#question').prepend(question);
            question.prepend(time);
            timer.start();
            // runTimer(5);

        }
        else runGameOver();
    }
    function runGameOver() {
        timer.stop();
        $('#welcome').hide();
        $('#question').hide();
        $('#game-over').show();
        $('#game-over').html(
            "All done, here's how you did!<br>Correct answers: " + correctAnswers + "<br>Incorrect answers: " + incorrectAnswers + "<br>Unanswered: " + unanswered + '<br><button class="button" id="restart-button"><h1>Click Here to Play Again!</h1></button>');
        //  start over link  

    }
    function runCorrect() {
        $('#question').empty();
        var img = $('<img>');
        img.attr('src', currentQuestion.correctImage);
        img.attr('id', 'questionImage');
        var message = $('<div>');
        message.addClass('correct');
        message.text("That is correct");
        var answer = $('<div>');
        answer.addClass('correctAnswer');
        answer.text(currentQuestion.answer)
        $('#question').prepend(message);
        $('#question').append(answer);
        $('#question').append(img);

    }
    function runIncorrect() {
        $('#question').empty();
        var img = $('<img>');
        img.attr('src', currentQuestion.incorrectImage);
        img.attr('id', 'questionImage');
        var message = $('<div>');
        message.addClass('incorrect');
        message.text("That is incorrect");     
           var answer = $('<div>');
        answer.addClass('correctAnswer');
        answer.text(currentQuestion.answer)
        $('#question').prepend(message);
        $('#question').append(answer);
        $('#question').append(img);
    }
    function runUnanswered() {
        $('#question').empty();
        var img = $('<img>');
        img.attr('src', currentQuestion.incorrectImage);
        img.attr('id', 'questionImage');
        var message = $('<div>');
        message.addClass('unanswered');
        message.text("You ran out of time!");
        var answer = $('<div>');
        answer.addClass('correctAnswer');
        answer.text(currentQuestion.answer)
        $('#question').prepend(message);
        $('#question').append(answer);
        $('#question').append(img);

    }
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    function randomAnswerButtons(q) {
        var all = $('<div>')
        var answers = [q.answer, q.incorrect1, q.incorrect2, q.incorrect3];
        shuffle(answers);
        answers.forEach(element => {
            var newAnswer = $('<a></a>').attr("href", "#");
            newAnswer.html('<br>' + element + '</br>')
            newAnswer.addClass("answer");
            if (element == q.answer) {
                newAnswer.attr("id", "correct-answer")
            }
            else {
                newAnswer.attr("id", "incorrect-answer")

            }
            all.attr('id','allAnswers')
            all.append(newAnswer)
        });
        $('#question').append(all);
    }

    function checkAnswer() {
        timer.stop();
        timer.reset();
        console.log("checking");
        if (this.id == "correct-answer") {
            correctAnswers++
            runCorrect();
        }
        else if (this.id == "incorrect-answer") {
            incorrectAnswers++;
            runIncorrect();
        }
        else {
            unanswered++;
            runUnanswered();
        }
        setTimeout(runQuestion, 3000);
    }
    var intervalId;
    var clockRunning = false;
    var timer = {
        time: 30,
        reset: function () {
            timer.time = 30;
            // TODO: Change the "display" div to the correct div
            $(".show-seconds").text(timer.time);
        },
        start: function () {

            // DONE: Use setInterval to start the count here and set the clock to running.
            if (!clockRunning) {
                intervalId = setInterval(timer.count, 1000);
                clockRunning = true;
            }
        },
        stop: function () {

            // DONE: Use clearInterval to stop the count here and set the clock to not be running.
            clearInterval(intervalId);
            clockRunning = false;
        },
        count: function () {

            // DONE: increment time by 1, remember we cant use "this" here.
            timer.time--;

            // DONE: Get the current time, pass that into the timer.timeConverter function,
            //       and save the result in a variable.
            // DONE: Use the variable we just created to show the converted time in the "display" div.
            $(".show-seconds").html("<h2>Time remaining: " + timer.time + " seconds</h2>");
            if (timer.time === 0) {

                //             //  ...run the stop function.
                stop();

                checkAnswer();
                //             //  Alert the user that time is up.
            }
        },
    };
});

// var intervalId;
// var clockRunning = false;
// var timer = {
//     time: 30,
//    reset: function() {
//       timer.time = 30;
//       // TODO: Change the "display" div to the correct div
//       $(".show-seconds").text(timer.time);
//     },
//     start: function() {

//       // DONE: Use setInterval to start the count here and set the clock to running.
//       if (!clockRunning) {
//         intervalId = setInterval(timer.count, 1000);
//         clockRunning = true;
//               }
//     },
//     stop: function() {

//       // DONE: Use clearInterval to stop the count here and set the clock to not be running.
//       clearInterval(intervalId);
//       clockRunning = false;
//     },
//     count: function() {

//       // DONE: increment time by 1, remember we cant use "this" here.
//       timer.time--;

//       // DONE: Get the current time, pass that into the timer.timeConverter function,
//       //       and save the result in a variable.
//             // DONE: Use the variable we just created to show the converted time in the "display" div.
//             $(".show-seconds").html("<h2>Time remaining: " + timer.time + " seconds</h2>");
//             if (timer.time === 0) {

//     //             //  ...run the stop function.
//                 stop();

//                 checkAnswer();
//     //             //  Alert the user that time is up.
//                 runQuestion();
//             }
//         },
//   };

