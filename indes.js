 
// 添加事件 1.发雄按钮的点击事件&键盘回车发送事件  (e.keycode)

function bindEvent() {
    $('#submit').click(function (e) {
        var val = $('#inp-box').val();
        if (val) {
            renderDom('mine',val);
            $('#inp-box').val('');
            getData(val);
        }
    });
    $('#inp-box').on('keypress',function(e){
        // console.log(keyCode,e);
        if(e.keyCode == 13){
            $('#submit').trigger('click');
        }
    })
}

// 向后端传递数据 并且 收到机器人的响应

function getData(val){
    // jq把ajax 和jsonp封装在一起了
    $.ajax({
        type:'get',
        url: 'http://temp.duyiedu.com/api/chat',
        // 请求参数
        data:{
            text:val,
        },
        // dataType:期望返回的数据类型
        // contentType:前段以哪种格式将请求数据发送出去的 后端接受到这个值之后会以这种值解析
         dataType:'json',
        success:function(res){
            console.log(res);
            renderDom('robot',res.text)
        },
       
    })
}

// 渲染谈话内容

function renderDom(who,text){
    if(who == 'mine'){
        $('  <div class="mine">\
        <div class="pic"></div>\
        <div class="text">' + text+ '</div>\
    </div>').appendTo($('.content'));
    } else if (who == 'robot') {
        $('  <div class="robot">\
        <div class="pic"></div>\
        <div class="text">' + text+ '</div>\
    </div>').appendTo($('.content'));
    }
    // scrollTopMax + height = scrollHeight 原生js的   获取滚动条的高度   可以获取到内容区的高度  
    // outerHeight 包括  padding  border 的  outerHeight(true)  包括 padding + border + margin
    var scrollTop = $('.content')[0].scrollHeight - $('.content').height();
    // scrollTop 滑轮滚动的距离
    $('.content').scrollTop(scrollTop);
}
    







bindEvent();