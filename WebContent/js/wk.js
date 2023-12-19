$(document).ready(function(){  
    // 从 sessionStorage 中获取用户信息  
    var user = JSON.parse(sessionStorage.getItem('loggedInUser'));  
  
    // 检查用户是否存在  
    if (user) {  
        // 获取显示用户名的元素  
        var loggedInUsernameElement = $('#loggedInUsername');  
  
        // 设置显示的用户名  
        loggedInUsernameElement.text(user.name);  
    } else {  
        // 如果用户信息不存在，可以进行相应的处理，例如跳转到登录页面  
        alert('用户信息不存在，请登录。');  
        window.location.href = 'login.jsp';  
    }  
});
