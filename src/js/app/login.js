require(['jquery'], function($) {
    var storage = window.localStorage;
    $(".sub-btn").on("click", function() {

        var username = $("#username").val();
        var pwd = $("#pwd").val()

        if (!username || !pwd) {
            alert("用户名或密码为空")
        } else {
            $.ajax({
                url: "/api/login",
                data: {
                    username: username,
                    pwd: pwd
                },
                dataType: "json",
                type: "post",
                success: function(res) {
                    console.log(res.msg)
                    if (res.code === 1) {
                        location.href = "/";
                        storage.setItem('code', res.code)
                    }

                },
                error: function(error) {
                    console.warn(error)
                }
            })
        }
    })

})