$(function () {
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        success: function (info) {
            $(".lt_left ul").html(template("leftList", info));
            //默认渲染第一页
            renderSecond(info.rows[0].id);
        }
    });

    //点击左侧li
    $(".lt_left ul").on("click", "li", function () {
        $(this).addClass("now").siblings().removeClass("now");
        renderSecond($(this).data("id"));

        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500); //滚动到0,0
    });

    //渲染二级分类
    function renderSecond(id) {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            success: function (info) {
                $(".lt_right .mui-scroll").html(template("rightList", info));
            }
        });
    }


});