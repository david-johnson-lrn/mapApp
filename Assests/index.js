$(document).ready(function () {

    let map = $("#map");


    map.click(function (e) {

        let x = e.pageX
        let y = e.pageY

        let span = $("span");

        // console.log(x, y)
        console.log("x = ", e.pageX)
        console.log("y = ", e.pageY)
        console.log("The correct answer is X: 930, Y: 222")
        // if ((x >= 926 && x <= 932) && (e.pageY >= 220 && e.pageY <= 225)) {
        //     alert("You got it right!")
        // }
        // if (x === 930 && y === 222) {
        //     alert("You hit it on the nose!!!!!!")
        // } else if ((x >= 926 && x <= 932) && (e.pageY >= 220 && e.pageY <= 225)) {
        //         alert("You got it right!")
        //     }



        $('#abc').remove();
        $('body').append('<span id="abc"></span>');
        var xaxis = (Math.round(e.pageX) + 5) + "px";
        var yaxis = (Math.round(e.pageY) - 16) + "px";
        console.log(xaxis);
        console.log(yaxis);
        // $("#abc").addClass("pin");
        $("#abc").addClass("pin");
        $('#abc').css({
            'position': 'absolute',
            'top': yaxis,
            'left': xaxis,

        });


    })












})