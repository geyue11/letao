;(function () {
    var currPage = 1;
    var pageSize = 5;

    //页面渲染
    var render = function () {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currPage,
                pageSize: pageSize
            },
            success: function (info) {
                //渲染内容到页面
                $("tbody").html(template("cate1Tpl", info));
                //分页功能
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currPage,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currPage = page;
                        render();
                    }
                });
            }
        });
    }
    render();

    //显示添加分类模态框
    $(".addCat1").on("click", function () {
        $(".addCat1Modal").modal("show");
    });

    //验证表单
    $("form").bootstrapValidator({
        //设置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //设置校验规则
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '请输入一级分类名称'
                    }
                }
            }
        }
    });

    //表单验证成功
    $("form").on("success.form.bv", function (e) {
        //阻止表单默认提交
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $("form").serialize(),
            success: function (info) {
                if (info.success) {
                    //添加成功
                    //关闭模态框
                    $(".addCat1Modal").modal("hide");
                    //重置表单，清除表单样式
                    $("form").get(0).reset(); //reset是dom的方法
                    $("form").data("bootstrapValidator").resetForm();
                    //重新渲染页面,回到第一页
                    currPage = 1;
                    render();
                }
            }
        });
    });


})();