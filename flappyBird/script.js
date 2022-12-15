const gravity = 1.75;
const flapHeight = 35;

const birdWidth = 51;
const birdHeight = 36;

const pipeWidth = 78;
const pipeGap = 270;  // Space between upper and lower.
const pipeHeight = 480;


let frame_num = 0;
let flyHeight = (canvas.height / 2) - (birdHeight / 2)

// Random location from top of canvas.
function pipeLoc() {
    // return (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth;
    return (Math.random() * (canvas.height - 300));
}

let pipes = [];
for (let i = 0; i < 3; i++) {
    let newPipe = [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()];
    pipes.push(newPipe);
}

function loop() {
    frame_num++;

    // background first part
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height,
        0, 0,
        canvas.width, canvas.height);
    // ctx.drawImage(img, 0, 0, canvas.width, canvas.height,
    //     -((index * (speed / 2)) % canvas.width) + canvas.width, 0,
    //     canvas.width, canvas.height);
    // background second part
    // ctx.drawImage(img, 0, 0, canvas.width, canvas.height,
    //     -(index * (speed / 2)) % canvas.width, 0,
    //     canvas.width, canvas.height);

    // Bird
    if (flyHeight < (canvas.height - birdHeight)) flyHeight += gravity;
    // ctx.drawImage(img,
    //     432, birdHeight, birdWidth, birdHeight,
    //     0, 0, birdWidth, birdHeight);
    ctx.drawImage(img,
        432, Math.floor((frame_num % 9) / 3) * birdHeight, birdWidth, birdHeight,
        (canvas.width / 2) - (birdWidth / 2), flyHeight, birdWidth, birdHeight);

    pipes.forEach(pipe => {
        pipe[0] -= 6;
        // Pipe - Upper
        // ctx.drawImage(img,
        //     432, birdHeight * 3, pipeWidth, pipeHeight,
        //     0, 0, pipeWidth, pipeHeight);
        ctx.drawImage(img,
            432, 588 - pipe[1], pipeWidth, pipe[1],
            pipe[0], 0, pipeWidth, pipe[1]);

        // Pipe - Lower
        // ctx.drawImage(img,
        //     432 + pipeWidth, birdHeight * 3, pipeWidth, pipeHeight,
        //     pipeWidth, 0, pipeWidth, pipeHeight);
        ctx.drawImage(img,
            432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap,
            pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);

        if (pipe[0] <= -pipeWidth) {
            // remove & create new pipe
            pipes = [...pipes.slice(1), [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()]];
            console.log(pipes);
        }

    })


    window.requestAnimationFrame(loop);
}

const ctx = canvas.getContext('2d');
const img = new Image();
img.src = "flappy-bird-set.png";
img.onload = loop;

window.onclick = function () {
    flyHeight -= flapHeight;
}