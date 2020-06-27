var canvas, ctx, Figures, idTimer = null,
    curMoveType = 0,
    avlifespan = 200,
    dospawn = 1,
    moveX = 0,
    moveY = 0,
    chaosState = 0,
    timespeed = 1,
    velocities = [
        [0, 0],
        [0, -1],
        [-1, 0],
        [1, 0],
        [0, 1]
    ];

function getRandSign() {
    var a = Math.random() - 0.5;
    a = a / Math.abs(a);
    return a;
}
TFigure = new Class({
    initialize: function(pX, pY, mT) {
        this.type = Math.floor(Math.random() * 3);
        this.movetype = mT;
        this.posX = pX; //позиция шарика по X
        this.posY = pY; //позиция шарика по Y
        if (this.movetype == 5) {
            this.Vx = getRandSign() * Math.random();
            this.Vy = getRandSign() * Math.sqrt((1 - Math.pow(this.Vx, 2)));
        } else {
            this.Vx = velocities[this.movetype][0];
            this.Vy = velocities[this.movetype][1];
        }
        this.rFigure = 5 + Math.random() * 25;
        this.Vcoef = 0.5 / this.rFigure + 0.01;
        this.lifespan = avlifespan / 2 + avlifespan / 2 * Math.random();
        //цвет шарика, формируется случайным оьразом
        this.colFigure = 'rgb(' + Math.floor(Math.random() * 256) + ',' +
            Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        // радиус шарика, случайное число от 5 до 30
    },
    Vcoef: 1,
    curLifespan: 1,
    lifespan: 0,
    movetype: 0,
    Vx: 0,
    Vy: 0,
    posX: 0,
    posY: 0,
    colFigure: "rgb(0,0,0)",
    rFigure: 0,
    size: function() {
        with(this) {
            return Math.sqrt(Math.sqrt(Math.sqrt(curLifespan))) * rFigure
        }
    },
    colorFigure: function(ctx) {
        // формируем градиентную заливку для шарика
        with(this) {
            gradient = ctx.createRadialGradient(posX + size() / 4,
                posY - size() / 6, size() / 8, posX, posY, size());
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(0.85, colFigure);
            return gradient;
        }
    },
    draw: function(ctx) {
        // рисуем шарик на canvas
        with(this) {
            ctx.fillStyle = colorFigure(ctx);
            if (type == 0) {
                ctx.beginPath();
                ctx.arc(posX, posY, size(), 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fill();
            }
            if (type == 1) {
                ctx.fillRect(posX - size(), posY - size(), size() * 2, size() * 2);
            }
            if (type == 2) {

                ctx.beginPath();
                ctx.moveTo(posX + size() * Math.cos(curLifespan / 16), posY + size() * Math.sin(curLifespan / 16))
                for (var i = 4 * Math.PI / 5 + curLifespan / 16; i <= 20 * Math.PI / 5 + curLifespan / 16; i += 4 * Math.PI / 5) {
                    var x = posX + size() * Math.cos(i);
                    var y = posY + size() * Math.sin(i);
                    ctx.lineTo(x, y)
                }
                ctx.closePath();
                ctx.fill();
            }
        }
    }
});