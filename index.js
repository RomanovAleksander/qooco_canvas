const canvas = document.getElementById("canvas");
const btn = document.getElementById('btn');
const ctx = canvas.getContext("2d");
let colorFrontP = 0;
let colorFrontU = 1;
let colorBackP = 1;
let colorBackU = 0;
let textIndex = 0;
let state = false;
let intervalId;

canvas.style.backgroundColor = "black";
canvas.width = 600;
canvas.height = 380;

const colors = ['red', 'yellow'];
const texts = [`NOT \ TACKY`, 'ALL \ CLASS', 'SCOTTY \ WHIRLD'];

const checkIndex = (textIndex, i , x) => textIndex === 2 ? x - 24 : x + 25 - (i*15);
const deg2rad = (deg) => (deg * Math.PI) / 180;
const checkF = (i) => i % 2 ? colorFrontP : colorFrontU;
const checkB = (i) => i % 2 ? colorBackP : colorBackU;

const drawCircle = (cx, cy, cxf, cyf, r, colorF, colorB) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cxf+cx, cyf+cy, r, 0, Math.PI * 2);
    ctx.fillStyle = colors[colorF];
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = colors[colorB];
    ctx.fill();
    ctx.closePath();
    ctx.restore();
};

const drawText = (x, y, textIndex, colorF = 0, colorB = 1) => {
    const lineHeight = 24;
    let lines = texts[textIndex].split('\ ');

    ctx.save();
    ctx.beginPath();
    ctx.font = "48px monospace";
    ctx.fillStyle = colors[colorF];
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i],  checkIndex(textIndex, i, x) + 2, y + 2 + (i*lineHeight) );
    }
    ctx.closePath();

    ctx.beginPath();
    ctx.font = "48px monospace";
    ctx.fillStyle = colors[colorB];
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], checkIndex(textIndex, i, x), y + (i*lineHeight) );
    }
    ctx.closePath();
    ctx.restore();
};

const drawSquareOfCircles = () => {
    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 1; i < 10 + 1; i++) {
        drawCircle(25+(i*50), 40, 4, 1,  20, checkF(i), checkB(i));
        drawCircle(25+(i*50), 330, 4, 1, 20, checkF(i), checkB(i));
    }
    for (let i = 1; i < 5 + 1; i++) {
        drawCircle(50, 35+(i*50), 1, -2,20, checkF(i), checkB(i));
        drawCircle(550, 35+(i*50), 1, -2,20, checkF(i), checkB(i));
    }
};

const drawCircleOfCircles = () => {
    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let cx = canvas.width/2;
    let cy = canvas.height/2;

    for (let i = 0; i < 22; i++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(deg2rad(i * 18));
        drawCircle(0, -160, 2, 1,  20, checkF(i), checkB(i));
        ctx.restore();
    }
};

const drawT = () => {
    drawText(canvas.width/2.5, canvas.height/2.5, textIndex);
    textIndex = (textIndex + 1) % texts.length;
};

const checkState = () => {
    if (intervalId) {
        clearInterval(intervalId);
    }
    if (state) {
        intervalId = setInterval(drawCircleOfCircles, 300);
    } else {
        intervalId = setInterval(drawSquareOfCircles, 300);
    }
};

const changeColor = () => {
    colorFrontP = (colorFrontP + 1) % colors.length;
    colorBackP = (colorBackP + 1) % colors.length;
    colorFrontU = (colorFrontU + 1) % colors.length;
    colorBackU = (colorBackU + 1) % colors.length;
};

btn.addEventListener('click', () => {
    state = !state;
    checkState();
});

checkState();
setInterval(drawT, 1500);
setInterval(changeColor, 300);
