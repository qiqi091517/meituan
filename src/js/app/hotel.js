require(['jquery', 'swiper', 'render', 'bscroll'], function($, swiper, render, bscroll) {
    var storeage = window.localStorage;

    if (!storeage.getItem("mask")) {
        $(".mask").show();
    }
    //点击关闭
    $(".close-btn").on("click", function() {
        $(".mask").hide();
        storeage.setItem("mask", 1)
    })

    new swiper(".swiper-container");

    var cityScroll = new bscroll(".city-list", {
        click: true
    });

    $.ajax({
        url: "/api/city",
        dataType: "json",
        success: function(res) {
            console.log(res);
            var data = res.msg.data;
            var targetCity = format(data);
            console.log(targetCity);
            render("#city-tpl", ".city", targetCity);
            cityScroll.refresh()
            render("#nav-tpl", ".nav-list", targetCity);
        },
        error: function(error) {
            console.warn(error)
        }
    });

    function format(data) {

        var obj = {};
        data.forEach(function(item) {
            var key = item.pinyin.substr(0, 1).toUpperCase();
            if (!obj[key]) {
                obj[key] = {
                    title: key,
                    list: []
                }
            }
            obj[key].list.push(item)
        })


        var arr = [];
        for (var k in obj) {
            arr.push(obj[k])
        }
        arr.sort(function(a, b) {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        });
        return arr
    }
    //点击目的地
    $(".address-btn").on("click", function() {
        $(".city-wrap").addClass("up")
    });
    $(".address-btn1").on("click", function() {
        $(".search-key-wrap").addClass("up")
    });
    //点击关闭
    $(".close-btn").on("click", function() {
        $(".city-wrap").removeClass("up")
    });
    $(".close-btn").on("click", function() {
        $(".search-key-wrap").removeClass("up")
    });
    //点击大写字母
    $(".nav-list").on("click", "li", function() {
        var index = $(this).index();
        cityScroll.scrollToElement($(".city>li").eq(index)[0])
    });
    //点击城市
    $(".city").on("click", "city-name", function() {

        var text = $(this).text();
        $(".address-text").html(text);
        $(".city-wrap").removeClass("up")
    })


    //请求热门
    $.ajax({
        url: "/api/search",
        dataType: "json",
        success: function(res) {
            console.log(res)
            var asd = res.msg.data.itemTerms;
            console.log(asd)
            if (res.code === 1) {

                render("#search-city-tpl", ".search-wraps", asd)
            }
        },

        error: function(error) {
            console.warn(error)
        }
    })


    $(".search-wraps").on("click", ".open", function() {
        alert(1)
        var _ele = $(this).parents(".group").index().find("ol");
        if ($(this).text() === "收起") {
            _ele.css("height", "74px");
            $(this).text("展开")
        } else {
            _ele.css("height", "auto")
            $(this).text("收起")
        }


    })
})