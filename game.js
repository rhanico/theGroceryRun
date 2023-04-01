let canvas;
let canvasWidth = 3000;
let canvasHeight = 1500;
let content;

let playerWidth = 244;
let playerHeight = 599.67;
let playerX = 25;
let playerY = canvasHeight - playerHeight;
let playerImg;

let player = {
    x : playerX,
    y : playerY,
    width : playerWidth,
    height : playerHeight
}

let randomBox =[];

let boxOneWidth = 186.4;
let boxTwoWidth = 186.4;
let boxThreeWidth = 186.4;

let boxHeight = 144.8;
let boxX = 3000;
let boxY = canvasHeight - boxHeight;

let boxOneImg;
let boxTwoImg;
let boxThreeImg;

let speedX = -15;
let speedY = 0;

let gravity = .9;

let gameOver = false;
let score = 0;



window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;

    content = canvas.getContext("2d");

    playerImg = new Image();
    playerImg.src = "./img/player.png";
    playerImg.onload = function() {
        content.drawImage(playerImg, player.x, player.y, player.width, player.height);
    }

    boxOneImg = new Image();
    boxOneImg.src = "./img/boxes1.png";

    boxTwoImg = new Image();
    boxTwoImg.src = "./img/boxes2.png";

    boxThreeImg = new Image();
    boxThreeImg.src = "./img/boxes3.png";

 
    requestAnimationFrame(load);
    setInterval(loadBox, 1000);
    document.addEventListener("keydown", playerMove);
}




function load(){
    requestAnimationFrame(load);

    if (gameOver) {
        return;
    }

    content.clearRect (0, 0, canvas.width, canvas.height);

    speedY += gravity;
    player.y = Math.min(player.y + speedY, playerY);

    content.drawImage(playerImg, player.x, player.y, player.width, player.height);

    for (let i = 0; i < randomBox.length; i++) {
        let box = randomBox[i];
        box.x += speedX;
        content.drawImage(box.img, box.x, box.y, box.width, box.height);

        if ( colliding(player, box)) {
             gameOver = true;
             playerImg.src ="./img/collided.png";
             playerImg.onload = function(){
                content.drawImage(playerImg, player.x, player.y, player.width, player.height);
             }
        }

        
    }

}

function playerMove(e) {

    if (gameOver) {
        return;
    }

    if (( e.code == "Space" || e.code == "ArrowUp") && player.y == playerY) {
        speedY = -30;
    }
    if ( e.code == "ArrowRight" && player.x == playerX) {
        speedY = -5;
    }
}

function loadBox () {

    if (gameOver) {
        return;
    }

    let box = {
        img : null,
        x : boxX,
        y : boxY,
        width : null,
        height : boxHeight
    }

    let loadRandomBox = Math.random();

    if (loadRandomBox > .90) {
        box.img = boxThreeImg;
        box.width = boxThreeWidth;
        randomBox.push(box);
    }
    else if (loadRandomBox > .70) {
        box.img = boxTwoImg;
        box.width = boxTwoWidth;
        randomBox.push(box);
    }
    else if (loadRandomBox > .50) {
        box.img = boxOneImg;
        box.width = boxOneWidth;
        randomBox.push(box);
    }



    if (randomBox.length > 5) {
        randomBox.shift();
    }

}

function colliding(a,b){
    return a.x < b.x +b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

