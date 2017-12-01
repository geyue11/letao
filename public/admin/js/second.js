;(function () {
    var currPage = 1;
    var pageSize = 4;
    //页面渲染
    var render = function () {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currPage,
                pageSize: pageSize
            },
            success: function (info) {
                //渲染模板
                $("tbody").html(template("cate2Tpl", info));

                //分页
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

    //添加分类-->显示模态框
    $(".addCat2").on("click", function () {
        $(".addCat2Modal").modal("show");
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                $(".dropdown-menu").html(template("addcate2Tpl", info));
            }
        });
    });

    //表单校验
    $("form").bootstrapValidator({
        //指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置,即全部都校验
        excluded: [],
        //设置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //设置校验规则
        fields: {
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请选择上传图片'
                    }
                }
            }
        }
    });

    //选择一级分类
    $(".dropdown-menu").on("click", "li", function () {
        $(".cate1Text").text($(this).text());
        //给 input --> categoryId 赋值
        $("input[name=categoryId]").val($(this).data("id"));
        //把验证信息改成通过
        $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });

    //上传图片，同步显示在页面
    $("#fileupload").fileupload({
        dataType: 'json',
        done: function (e, info) {
            $(".showImg").attr("src", info.result.picAddr);

            //给input --> brandLogo 赋值
            $("input[name=brandLogo]").val(info.result.picAddr);
            //把验证信息改成通过
            $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });

    //验证通过，添加分类
    $("form").on("success.form.bv", function (e) {
        //阻止表单默认提交
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $("form").serialize(),
            success: function (info) {
                if (info.success) {
                    //关闭模态框
                    $(".addCat2Modal").modal("hide");

                    //重置表单信息
                    $("form").get(0).reset();
                    $("input[type=hidden]").val("");
                    $(".cate1Text").text("请选择一级分类");
                    $(".showImg").attr("src", "images/none.png");

                    //重置表单样式
                    $("form").data("bootstrapValidator").resetForm();

                    //回到第一页，重新渲染页面
                    currPage = 1;
                    render();
                }

            }
        });
    });


})();