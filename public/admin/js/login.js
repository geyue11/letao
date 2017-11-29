//表单校验
$("form").bootstrapValidator({
    //指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields: {
        //校验用户名，对应name表单的name属性
        username: {
            validators: {
                //不能为空
                notEmpty: {
                    message: '用户名不能为空'
                },
                callback: {
                    message: '用户名不存在'
                }
            }
        },
        //校验密码
        password: {
            validators: {
                notEmpty: {
                    message: '密码不能为空'
                },
                stringLength: {
                    min: 6,
                    max: 12,
                    message: '密码长度在6到12位之间'
                },
                pwdError: {
                    message: '密码错误'
                }
            }
        }
    }
});

//注册表单验证成功
$("form").on("success.form.bv", function (e) {
    //阻止表单默认提交
    e.preventDefault();

    $.ajax({
        type: 'post',
        url: '/employee/employeeLogin',
        data: $("form").serialize(),
        success: function (info) {
            if (info.success) {
                location.href = "index.html";
            }
            if (info.error == 1000) {
                console.log(info.message);
                $("form").data('bootstrapValidator').updateStatus("username","INVALID","callback");
            }
            if (info.error == 1001) {
                console.log(info.message);
            }

        }
    });
});

//重置表单
$("[type=reset]").on("click", function () {
    $("form").data('bootstrapValidator').resetForm();
});