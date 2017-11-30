;(function () {
    var currPage = 1;
    var pageSize = 5;
    //页面渲染
    var render = function () {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currPage,
                pageSize: pageSize
            },
            success: function (info) {
                $("tbody").html(template("userTpl", info));

                //分页功能
                $("#pagintor").bootstrapPaginator({
                    //指定bootstrap的版本，默认值为2
                    bootstrapMajorVersion: 3,
                    currentPage: currPage,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        //page:当前点击的按钮值
                        currPage = page;
                        render();
                    }
                });
            }
        });
    }
    render();

    //禁用启用功能
    $("tbody").on("click", ".btn", function () {
        //显示启用禁用模态框
        $(".isDeleteModal").modal("show");

        var that = $(this);

        $(".btn_confrim").on("click", function () {
            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                data: {
                    id: that.data("userid"),
                    isDelete: that.data("delid")
                },
                success: function (info) {
                    if (info.success) {
                        //关闭模态框
                        $(".isDeleteModal").modal("hide");
                        //重新渲染页面
                        render();
                    }
                }
            });
        });
    });

})();