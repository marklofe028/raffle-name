// const shuffle = document.getElementById("shuffle");
// const stop = document.getElementById("stop");
// const element = document.getElementById('machine');
// const machine = new SlotMachine(element, {
//     active: 0,
//     delay: 500,
//     onComplete: function () {
//         console.log(element.children[0].children[this.visibleTile + 1].innerHTML);
//     }
// });
//
// shuffle.addEventListener('click', () => {
//     machine.shuffle(9999);
// });
//
// stop.addEventListener('click', () => {
//     machine.stop();
// });
let names, winners = [];
let raffle = 0;

if (null !== localStorage.getItem("names")) {
    names = JSON.parse(localStorage.getItem("names"));
    // fillData(names);
    for (let i = 0; i < names.length; i++) {
        $("#slideshow").append($("<li class='raffle'><div class='jumbotron col-md text-center'><h2>" + names[i] + "</h2></div></li>"));
    }
}

// This is a new shuffler
let slides = $('#slideshow').find('li.raffle');


// move all to the right.
slides.addClass('in raffle');

// move first one to current.
$(slides[0]).removeClass().addClass('current raffle');

var currentIndex = 0;

var minimumCount = 50;
var maximumCount = 100;
var count = 0;

function nextSlide() {
    $('#again').attr('disabled', 'disabled');

    currentIndex += 1;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    // move any previous 'out' slide to the right side.
    $('.out').removeClass().addClass('in raffle');

    // move current to left.
    $('.current').removeClass().addClass('out raffle');

    // move next one to current.
    $(slides[currentIndex]).removeClass().addClass('current raffle');


    count += 1;
    // if (count > maximumCount || (count > minimumCount && Math.random() > 0.6)) {
    //     clearInterval(interval);
    //
    //     $('#again').removeAttr('disabled');
    // }
}

var interval = null; //setInterval(nextSlide, 120);

let resetShuffle = function () {
    slides = $('#slideshow').find('li.raffle');
    // move all to the right.
    slides.addClass('in raffle');

    // move first one to current.
    $(slides[0]).removeClass().addClass('current raffle');
};

let shuffle = function (array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
};

let fillData = function (data) {
    $("#slideshow").empty();

    for (let i = 0; i < data.length; i++) {
        $("#slideshow").append($("<li class='raffle'><div class='jumbotron col-md text-center'><h2>" + names[i] + "</h2></div></li>"));
    }
};

$('#again').click(function () {
    $("#stop-again").removeAttr('disabled');
    if (0 === raffle) {
        count = 0;
    } else {
        // names.splice(currentIndex, 1);
        // names = shuffle(names);
        // localStorage.setItem('names', JSON.stringify(names));
        $("#slideshow").empty();
        fillData(names);
        count = currentIndex;
        resetShuffle();
    }
    interval = setInterval(nextSlide, 120);
});

$('#stop-again').click(function () {
    clearInterval(interval);
    $('#again').removeAttr('disabled');
    raffle++;
    winners.push(names[currentIndex]);
    localStorage.setItem('winners', JSON.stringify(winners));
    names.splice(currentIndex, 1);
    names = shuffle(names);
    localStorage.setItem('names', JSON.stringify(names));
    $(this).attr('disabled', 'disabled');
});

$("#submit").click(function () {
    names = $("#names").val().split("\n");
    names = shuffle(names);
    localStorage.setItem("names", JSON.stringify(names));
    fillData(names);
    resetShuffle();
    $("#exampleModal").modal('hide');
});

$("#clear").click(function () {
    $("#names").val('');
});

$("#winners").click(function () {
    winners = JSON.parse(localStorage.getItem('winners'));
    $("#winners-list").empty();
    for (let i = 0; i < winners.length; i++) {
        $("#winners-list").append("<li>" + winners[i] + "</li>");
    }
});
