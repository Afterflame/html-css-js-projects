function SetMoveType(a) {
    curMoveType = a;
}

function goInput(event) {
    var x = event.clientX;
    var y = event.clientY;
    var item = new TFigure(x, y, curMoveType);
    item.draw(ctx);
    figures.push(item);
}

function move(x, y) {
    if (Math.abs(moveX) + Math.abs(moveY) == 0) {
        moveX += x;
        moveY += y;
        idTimer = setInterval('moveFigure();', 6)
    } else {
        if (Math.abs(moveX) + Math.abs(moveY) !== 0) {
            moveX += x;
            moveY += y;
        }
        if (Math.abs(moveX) + Math.abs(moveY) == 0) {
            moveX += x;
            moveY += y;
        }
    }
}

function Chaos() {
    chaosState++;
    chaosState %= 2;
}

function stop() {
    moveX = 0;
    moveY = 0;
    clearInterval(idTimer);

}

function setlife(a) {
    avlifespan = Math.max(50, avlifespan + a * 50);
    $('life').value = avlifespan;
}

function settime(a) {
    timespeed = Math.max(0, timespeed + a * 0.1);
    $('time').value = (timespeed * 100).toFixed(0);
}