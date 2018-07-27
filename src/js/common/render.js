define(['jquery', 'handlebars'], function($, handlebars) {
    var render = function(tpl, target, data, isHtml) {
        var tpl = $(tpl).html();

        var template = handlebars.compile(tpl);

        var html = template(data);

        if (isHtml) {
            $(target).html(html);
        } else {
            $(target).append(html);
        }
    }
    return render
})