// 监听回车键按下事件
$(document).keypress(function(e) {
    // 检查是否按下的是回车键
    if(e.which === 13) {
        // 执行你的操作，这里假设按钮的 ID 是 "myButton"
        $('#btn_login').click();
    }
});