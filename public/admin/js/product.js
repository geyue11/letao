$(function () {
    var currPage = 1; //当前页
    var pageSize = 10; //一页的条数

    //页面渲染
    var render = function () {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currPage,
                pageSize: pageSize
            },
            success: function (info) {
                $("tbody").html(template("productTpl", info));

                //分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currPage,
                    totalPages: Math.ceil(info.total / info.size),
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case 'first':
                                return '首页';
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '尾页';
                            case 'prev':
                                return '上一页';
                            default:
                                return page;
                        }
                    },
                    onPageClicked: function (a, b, c, page) {
                        currPage = page;
                        render();
                    }
                });
            }
        });
    }
    render();

    //点击添加分类，显示模态框
    $(".addProduct").on("click", function () {
        $(".addCat2Modal").modal("show");
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                $(".dropdown-menu").html(template("addProductTpl", info));
            }
        });
    });

    //选择商品品牌
    $(".dropdown-menu").on("click", "li", function () {
        $(".productText").text($(this).text());

        //给 input -> brandId 设置值
        $("[name=brandId]").val($(this).data("id"));

        //给 input -> brandId 校验样式设为通过
        $("form").data("bootstrapValidator").updateStatus("brandId", "VALID");
    });

    var upImgs = []; //用于存放上传的图片信息

    //上传图片
    $("#fileupload").fileupload({
        dataType: 'json',
        done: function (e, data) {
            upImgs.push(data.result);
            console.log(upImgs);

            //将图片显示到页面
            $(".imgs_wrap").append('<img class="showImg" src="' + data.result.picAddr + '" width="100" height="100">');

            if (upImgs.length === 3) {
                $("form").data("bootstrapValidator").updateStatus("productLogo", "VALID");
            }
        }
    });


    //表单验证
    $("form").bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            proName: {
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '商品原价不能为空'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '商品价格不能为空'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '商品描述不能为空'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '商品尺寸不能为空'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '请输入正确的格式，例(32-46)'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '商品库存不能为空'
                    }
                }
            },
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择所属品牌'
                    }
                }
            },
            productLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传三张图片'
                    }
                }
            }
        }
    });

    //表单验证通过
    $("form").on("success.form.bv", function (e) {
        //阻止默认跳转
        e.preventDefault();

        var param = $("form").serialize();

        param += "&picName1=" + upImgs[0].picName + "&picAddr1=" + upImgs[0].picAddr;
        param += "&picName2=" + upImgs[1].picName + "&picAddr2=" + upImgs[1].picAddr;
        param += "&picName3=" + upImgs[2].picName + "&picAddr3=" + upImgs[2].picAddr;

        console.log(param);

        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: param,
            success: function (info) {
                if (info.success) {
                    //关闭模态框
                    $(".addCat2Modal").modal("hide");
                    //重置表单信息
                    $("form")[0].reset();
                    $("[name=brandId]").val("");
                    upImgs = [];
                    $(".productText").text("请选择二级分类");
                    $(".imgs_wrap img").remove();
                    //重置表单样式
                    $("form").data("bootstrapValidator").resetForm();
                    //重新渲染页面
                    currPage = 1;
                    render();
                }
            }
        });
    });
});