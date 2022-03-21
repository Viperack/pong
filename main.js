/*UPPLÖSNING 1366x768*/
/*margin(38,35px) racket(38,35px) margin(613,6px) racket(38,35px) margin(38,35px)*/
/*Ball = 7,67px*7,67px */
//TEST

const FRAME_TIME = 1.0 / 60.0;

// Width = 1

let width = 1366.0;

let height = 0.5625;
let ballLength = 0.005;
let racketHeight = 0.1125;
let racket1Y = 0.225;
let racket2Y = 0.3;
let score1 = 0;
let score2 = 0;
let racketMargin = 0.02;
let racketWidth = 0.005;
let racketSpeed = 0.001;


let canvas = document.getElementById("canvas");
let racket1 = canvas.getContext("2d");
let racket2 = canvas.getContext("2d");
let ballRender = canvas.getContext("2d");
let score = canvas.getContext("2d");

let currentKeyDown = 0;

let ball = {
    x: 0.5,
    y: 0.28125,
    velocityX: 0.001,
    velocityY: 0.001,
};

document.addEventListener('keydown', (event) => {
    let key = event.code;
    if (currentKeyDown === 0) {
        currentKeyDown = key;
    }
});

document.addEventListener("keyup", (event) =>  {
    let key = event.code;
    if (currentKeyDown == key) {
        currentKeyDown = 0;
    }
});


function KeyboardController() {

    switch (currentKeyDown) {
        case "KeyW":
            racket1Y -= racketSpeed;
            console.log("W");
            break;
        case "KeyS":
            racket1Y += racketSpeed;
            console.log("S");
            break;
        case "ArrowUp":
            racket2Y -= racketSpeed;
            console.log("PIL UPP");
            break;
        case "ArrowDown":
            racket2Y += racketSpeed;
            console.log("PIL NER");
            break;
    }

};

function format(quotient) {
    return quotient * width;
}

function checkWinner(x) {
    if (x >= 1) {
        return 1;
    } else if (x <= 0) {
        return 2;
    }

    return 0;
}

function newVelocities(ball) {
    if ((ball.x <= racketMargin + racketWidth && ball.y > racket1Y - ballLength && ball.y < racket1Y + racketHeight) || (ball.x >= 1 - (racketMargin + racketWidth + ballLength) && ball.y > racket2Y - ballLength && ball.y < racket2Y + racketHeight)) {
        ball.velocityX = -ball.velocityX;

        return ball;
    } else if (ball.y >= height || ball.y <= 0) {
        ball.velocityY = -ball.velocityY;

        return ball;
    }

    return ball;
}

function draw() {
    racket1.clearRect(0, 0, format(width), format(height));

    score.font = "30px Arial";
    score.fillText("Player 1: " + score1 + " Player 2: " + score2, format(0.5)-156.5, format(0.025));

    racket1.beginPath();
    racket1.rect(format(racketMargin), format(racket1Y), format(racketWidth), format(racketHeight));
    racket1.fill();

    racket2.beginPath();
    racket2.rect(format(1 - (racketMargin + racketWidth)), format(racket2Y), format(racketWidth), format(racketHeight));
    racket2.fill();

    ballRender.beginPath();
    ballRender.rect(format(ball.x), format(ball.y), format(ballLength), format(ballLength));
    ballRender.fill();
}

function game() {

    KeyboardController();

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // console.log("X: " + ball.x);
    // console.log("Y: " + ball.y);

    ball = newVelocities(ball);

    let winner = checkWinner(ball.x);

    switch (winner) {
        case 1:
            //Player 1 won
            score1++;
            break;

        case 2:
            //Player 2 won
            score2++;
            break;
    }

    if (winner == 1 || winner == 2) {
        ball.x = 0.5;
        ball.y = 0.28125;
    }


    draw();
}



setInterval(game, FRAME_TIME);
