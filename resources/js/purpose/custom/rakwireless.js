"use strict";

$(window).on('load resize', function () {
    page_setup();
});

function page_setup() {
    // offset an element by giving an existing element's class or id from the same page
    if ($('[data-offset-top]').length) {
        var el = $('[data-offset-top]'),
            offsetEl = $(el.data('offset-top')),
            offset = offsetEl.height();

        el.css({ 'padding-top': offset + 'px' })
    }

    // find all elements of the same identifier and set their height to the tallest member's height
    var uidlist = new Array();
    $('[sh-uid]').each(function (i, e) {
        var sh_uid = e.getAttribute('sh-uid');
        if (!uidlist.includes(sh_uid)) {
            equalizeHeights('[sh-uid="' + sh_uid + '"]');
        }
        uidlist.push(sh_uid)
    });
}

// fetch latest articles from an rss feed
$.ajax({
    url: $('#latest-news').eq(0).attr('ln-rss'),
    type: "GET",
    success: function (data) {
        var items = [];
        $('item', data).each(function () {
            var item = {};
            item.title = $(this).find('title').eq(0).text();
            item.link = $(this).find('link').eq(0).text();
            item.description = $(this).find('description').eq(0).text();
            item.pubdate = $(this).find('pubDate').eq(0).text();
            item.id = $(this).find('guid').eq(0).text();
            item.image = $(this).find('media\\:content[medium="image"]').eq(0).attr('url');
            items.push(item);
        });
        $('#latest-news .container .row').children('div').each(function (index) {
            if (items[index].image) {
                $(this).find('[ln-type="image"]').attr("style", "background-image:url('" + items[index].image + "');");
            }
            $(this).attr("title", items[index].title);
            $(this).find('[ln-type="link"]').attr("href", items[index].link);
            $(this).find('[ln-type="date"]').text(new Date(items[index].pubdate).toDateString());
            $(this).find('[ln-type="title"]').text(items[index].title);
            $(this).find('[ln-type="description"]').text(items[index].description);
        });
        $('[ln-type="title"]').ellipsis({
            type: 'lines',
            count: 2
        });
        $('[ln-type="description"]').ellipsis({
            type: 'lines',
            count: 3
        });
    }
});

// make elements with specific identifiers to the same height as the tallest element
function equalizeHeights(selector) {
    var heights = new Array();
    // loop to get all element heights
    $(selector).each(function () {
        // need to let sizes be whatever they want so no overflow on resize
        $(this).css('min-height', '0');
        $(this).css('max-height', 'none');
        $(this).css('height', 'auto');
        // then add size (no units) to array
        heights.push($(this).height());
    });
    // find max height of all elements
    var max = Math.max.apply(Math, heights);
    // set all heights to max height
    $(selector).each(function () {
        $(this).css('height', max + 'px');
    });
}
