function DeleteFigure(i) {
    figures.splice(i, 1);
}

function KeepItUP() {
    if (figures.length <= 8 && Math.random() > 1.5 - dospawn) {
        if (Math.abs(moveX) > Math.abs(moveY))
            var topS = Math.abs(moveX);
        else
            var topS = Math.abs(moveY);
        var x = (topS - moveX) / (2 * topS);
        var y = (topS - moveY) / (2 * topS);
        x = (Math.max(Math.min((x + Math.random() - 0.5), 1), 0)) * canvas.width;
        y = (Math.max(Math.min((y + Math.random() - 0.5), 1), 0)) * canvas.height;
        if (chaosState == 1) {
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;
        }
        var item = new TFigure(x, y, 0);
        item.draw(ctx);
        figures.push(item);
    }
}

function drawBack(ctx, col1, col2, w, h) {
    // закрашиваем канвас градиентным фоном
    ctx.save();
    var g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(1, col1);
    g.addColorStop(0, col2);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
}

function moveFigure() {
    KeepItUP();
    drawBack(ctx, '#202020', '#aaa', canvas.width, canvas.height);
    var canvAsFig = new TFigure(canvas.width / 2, canvas.height / 2, 0);
    canvAsFig.type = 3;
    for (var i = 0; i < figures.length; i) {
        if (chaosState == 1) {
            var LX = ((Math.random() + 0.5) * 4) * figures[i].Vcoef * timespeed * getRandSign();
            LY = ((Math.random() + 0.5) * 4) * figures[i].Vcoef * timespeed * getRandSign();;
        } else
        if (figures[i].movetype !== 0) {
            var LX = (Math.random() * 2 - Math.random() * 2 + figures[i].Vx * 4) * figures[i].Vcoef * timespeed,
                LY = (Math.random() * 2 - Math.random() * 2 + figures[i].Vy * 4) * figures[i].Vcoef * timespeed;
        } else {
            var LX = (1000 % ((Math.random() + 2) * moveX + 1)) * (moveX / (Math.abs(moveX) + 0.5)) * figures[i].Vcoef * timespeed,
                LY = (1000 % ((Math.random() + 2) * moveY + 1)) * (moveY / (Math.abs(moveY) + 0.5)) * figures[i].Vcoef * timespeed;
        }
        figures[i].posX = figures[i].posX + LX + LX * Math.pow((figures[i].curLifespan / 70), 2);
        figures[i].posY = figures[i].posY + LY + LY * Math.pow((figures[i].curLifespan / 70), 2);
        figures[i].curLifespan += Math.sqrt(Math.pow(LX, 2) + Math.pow(LY, 2));
        for (var j = 0; j < figures.length; j++) {
            if (i == j) {
                if (objsIntersec(figures[i], canvAsFig)) {
                    figures[i].curLifespan = figures[i].lifespan + 1;
                }
            } else if (objsIntersec(figures[i], figures[j])) {
                figures[i].curLifespan = figures[i].lifespan + 1;
                figures[j].curLifespan = figures[j].lifespan + 1;
            }
        }
        if (figures[i].posX > canvas.width || figures[i].posY > canvas.height || figures[i].posY < 0 || figures[i].posX < 0 || figures[i].curLifespan >= figures[i].lifespan)
            DeleteFigure(i);
        else {
            figures[i].draw(ctx);
            i++;
        }
    }
}

function init() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        drawBack(ctx, '#202020', '#aaa', canvas.width, canvas.height);
        figures = [];
        for (var i = 1; i <= 10; i++) {
            var item = new TFigure(10 + Math.random() * (canvas.width - 30),
                10 + Math.random() * (canvas.height - 30), 0);
            item.draw(ctx);
            figures.push(item);
        }
    }
}