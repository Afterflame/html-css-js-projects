class pt {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class line {
    constructor(dot1, dot2) {
        if (dot1.x < dot2.x) {
            this.pt1 = dot1;
            this.pt2 = dot2;
        } else {
            this.pt1 = dot2;
            this.pt2 = dot1;
        }
    }
}

function vecMult(a1, a2, a3, a4) {
    return a1 * a2 - a3 * a4;
}

function getLines(a) {
    var ar = [];
    if (a.type == 2) {
        var dot = new pt(a.posX + a.size() * Math.cos(a.curLifespan / 16), a.posY + a.size() * Math.sin(a.curLifespan / 16));
        for (var i = 4 * Math.PI / 5 + a.curLifespan / 16; i <= 20 * Math.PI / 5 + a.curLifespan / 16; i += 4 * Math.PI / 5) {
            var x = a.posX + a.size() * Math.cos(i),
                y = a.posY + a.size() * Math.sin(i)
            ar.push(new line(dot, new pt(x, y)));
            dot = new pt(x, y);
        }
    }

    if (a.type == 1) {
        ar.push(new line(new pt(a.posX - a.size(), a.posY - a.size()), new pt(a.posX - a.size(), a.posY + a.size())));
        ar.push(new line(new pt(a.posX - a.size(), a.posY - a.size()), new pt(a.posX + a.size(), a.posY - a.size())));
        ar.push(new line(new pt(a.posX + a.size(), a.posY - a.size()), new pt(a.posX + a.size(), a.posY + a.size())));
        ar.push(new line(new pt(a.posX - a.size(), a.posY + a.size()), new pt(a.posX + a.size(), a.posY + a.size())));
    }

    if (a.type == 3) {
        ar = [new line(new pt(0, 0), new pt(0, canvas.height)),
            new line(new pt(0, 0), new pt(canvas.width, 0)),
            new line(new pt(0, canvas.height), new pt(canvas.width, canvas.height)),
            new line(new pt(canvas.width, 0), new pt(canvas.width, canvas.height))
        ]
    }
    return ar;
}


function intersectLines(line1, line2) {
    var
        v1 = vecMult(line2.pt2.x - line2.pt1.x, line1.pt1.y - line2.pt1.y, line1.pt1.x - line2.pt1.x, line2.pt2.y - line2.pt1.y),
        v2 = vecMult(line2.pt2.x - line2.pt1.x, line1.pt2.y - line2.pt1.y, line1.pt2.x - line2.pt1.x, line2.pt2.y - line2.pt1.y),
        v3 = vecMult(line1.pt2.x - line1.pt1.x, line2.pt1.y - line1.pt1.y, line2.pt1.x - line1.pt1.x, line1.pt2.y - line1.pt1.y),
        v4 = vecMult(line1.pt2.x - line1.pt1.x, line2.pt2.y - line1.pt1.y, line2.pt2.x - line1.pt1.x, line1.pt2.y - line1.pt1.y);
    if ((v1 * v2 < 0) && (v3 * v4 < 0))
        return true;
    else return false;
}

function LinterC(x1, y1, x2, y2, R) {
    var dx = x2 - x1,
        dy = y2 - y1,
        a = dx * dx + dy * dy,
        b = 2. * (x1 * dx + y1 * dy),
        c = x1 * x1 + y1 * y1 - R * R;
    if (-b < 0)
        return (c < 0);
    if (-b < (2. * a))
        return ((4. * a * c - b * b) < 0);

    return (a + b + c < 0);
}

function LineCirInter(lineObj, cirObj) {
    var lines = getLines(lineObj);
    for (var line of lines) {
        line.pt1.x -= cirObj.posX;
        line.pt1.y -= cirObj.posY;
        line.pt2.x -= cirObj.posX;
        line.pt2.y -= cirObj.posY;
        var d1 = Math.sqrt(Math.pow(line.pt1.x, 2) + Math.pow(line.pt1.y, 2)),
            d2 = Math.sqrt(Math.pow(line.pt2.x, 2) + Math.pow(line.pt2.y, 2));
        if (LinterC(line.pt1.x, line.pt1.y, line.pt2.x, line.pt2.y, cirObj.size()) || d1 <= cirObj.size() || d2 <= cirObj.size())
            return true;
    }
    return false;
}

function linelineInter(obj1, obj2) {
    var lines1 = getLines(obj1),
        lines2 = getLines(obj2);
    for (var line1 of lines1) {
        for (var line2 of lines2) {
            ctx.closePath();
            if (intersectLines(line1, line2)) return true;
        }
    }
    return false;
}

function cirCirInter(obj1, obj2) {
    var d = Math.sqrt(Math.pow(obj2.posX - obj1.posX, 2) + Math.pow(obj2.posY - obj1.posY, 2));
    if (d <= obj1.size() + obj2.size()) return true;
    else return false;
}

function objsIntersec(a, b) {
    a.rFigure /= 3;
    b.rFigure /= 3;
    if (cirCirInter(a, b) == true) {
        a.rFigure *= 3;
        b.rFigure *= 3;
        return true;
    }
    a.rFigure *= 3;
    b.rFigure *= 3;
    if (a.type == 0 || b.type == 0) {
        if (a.type == 0 && b.type == 0) {
            return cirCirInter(a, b);
        } else if (a.type == 0) {
            return (LineCirInter(b, a));
        } else {
            return LineCirInter(a, b);
        }
    } else {
        return linelineInter(a, b);
    }

}