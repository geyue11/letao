//侧边栏二级菜单
$(".child").prev().on("click", function () {
    $(this).next().slideToggle(400);
});


//$(".nav a").on("click", function () {
//    $(".nav a").removeClass("now");
//    $(this).addClass("now");
//});

//侧边栏隐藏和显示
$(".icon_menu").on("click", function () {
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
});

//退出登录
$(".icon_logout").on("click", function () {
    //显示退出登录的模态框
    $('.logout').modal("show");
    //点击确认退出登录
    //jquery中事件注册不会被覆盖，防止重复注册事件，先解绑，再绑定事件
    $(".btn_logout").off().on("click", function () {
        $.get("/employee/employeeLogout", function (info) {
            if (info.success) {
                location.href = "login.html";
            }
        });
    });
});