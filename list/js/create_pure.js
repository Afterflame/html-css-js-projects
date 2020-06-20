function God(elem, PId) {
    var li = document.createElement('li');
    var ul = document.createElement('ul');
    li.id = elem.id;
    ul.id = elem.id+"_ul";
    li.appendChild(document.createTextNode(elem.text));
    document.getElementById(PId).appendChild(li);
    if (elem.childs.length !== 0) {
        document.getElementById(li.id).appendChild(ul);
        for (var point of elem.childs) {
            God(point, ul.id);
        }
    }
}

var ul = document.createElement('ul');
ul.id="0000_ul"
document.getElementById("main").appendChild(ul);
for (var i = 0; i < all.length; i++) {
    God(all[i], "0000_ul");
}