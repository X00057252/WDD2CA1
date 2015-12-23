// DOC ready
$(function() {
    //highlighting nav menu item
    var pathname = window.location.pathname
    var matchCount = 0
    $('.navDiv a').each(function (index) {
        if (pathname.match($(this).attr('href')) && $(this).attr('href') != '/') {
            matchCount++
            $(this).addClass('selected')
        }
    })
    // if none above highlighted then home is highlighted
    if (!matchCount)
        $('.navDiv ul li:nth-child(1) a').addClass('selected')
})
// shortened console.log
function l(x){
    console.log(x)
}
