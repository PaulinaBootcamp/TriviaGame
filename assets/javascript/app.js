$(document).ready(function () {

    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    console.log("clicked")
    $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    questionQuestionIndex: 0,
    timer: 20,
    timerOn: false,
    timerId: '',
    // questions options and answers data
    questions: {
        q1: 'How did Daenerys Targaryen eventually hatch her dragon eggs?',
        q2: 'The phrase Valar Morghulis means:',
        q3: 'What is the only thing that can put out volatile Wildfire?',
        q4: 'Besides dragonglass, what is the only other substance capable of defeating White Walkers?',
        q5: "Who created the secret tunnel in the sewers under Casterly Rock?",
        q6: 'What is Sansa Stark\'s favorite treat?',
        q7: "Dead creatures revived by White Walkers are known as:",
        q8: "Jaqen H'ghar belongs to what mysterious order?",
        q9: "The length of Khal Drogo\'s hair denotes what?",
        q10: "Arya's punishment for stealing from the Many-Face God is:",
    },
    options: {
        q1: ['In a lightning storm', 'In a funeral pyre', 'In a fireplace', 'In chicken coop'],
        q2: ['All men must live', 'All men must serve', 'All men must die', 'All men must eat an apple a day'],
        q3: ['Sand', 'Sunlight', 'Blood', 'Wine'],
        q4: ['Rose petals', 'Wildfire', 'Laughter', 'Valyrian Steel'],
        q5: ['Tyrion Lannister', 'Lord Baelish', ' Jaime Lannister', 'Cersei Lannister'],
        q6: ['Ice from beyond the wall', 'Lemon cakes', 'Ramsay\s cooking', 'Wine'],
        q7: ['Popsickles', 'Walkers', 'Wights', 'Deaddies'],
        q8: ['Crocheting Club of High Garden', 'Night\s Watch', 'Nameless Gods of Dorn', 'Faceless Men of Braavos'],
        q9: ['How pretty he is', 'Distance to the nearest barber shop', 'Victories in battle', 'Years as a ruler'],
        q10: ['Boldness', 'Blindness', 'Uncontrollable laughter', 'Grey scale'],
    },
    answers: {
        q1: 'In a funeral pyre',
        q2: 'All men must die',
        q3: 'Sand',
        q4: 'Valyrian Steel',
        q5: 'Tyrion Lannister',
        q6: 'Lemon cakes',
        q7: 'Wights',
        q8: 'Faceless Men of Braavos',
        q9: 'Victories in battle',
        q10: 'Blindness',
    },

    note: {
        q1: 'Daenerys Targaryen placed her three dragon eggs on the funeral pyre of her late husband. She then walked into the flames and emerged from the ashes the next morning holding three newly hatched dragons.',
        q2: 'The phrase \'Valar Morghulis\' or \'all men must die\' is usually responded with Valar Dohaeris or /all men must serve.',
        q3: 'So unstable that even strong sunlight can set it ablaze, Wildfire is an extremely volatile substance that can only be extinguished with copious amounts of sand.',
        q4: 'Valyrian Steel is not only exceptionally sharp, strong and free of maintenance, but is also capable of taking down an immortal White Walker. The metal is easily identified by its distinctive rippled pattern.',
        q5: ' When Tyrion came of age, his father placed him in charge of "all the drains and cisterns in Casterly Rock." Later Tyrion reveals that he added a secret entrance in the sewers that Daenerys\' army later uses to take the fortress.',
        q6: 'Since lemons do not grow in the North, the lemon cakes - a traditional Lannister dish- would be an exciting treat when exotic fruit would occassionally arrived to Winterfell in summertime.',
        q7: 'Wights compose the undead army of the White Walkers and include humans, giants, horses, snow bears, and one very large dragon. They are extremely susceptible to fire and dragonglass. More importantly, if the White Walker that revived it dies, the wight too will perish.',
        q8: 'The Faceless Men are a guild of assassins who serve the Many-Faced God and are skilled in the ability to shapeshift their faces into entirely new people.',
        q9: 'In Dothraki culture, when a warrior is defeated in battle, he must cut off his hair. The long length and braid of Drogo\'s hair suggests that he has never lost a battle and is therefore one of the greatest killers in Westeros.',
        q10: 'After Arya takes a life that was not hers to kill, she is rendered blind as punishment and is left to beg on the streets of Braavos.',
    },

    gifs: {
        q1: 'https://media.giphy.com/media/bVZrynojYe4qQ/giphy.gif',
        q2: 'https://media.giphy.com/media/c1oP0AunRfP7a/giphy.gif',
        q3: 'https://media.giphy.com/media/Bv8fFyqIHsKis/giphy.gif',
        q4: 'https://media.giphy.com/media/5fBH6zgIqmrQoZRRJOE/giphy.gif',
        q5: 'https://media.giphy.com/media/qNnQAESrblfDG/giphy.gif',
        q6: 'https://media.giphy.com/media/wyLI3xLnsGZj2HpWhi/giphy.gif',
        q7: 'https://media.giphy.com/media/xTiTnqR4cfC1wITp9C/giphy.gif',
        q8: 'https://media.giphy.com/media/xTiTnuePyIKEeCT5VS/giphy.gif',
        q9: 'https://media.giphy.com/media/k3kXC3wb4On3q/giphy.gif',
        q10: 'https://media.giphy.com/media/3oEjHGlyH5CGNxWjxm/giphy.gif',
    },


    // initialize game
    startGame: function () {
        // restarting game results
        trivia.questionQuestionIndex = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        // show game section
        $('#game').show();

        //  empty last results
        $('#results').html('');

        // show timer
        $('#timer').text(trivia.timer);

        // remove start button
        $('#start').hide();

        $('#remaining-time').show();

        // ask first question
        trivia.nextQuestion();

    },
    // method to loop through and display questions and options 
    nextQuestion: function () {

        // set timer to 10 seconds each question
        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        // to prevent timer speed up
        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);

        }

        // gets all the questions then indexes the current questions

        //Object.values() returns an array whose elements are the enumerable property values found on the object. The ordering of the properties is the same as that given by looping over the property values of the object manually

        var questionContent = Object.values(trivia.questions)[trivia.questionQuestionIndex];

        //show question
        $('#question').text(questionContent);

        // an array of all the user options for the current question
        var questionOptions = Object.values(trivia.options)[trivia.questionQuestionIndex];

        // creates all the trivia guess options in the html
        $.each(questionOptions, function (index, key) {
            $('#options').append($('<div> <button class="option btn btn-info btn-lg">' + key + '</button></div>'));
        })

    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning: function () {
        // if timer still has time left and there are still questions left to ask
        if (trivia.timer > -1 && trivia.questionQuestionIndex < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        }
        // the time has run out and increment unanswered, run result
        else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 5000);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.questionQuestionIndex] + '</h3>');
            //show fact and gif
            trivia.showFact();
        }
        // if all the questions have been shown end the game, show results
        else if (trivia.questionQuestionIndex === Object.keys(trivia.questions).length) {

            // adds results of game (correct, incorrect, unanswered) to the page
            $('#results')
                .html('<h3>Thank you for playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                    '<p>Please play again!</p>');

            // hide game sction
            $('#game').hide();

            // show start button to begin a new game
            $('#start').show();
        }

    },
    // method to evaluate the option clicked
    guessChecker: function () {

        // timer ID for gameResult setTimeout
        var resultId;

        // the answer to the current question being asked
        var currentAnswer = Object.values(trivia.answers)[trivia.questionQuestionIndex];

        // if the text of the option picked matches the answer of the current question, increment correct
        if ($(this).text() === currentAnswer) {
            // turn button green for correct
            $(this).addClass('btn-success').removeClass('btn-info');

            trivia.correct++;
            // clearInterval(trivia.timerId);
            clearTimeout(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 5000);

            $('#results').html('<h3>Correct Answer!</h3>');
            trivia.showFact();
        }
        // else the user picked the wrong option, increment incorrect
        else {
            // turn button clicked red for incorrect
            $(this).addClass('btn-danger').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 5000);

            $('#results').html('<h3>Better luck next time! Correct answer was ' + currentAnswer + '</h3>');
            trivia.showFact();
        }

    },

    showFact: function () {
        var showFact;
        showFact = setTimeout(trivia.guessResult, 5000);
        var gifDisplay = Object.values(trivia.gifs)[trivia.questionQuestionIndex];
        var fact = Object.values(trivia.note)[trivia.questionQuestionIndex];

        console.log(gifDisplay);

        var output = `<p>${fact}</p><img src=${gifDisplay}>`;


        $('#results').append(output);

    },
    // method to remove previous question results and options
    guessResult: function () {

        // increment to next question set
        trivia.questionQuestionIndex++;

        // remove the options and results
        $('.option').remove();
        $('#results h3').remove();
        $('#results p').remove();
        $('#results img').remove();

        // begin next question
        trivia.nextQuestion();

    }

}