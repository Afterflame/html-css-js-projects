var state = [];

function God(elem) {
    var li = document.createElement('li');
    var ul = document.createElement('ul');
    var span = document.createElement("span");
    li.appendChild(document.createTextNode(elem.text));
    li.appendChild(span);
    li.id = elem.id;
    state.push([li.id, 1])
    ul.id = elem.id + "_ul";

    if (elem.childs.length !== 0) {
        state.push([ul.id, 1]);
        for (var point of elem.childs) {
            ul.appendChild(God(point));
        }
        if (elem.text.length !== 0)
            li.appendChild(ul);
    }
    if (elem.text.length !== 0)
        return li;
    return ul;
}
var ul = document.createElement('ul');
for (var i = 0; i < all.length; i++) {
    ul.appendChild(God(all[i]));
}
document.getElementById("main").prepend(ul);
state = new Map(state);