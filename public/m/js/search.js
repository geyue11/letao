$(function () {

    var arrHistory = localStorage.getItem("history") || "[]"; //搜索历史

    //渲染页面
    function render() {
        arrHistory = localStorage.getItem("history") || "[]";
        arrHistory = JSON.parse(arrHistory);
        $(".history").html(template("tpl", {list: arrHistory}));
    }

    render();

    //点击搜索添加到localStorage
    $(".btn_search").on("click", function () {

        var value = $(".search_wrap input").val().trim();

        if(value === ''){
            mui.toast("请输入搜索内容");
            return;
        }

        //如果重复，删除之前的
        var index = arrHistory.indexOf(value);
        if (index != -1) {
            arrHistory.splice(index, 1);
        }

        //控制数量为10
        if (arrHistory.length >= 10) {
            arrHistory.pop();
        }

        //存入数组
        arrHistory.unshift(value);
        //把数组添加到localStorage中
        localStorage.setItem("history", JSON.stringify(arrHistory));

        //清空文本框
        $(".search_wrap input").val("");

        render();

        location.href = "productList.html?key=" + value;
    });

    //单个删除
    $(".history").on("click", ".btn_delete", function () {
        var $this=$(this);
        mui.confirm("您确定要删除该条记录吗？","温馨提示",["确定","取消"], function (e) {
            if(e.index === 0){
                arrHistory.splice($this.data("id"), 1);
                localStorage.setItem("history", JSON.stringify(arrHistory));
                render();
            }
        });
    });

    //清空记录
    $(".history").on("click", ".btn_empty", function () {
        mui.confirm("您确定要清空所有记录吗？","温馨提示",["确定","取消"], function (e) {
            if(e.index === 0){
                localStorage.clear();
                render();
            }
        });
    });
});