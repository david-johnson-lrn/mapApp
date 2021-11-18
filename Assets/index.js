$(document).ready(function () {

    let map = $("#map");
    console.log("The correct answer is X: 930, Y: 222")

    map.click(function (e) {

        let x = e.pageX;
        let y = e.pageY;

        // console.log(x, y)
        console.log("x = ", e.pageX)
        console.log("y = ", e.pageY)

        // if ((x >= 926 && x <= 932) && (e.pageY >= 220 && e.pageY <= 225)) {
        //     alert("You got it right!")
        // }

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


        //maybe the absolute positioning of the #def neefs to be relative to the #abc

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





})