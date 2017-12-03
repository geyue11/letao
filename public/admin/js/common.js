//进度条功能

//禁用进度环
NProgress.configure({showSpinner: false});
$(document).ajaxStart(function () {
    NProgress.start();
});
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 500);
});

//判断用户是否登录
if (location.href.indexOf("login.html") == -1) {
    //如果不是登录页，发送ajax请求
    $.ajax({
        type: 'get',
        url: '/employee/checkRootLogin',
        success: function (info) {
            if (info.error == 400) {
                location.href = "login.html";
            }
        }
    });
}

//侧边栏二级菜单
$(".child").prev().on("click", function () {
    $(this).next().slideToggle(400);
});

//侧边栏隐藏和显示
$(".icon_menu").on("click", function () {
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
    $(".lt_topbar").toggleClass("now");
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