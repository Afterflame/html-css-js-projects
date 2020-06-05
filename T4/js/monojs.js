function calc1() {
    var r = document.getElementById("t1").value;
    if (r < 0 || isNaN(r)) result1.innerHTML = "Error";
    else result1.innerHTML = 3.1415 * r * 2;
    if (r.length == 0) result1.innerHTML = "Empty input";
}
function conv(a) {
    a.toString
    return a;
}
function calc2() {
    var t = 0;
    var x = document.getElementById("t2").value;
    if (x.length == 0) {
        result2.innerHTML = "Empty input";
        return;
    }
    if (isNaN(x)) result2.innerHTML = "Error";
    else {
        for (let i = 0; i < 15; i++) {
            if (i > 1) {
                t += Math.pow(x, 4 * i + 1) / (4 * i);
            }
        }
        result2.innerHTML = t;
    }
}
function getRandomInt(min, max) {
    min = Number(min);
    max = Number(max);
    if (min > max) {
        [min, max] = [max, min];
    }
    return Math.floor((max - min) * Math.random()) + min;
}
function calc3() {
    var ar = new Array(5);
    var ix = '';
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 4; j++) {
            ix = conv(i * 10 + j);
            var context = document.getElementById(ix).value;
            if (isNaN(context) || context.length == 0) {
                result3.innerHTML = "Invalid Matrix";
                return;
            }
            if (i == 1) {
                ar[j] = context;
            }
        }
    }
    result3.innerHTML += "-";
    for (let i = 2; i < 5; i++) {
        for (let j = 1; j < 4; j++) {
            ix = conv(i * 10 + j);
            document.getElementById(ix).value = document.getElementById(ix).value - ar[j];
        }
    }
    result3.innerHTML = "Success";
}
function randomizeMat() {
    var min = document.getElementById("ranMin").value;
    var max = document.getElementById("ranMax").value;
    if (min.length == 0 || max.length == 0) {
        min = 0;
        max = 10;
    }
    if (isNaN(min) || isNaN(max)) {
        result3.innerHTML = "Random faled";
        return;
    }
    var ix = '';
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 4; j++) {
            ix = conv(i * 10 + j);
            document.getElementById(ix).value = getRandomInt(min, max);
        }
    }
    result3.innerHTML = "Random succeeded";
}
function randomizeArr() {
    let n = 12;

    var s = '';
    for (let i = 0; i < n; i++) {
        if (i != n - 1)
            s += getRandomInt(0, 20) + ' ';
        else
            s += getRandomInt(0, 20);
    }
    document.getElementById("inputArr").value = s;
}
function randomizeArrNN() {
    let n = document.getElementById("sizeS").value;
    if (n.length == 0) {
        n = 5;
    };
    if (isNaN(n)) {
        document.getElementById("sizeS").value = '';
        return;
    }
    var s = '';
    for (let i = 0; i < n * n; i++) {
        if (i != n * n - 1)
            s += getRandomInt(0, 10) + ' ';
        else
            s += getRandomInt(0, 10);
    }
    document.getElementById("inputArrNN").value = s;
}
function GetArr(ix) {
    var s = document.getElementById(ix).value;
    var ar = [];

    for (let i = 0; i < s.length; i++) {
        var t = '';
        while (s[i] != ' ' && i < s.length) {
            if (s[i] < '0' || s[i] > '9')
                return 'e';
            else
                t += s[i];
            i++;
        }
        if (t != '')
            ar.push(+t);
    }
    return ar;
}
function SortArr(arr) {
    if (arr == 'e') {
        result4.innerHTML = 'Error';
        return;
    }
    arr.sort(function (a, b) {
        return a - b;
    });
    result4.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
        if (i != arr.length - 1)
            result4.innerHTML += arr[i] + ' ';
        else
            result4.innerHTML += arr[i]
    }
}
function CreateSheet() {
    var ar = GetArr("inputArrNN");
    var n = Math.round(Math.sqrt(ar.length));
    const tbl = document.getElementById('tbl1');
    var sTable = ''
    for (var i = 0; i < n; i++) {
        sTable += '<tr>'
        for (var j = n - 1; j >= 0; j--) {
            if (j % 2 == 0)
                sTable += '<td>' + ar[i + j * n] + '</td>'
            else
                sTable += '<td>' + ar[(n - i - 1) + j * n] + '</td>'
        }
        sTable += '</tr>';

    }
    tbl.innerHTML = sTable;
}