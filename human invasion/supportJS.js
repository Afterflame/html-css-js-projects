class pt {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class line {
    constructor(dot1, dot2) {
        this.pt1 = dot1;
        this.pt2 = dot2;
    }

}

function vecMult(a1, a2, a3, a4) {
    return a1 * a2 - a3 * a4;
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

function linelineInter(lines1, lines2) {
    for (var line1 of lines1) {
        for (var line2 of lines2) {
            if (intersectLines(line1, line2)) return true;
        }
    }
    return false;
}

function lineUnderAngle(p1, length, angle) {
    var p2 = new pt(p1.x + length * Math.cos(angle), p1.y + length * Math.sin(angle));
    return p2;
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

function LineCirInter(lines, cirObj) {
    for (var line of lines) {
        var d1 = Math.sqrt(Math.pow(line.pt1.x - cirObj.pos.x, 2) + Math.pow(line.pt1.y - cirObj.pos.y, 2)),
            d2 = Math.sqrt(Math.pow(line.pt2.x - cirObj.pos.x, 2) + Math.pow(line.pt2.y - cirObj.pos.y, 2));
        if (LinterC(line.pt1.x - cirObj.pos.x, line.pt1.y - cirObj.pos.y, line.pt2.x - cirObj.pos.x, line.pt2.y - cirObj.pos.y, cirObj.size || d1 <= cirObj.size || d2 <= cirObj.size))
            return true;
    }
    return false;
}


function objsIntersec(a, b) {
    if (a.type == 0 || a.type == 1) {
        return LineCirInter(b.lines, a)
    }
    if (a.type == 2 || a.type == 3) {
        return linelineInter(a.lines, b.lines);
    }
}