$(function () {
    //获取到地址栏的参数
    var key = getParam('key');
    //给input设置value值
    $(".search_wrap input").val(key);

    //渲染页面
    function render() {
        var param = {}; //参数对象
        param.proName = key;
        param.page = 1;
        param.pageSize = 100;

        if ($(".menuList li.now").length > 0) {
            var sort = $(".menuList li.now").find('span').hasClass('fa-angle-down') ? 2 : 1;
            param[$(".menuList li.now").data('type')] = sort;
        }

        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: param,
            success: function (info) {
                //渲染产品列表
                setTimeout(function () {
                    $(".lt_product").html(template("tpl", info));
                }, 1000);
            }
        });

        $(".lt_product").html('<div class="loading"></div>');
    }

    render();

    //点击搜索
    $(".btn_search").on("click", function () {
        $("li[data-type]").removeClass("now");
        $("li[data-type] span").removeClass("fa-angle-up").addClass("fa-angle-down");
        key = $(".search_wrap input").val();
        render();
    });

    //点击排序
    $("li[data-type]").on("click", function () {

        //不含有now，则添加now,含有则切换箭头
        if ($(this).hasClass("now")) {
            $(this).find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        } else {
            $(this).addClass("now").siblings().removeClass("now");
            //让所有的箭头初始向下
            $("li[data-type] span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }

        render();
    });
});