/** Bar charts */

bar1VallArr.map((v, i) => {
    $($('.pink-bar .bar-content')[i]).css('height', `${v}%`);
    $($('.pink-bar .count-val')[i]).text(`${v}`);
});

bar2VallArr.map((v, i) => {
    $($('.purple-bar .bar-content')[i]).css('height', `${v}%`);
    $($('.purple-bar .count-val')[i]).text(`${v}`);
});

bar3VallArr.map((v, i) => {
    $($('.blue-bar .bar-content')[i]).css('height', `${v}%`);
    $($('.blue-bar .count-val')[i]).text(`${v}`);
});

bar4VallArr.map((v, i) => {
    $($('.green-bar .bar-content')[i]).css('height', `${v}%`);
    $($('.green-bar .count-val')[i]).text(`${v}`);
});

/** Show Tooltips */

$('.bar-content').hover(function () {
    // mouse enters
    $(this).children('.bar-tooltip').css({
        'z-index': '50',
        'display': 'block'
    })
}, function () {
    // mouse leaves
    $(this).children('.bar-tooltip').css({
        'z-index': '0',
        'display': 'none'
    })
});