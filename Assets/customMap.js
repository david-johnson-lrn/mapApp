LearnosityAmd.define(['jquery-v1.10.2'], function ($) {
    'use strict';

    function buildHTML() {
        let responseDiv = $("<div>")
        responseDiv.append(`<img src='./Assets/img/map.png' alt="US map" id='tryThis'>`);

        console.log("The correct answer is X: 930, Y: 222")

        let responseArea = $("<h1 id='userResponse'>")
        responseDiv.append(responseArea);

        responseDiv.on("click", function (e) {

            let x = e.pageX;
            let y = e.pageY;

            // console.log(x, y)
            console.log("x = ", e.pageX)
            console.log("y = ", e.pageY)

            // if ((x >= 926 && x <= 932) && (e.pageY >= 220 && e.pageY <= 225)) {
            //     alert("You got it right!")
            // }
            let userGuess = {
                x: e.pageX,
                y: e.pageY
            }
            addMarker(e);
            if (x === 930 && y === 222) {
                let score = 100
                $("#score").html("Your score is " + score)
            } else if ((x >= 926 && x <= 932) && (e.pageY >= 220 && e.pageY <= 225)) {
                let score = 50
                $("#score").html("Your score is " + score)
            } else {
                $("#score").html("Sorry, you missed the marker!")
            }

            //combine both the x and y values for one total.  Consider throwing error if user clicks xvalue off of the map
            responseArea.text(userGuess.x + userGuess.y)

        })

        function addMarker(e) {
            $('#abc').remove();
            $('#def').remove();
            $('body').append('<span id="abc"></span>');
            $('body').append("<span id='def'></span>")
            var xaxis = (Math.round(e.pageX) + 5) + "px";
            var yaxis = (Math.round(e.pageY) - 16) + "px";
            $("#abc").addClass("pin");
            $('#def').addClass("pulse");

            $('#abc').css({
                'position': 'absolute',
                'top': yaxis,
                'left': xaxis,

            });
            $('#def').css({
                'position': 'absolute',
                'top': yaxis,
                'left': xaxis,

            });
        }
        return responseDiv;

    }

    function CustomShorttext(init, lrnUtils) {
        //init comes from Learnosity when you interact with the Questions API https://help.learnosity.com/hc/en-us/articles/360000758817-Creating-Custom-Questions#the-initialization-object-when-calling-questions-api

        //$el is the element on the page Learnosity give you to render your question
        console.log(init)

        let $renderHTML = buildHTML(init)
        this.$el = init.$el;


        init.$el.html($renderHTML);
        init.$el.append('<div data-lrn-component="checkAnswer"/>');
        lrnUtils.renderComponent('CheckAnswerButton', this.$el.find('[data-lrn-component=\"checkAnswer\"]').get(0));

        this.$el.find("#tryThis").on('click', function () {
            $("#userResponse").css("background-color", "")

            init.events.trigger('changed', $("#userResponse").html())
        })


        init.events.on('validate', function () {
            console.log("validated!")
            init.response = $("#userResponse").html();
            let score = new mapScorer(init.question, init.response)

            validateThis(score.isValid());


        })


        init.events.trigger('ready');

    }

    //Add validation UI to change/show the user color if correct/incorrect
    function validateThis(userAnswer) {
        let answer = $("#userResponse")

        if (userAnswer === true) {
            console.log("correct!")
            answer.css("background-color", "green")
        } else {
            console.log("wrong!")
            answer.css("background-color", "red")
        }
        console.log(answer)
    }



    function mapScorer(question, response) {
        this.question = question;
        this.response = response
    }
    //Adding a percentage of a score relative to the postion of the marker has to be controlled by one of the below 4 functions
    mapScorer.prototype.isValid = function () {
        console.log(typeof parseInt(this.question.valid_response))
        // console.log(parseInt(this.question.valid_response - 20))

        // Range of plus or minus 20
        //               996          <          1005 + 20 = 1025                  996           >  1005 - 20 = 985 
        return $("#userResponse").html() <= parseInt(this.question.valid_response) + 20 && $("#userResponse").html() >= parseInt(this.question.valid_response - 20);

    }


    mapScorer.prototype.score = function () {
        return this.isValid() ? this.maxScore() : 0;
    }

    mapScorer.prototype.maxScore = function () {
        return this.question.score || 1;
    }

    mapScorer.prototype.canValidateResponse = function () {
        return !!this.question.valid_response;
    }


    return {
        Question: CustomShorttext,
        Scorer: mapScorer
    }

})