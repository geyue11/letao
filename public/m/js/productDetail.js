$(function () {
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: getParam('productId')
        },
        success: function (info) {
            console.log(info);
            $(".lt_main .mui-scroll").html(template("tpl", info));

            //重新初始化轮播图
            mui(".mui-slider").slider({
                interval: 1000
            });

            //重新初始化数字输入框
            mui(".lt_num .mui-numbox").numbox();
        }
    });

});