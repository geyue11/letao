//轮播图自动轮播
mui(".mui-slider").slider({
    interval: 1000
});

//初始化scroll控件
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});

//获取参数列表
function getParamList(){
    var search = location.search;
    search = decodeURI(search);
    search = search.split('?')[1];
    var obj ={};
    search = search.split('&');
    search.forEach(function (v,i) {
        var key = v.split("=")[0];
        var value = v.split("=")[1];
        obj[key]=value;
    });
    return obj;
}

//获取指定参数
function getParam(key){
    return getParamList()[key];
}