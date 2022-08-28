
const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');

const pointPlayer = document.querySelector(".player");
const pointAi = document.querySelector(".ai");

canv.width = 500;
canv.height = 250;

const cw = canv.width;
const ch = canv.height;

const ballSize = cw / 100;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;

const rocketWidth = cw / 100;
const rocketHeight = ch / 8;

const playerX = 20;
let playerY = 50;

const aiX = cw - 20 - rocketWidth;
let aiY = ch - 50 - rocketHeight;

let x = 0;
let y = 0;

const lineWidth = 2;
const lineHeigh = 8;

let speedX = 3;
let speedY = 1;

let topCanvas = canv.offsetTop;

function table() {
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(0, 0, cw, ch);

    for (let i=10; i<ch; i+=20)
    {
        ctx.fillStyle = "gray";
        ctx.fillRect (cw / 2 - lineWidth / 2, i, lineWidth, lineHeigh);
    }
}

function ball() {
    ctx.fillStyle = "white";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += speedX;
    ballY += speedY;

    if (ballY >= ch-ballSize || ballY <= 0) speedY = -speedY;

    crush();
}

function player() {
    ctx.fillStyle = "red";
    ctx.fillRect(playerX, playerY, rocketWidth, rocketHeight);
}

function playerAi() {
    ctx.fillStyle = "red";
    ctx.fillRect(aiX, aiY, rocketWidth, rocketHeight);
    aiPosition();
}

function playerPosition(e) {
    playerY = e.clientY - topCanvas - rocketHeight / 2;

    if (playerY <= 0) playerY = 0;
    else if (playerY >= ch - rocketHeight) playerY = ch - rocketHeight;
    
}

window.addEventListener("mousemove",playerPosition);

function speedUp() {
    speedX = speedX * 1.01;
}

function aiPosition() {
    const middleRocket = aiY + rocketHeight;
    const middleBall = ballY + ballSize / 2;

    if (ballX > cw / 3) 
    {
        if (middleRocket - middleBall > ch / 4) aiY -= 1;
        else if (middleRocket - middleBall > ch / 10) aiY -= 3;
        else if (middleRocket - middleBall > -ch / 4) aiY += 1;
        else if (middleRocket - middleBall > - ch / 10) aiY += 3;
    }
    else if (ballX <= cw / 3 && ballX > cw / 6)
    {
        if (middleRocket - middleBall < cw / 3) aiY -= 3;
        else if (middleRocket - middleBall < - cw / 3) aiY += 3;
    }

    if (aiY <= 0) aiY = 0;
    else if (aiY >= ch-rocketHeight) aiY = ch-rocketHeight;  
}

function crush() {
    if (ballX <= playerX + rocketWidth && ballY >= playerY && ballY <= playerY + rocketHeight) speedX = -speedX;
    if (ballX + ballSize >= aiX && ballY >= aiY && ballY <= aiY + rocketHeight) speedX = -speedX;

    
    point();
}

function point() {
     
    if (ballX <=0) 
    {
        ballX = ballSize/2 + cw/2;
        x++;
        pointAi.innerHTML =x;
    }
    if (ballX+ballSize >=cw) 
    {
        ballX = ballSize/2 + cw/2;
        y++;
        pointPlayer.innerHTML =y;
    }
}

function game() {
    table();
    ball(); 
    player();
    playerAi();
}


setInterval(game, 1000/75);



