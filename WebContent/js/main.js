function request(method, url, data, successCallBack, errorCallBack, async) {
    $.ajax({
        url: url,
        contentType:"application/json",
        async:async,
        data: JSON.stringify(data),
        method: method
    }).done(successCallBack).fail(errorCallBack);
}

function uploadFileRequest(suit,urlPrefix){
suit.find("#uploaderContainer input").fileupload({
        dataType: 'json',
        done: function (e, data) {
            suit.find("#imageUrl").val(data.result.description);
            suit.find("#uploaderContainer img").attr("src",urlPrefix+data.result.description);
            showMessage({"code":0,"description":data.result.description+"上传成功！"});
            }
    });
}

function showMessage(data){	
alert(data.description);
}

function serverError(XMLHttpRequest, textStatus){
console.log("responseText:",XMLHttpRequest.responseText);
console.log("status:",XMLHttpRequest.status);
console.log("textStatus:",textStatus);
console.log("readyState:",XMLHttpRequest.readyState);
alert("服务器故障");
}

function centerObject(object,zIndex){
object.css({
    zIndex:zIndex,
    position:'absolute', 
    left: ($(window).width() - object.outerWidth())/2, 
    top: ($(window).height() -object.outerHeight())/3 + $(document).scrollTop() 
});
}

function centerObjectX(object,zIndex){
object.css({
    zIndex:zIndex,
    position:'absolute', 
    left: ($(window).width() - object.outerWidth())/2
});
}

function centerObjectY(object,zIndex){
object.css({
    zIndex:zIndex,
    position:'absolute', 		 
    top: ($(window).height() - object.outerHeight())/3 + $(document).scrollTop() 
});
}


function hideObject(object){
object.css({
    zIndex:0,
    display:"none"
});
}

Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
places = !isNaN(places = Math.abs(places)) ? places : 2;
symbol = symbol !== undefined ? symbol : "$";
thousand = thousand || ",";
decimal = decimal || ".";
var number = this,
    negative = number < 0 ? "-" : "",
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};



function validateAndSubmit() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("password_confirm").value;

    if (password === confirmPassword) {
        // 构建User对象
        var user = {
            name: document.getElementById("username").value,
            realName: document.getElementById("username_real").value,
            passwd: password,
            gender: document.querySelector('input[name="gender"]:checked').value,
            modelID: document.querySelector('input[name="male_modle"]:checked').value,
            // 其他属性根据需要添加
        };

        // 使用fetch发送POST请求
        fetch('http://127.0.0.1:8080/suit/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(result => {
            if (result.code === 0) {
                alert(result.description);
                // 注册成功后可以执行一些跳转或其他操作
                window.location.href = 'login.jsp';
            } else {
                alert(result.description);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('注册过程中发生错误，请重试。');
        });
    } else {
        alert("两次输入的密码不匹配，请重试。");
    }
}


function selectGender(gender) {
var maleAvatarContainer = document.querySelector('.maleAvatar');
var femaleAvatarContainer = document.querySelector('.femaleAvatar');

if (gender === 'male') {
    maleAvatarContainer.style.display = 'inline-block';
    femaleAvatarContainer.style.display = 'none';
} else if (gender === 'female') {
    femaleAvatarContainer.style.display = 'inline-block';
    maleAvatarContainer.style.display = 'none';
}
}

function logValidateAndSubmit() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // 构建User对象
    var user = {
        name: username,
        passwd: password,
    };

    // 使用fetch发送POST请求
    fetch('http://127.0.0.1:8080/suit/account/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(result => {
        if (result.code === 0) {
            alert(result.description);

            // 提取用户信息
            var user = result.data;
            // 存储用户信息到 sessionStorage
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            // 注册成功后可以执行一些跳转或其他操作
            window.location.href = 'index.jsp';
        } else {
            alert(result.description);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('登录过程中发生错误，请重试。');
    });
}

// 处理登录结果的函数
function handleLoginResult(result) {
    if (result.code === 0) {
        alert(result.description);

        // 提取用户信息
        var user = result.data;
       
        // 存储用户信息到 sessionStorage
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));

        // 输出用户信息到控制台（实际应用中根据需求进行操作）
        console.log("User ID:", user.id);
        console.log("Username:", user.name);
        console.log("Gender:", user.gender);
        console.log("Real Name:", user.realName);
        console.log("Model ID:", user.modelID);

        // 进入下一个页面或执行其他操作
        window.location.href = 'index.jsp';
    } else {
        alert(result.description);
    }
    window.location.href = 'index.jsp';
}

function selfFunction() {
    var userFormContainer = document.querySelector('.info_form');
    userFormContainer.style.display = 'block';
    
    
    // 从 sessionStorage 中获取用户信息
    var user = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // 检查用户是否存在
    if (user) {
        // 创建一个显示用户信息的 HTML 结构
        var userInfoHTML = `
        <button class="btn_close" onclick="closeFunction()"><img src="../images/ui/close.png" alt=""></button>
            <h2>用户信息</h2>
            <label class="gender_prompt" for="username">用户名称：</label>
            <input type="text" id="username" name="username" maxlength="20" value="${user.name}" disabled><br>

            <label class="gender_prompt" for="username_real">用户实名：</label>
            <input type="text" id="username_real" name="username_real" value="${user.realName}" maxlength="20" disabled><br>

            <label class="gender_prompt" for="password">密码：</label>
            <input type="password" id="password" name="password" placeholder="tips:密码如果不需要修改本项留空" minlength="6" maxlength="20"><br>

            <label class="gender_prompt" for="password_confirm">密码确认：</label>
            <input type="password" id="password_confirm" name="password_confirm" placeholder="tips:密码如果不需要修改本项留空"><br>

            <label class="gender_prompt">性别：</label>
            <span class="gender_box">
                <label class="gender-label" onclick="selectGender('male')">
                    <input type="radio" name="gender" id="user_male" value="male" ${user.gender === 'male' ? 'checked' : ''}>
                    男
                </label>

                <label class="gender-label" onclick="selectGender('female')">
                    <input type="radio" name="gender" id="user_female" value="female" ${user.gender === 'female' ? 'checked' : ''}>
                    女
                </label>
            </span>

            <div class="model_prompt">
                模型选择
            </div>
            <div class="segmenting"></div>
            <div class="model">
                <div class="maleAvatar">
                    <label>
                        <input type="radio" class="img_radio" name="male_modle" id="maleAvatar_01" value="maleAvatar_01" ${user.modelID === 'maleAvatar_01' ? 'checked' : ''}>
                        <img src="../images/data/model/mheadA.png" class="img_avatar">
                    </label>
                    <label>
                        <input type="radio" class="img_radio" name="male_modle" id="maleAvatar_02" value="maleAvatar_02"${user.modelID === 'maleAvatar_02' ? 'checked' : ''}>
                        <img src="../images/data/model/mheadB.png" class="img_avatar" id="maleAvatar_02">
                    </label>
                </div>
                <div class="femaleAvatar">
                    <label>
                        <input type="radio" class="img_radio" name="male_modle" id="femaleAvatar_01" value="femaleAvatar_01" ${user.modelID === 'femaleAvatar_01' ? 'checked' : ''}>
                        <img src="../images/data/model/wheadA.png" class="img_avatar">
                    </label>
                    <label>
                        <input type="radio" class="img_radio" name="male_modle" id="femaleAvatar_02" value="femaleAvatar_02" ${user.modelID === 'femaleAvatar_02' ? 'checked' : ''}>
                        <img src="../images/data/model/wheadB.png" class="img_avatar">
                    </label>
                </div>
            </div>
            <div class="footer_rgs">
                <button type="button" class="btn_save" onclick="saveUserInfo()">保存信息</button><br>
            </div>
            
            `;

        // 将 HTML 结构插入到页面中的 userInfoContainer 元素中
        document.getElementById('info_form').innerHTML = userInfoHTML;
        selectGender(user.gender);
} else {
    // 如果用户信息不存在，可以进行相应的处理，例如跳转到登录页面
    alert('用户信息不存在，请登录。');
    window.location.href = 'login.jsp';
}
};


function saveUserInfo() {
    // 从页面中获取用户输入的密码和确认密码
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('password_confirm').value;

    // 从 sessionStorage 中获取用户信息
    var user = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // 构造用户修改后的信息对象
    var updatedUserInfo = {
        name: user.name,
        realName: user.realName,
        gender: document.querySelector('input[name="gender"]:checked').value,
        modelID: document.querySelector('input[name="male_modle"]:checked').value,
        // 可根据需要添加其他字段
    };

    // 如果密码和确认密码都为空，表示用户不打算修改密码
    if (!password && !confirmPassword) {
    	updatedUserInfo.passwd = password;
        alert('用户选择不修改密码');

        // 提交数据到后端
        submitData(updatedUserInfo);

    } else {
        // 如果用户输入了密码，检查两次输入的密码是否一致
        if (password === confirmPassword) {
            // 更新密码字段
            updatedUserInfo.passwd = password;

            // 提示密码修改成功
            alert('密码修改成功');

            // 提交数据到后端
            submitData(updatedUserInfo);

        } else {
            alert('两次输入的密码不一致，请重新输入');
        }
    }
}

// 提交数据到后端的函数
function submitData(updatedUserInfo) {
    // 使用fetch发送POST请求
    fetch('http://127.0.0.1:8080/suit/account/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserInfo),
    })
    .then(response => response.json())
    .then(result => {
        // 处理后端返回的结果
        if (result.code === 0) {
            alert(result.description);
            // 可以在这里执行一些成功后的操作
            // 存储用户信息到 sessionStorage
        
            // 获取当前存储在 sessionStorage 中的用户信息
            var currentStoredUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

            // 更新用户信息
            // 将后端返回的新用户信息合并到当前用户信息中
            var updatedUser = Object.assign({}, currentStoredUser, result.data);

            // 存储更新后的用户信息到 sessionStorage
            sessionStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

            // 输出更新后的用户信息到控制台（实际应用中根据需求进行操作）
            console.log("Updated Username:", updatedUser.username);
            console.log("Updated Gender:", updatedUser.gender);
            console.log("Updated Real Name:", updatedUser.realName);
            console.log("Updated Model ID:", updatedUser.modelID);

        } else {
            alert(result.description);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('保存信息过程中发生错误，请重试。');
    });
}

function closeFuction() {
    var userFormContainer = document.querySelector('.info_form');
    userFormContainer.style.display = 'none';
}




