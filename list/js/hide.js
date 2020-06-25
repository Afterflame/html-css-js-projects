function mark(node) {
    if (node.prop('tagName') == 'LI' || node.prop('tagName') == 'UL') {
        state.set(node.attr('id'), state.get(node.attr('id')) + 1);
    } else return;
    if (node.parent().prop('tagName') == 'LI' || node.parent().prop('tagName') == 'UL')
        mark(node.parent());
}
$('li').click(function() {
    if (state.get($(this).attr('id')) == 1) {
        mark($(this).parent());
        $(this).children().last().hide("slow");
        $(this).children('span').show("fast");
    }
    if (state.get($(this).attr('id')) == 0) {
        mark($(this).parent());
        $(this).children().last().show("slow");
        $(this).children('span').hide("fast");
        console.log(state);
        state.set($(this).attr('id'), state.get($(this).attr('id')) + 2);
    }
    state.set($(this).attr('id'), state.get($(this).attr('id')) - 1);
});