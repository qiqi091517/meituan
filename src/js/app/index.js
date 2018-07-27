require(['jquery', 'swiper', 'render'], function($, swiper, render) {
    var storage = window.localStorage;
    var code = storage.getItem('code') || 0;
    if (code) {
        $.ajax({
            url: "/api/list",
            dataType: "json",
            type: "post",
            success: function(res) {
                console.log(res.msg)
                if (res.code === 1) {
                    res.msg.forEach(function(item) {
                        render(".swiper-bars", ".bad", item);
                        new swiper(".swiper-container")
                    });

                }

            },
            error: function(error) {
                console.warn(error)
            },
        })
        $(".swiper-container").show();
    }
    $(".swiper-wrapper").on("click", 'dl', function() {
        var title = $(this).find("dd").text();
        if (title === "酒店") {
            location.href = "../page/hotel.html"
        }
    })

})