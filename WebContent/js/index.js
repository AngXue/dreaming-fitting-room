function request(method, url, data, successCallBack, errorCallBack, async) {
    $.ajax({
        url: url,
        contentType: "application/json",
        async: async,
        data: JSON.stringify(data),
        method: method
    }).done(successCallBack).fail(errorCallBack);
}

function uploadFileRequest(suit, urlPrefix) {
    suit.find("#uploaderContainer input").fileupload({
        dataType: 'json',
        done: function (e, data) {
            suit.find("#imageUrl").val(data.result.description);
            suit.find("#uploaderContainer img").attr("src", urlPrefix + data.result.description);
            showMessage({ "code": 0, "description": data.result.description + "上传成功！" });
        }
    });
}

function showMessage(data) {
    alert(data.description);
}

function serverError(XMLHttpRequest, textStatus) {
    console.log("responseText:", XMLHttpRequest.responseText);
    console.log("status:", XMLHttpRequest.status);
    console.log("textStatus:", textStatus);
    console.log("readyState:", XMLHttpRequest.readyState);
    alert("服务器故障");
}

function centerObject(object, zIndex) {
    object.css({
        zIndex: zIndex,
        position: 'absolute',
        left: ($(window).width() - object.outerWidth()) / 2,
        top: ($(window).height() - object.outerHeight()) / 3 + $(document).scrollTop()
    });
}

function centerObjectX(object, zIndex) {
    object.css({
        zIndex: zIndex,
        position: 'absolute',
        left: ($(window).width() - object.outerWidth()) / 2
    });
}

function centerObjectY(object, zIndex) {
    object.css({
        zIndex: zIndex,
        position: 'absolute',
        top: ($(window).height() - object.outerHeight()) / 3 + $(document).scrollTop()
    });
}


function hideObject(object) {
    object.css({
        zIndex: 0,
        display: "none"
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

//注册
function validateAndSubmit() {
    var password = $('#password').val();
    var confirmPassword = $('#password_confirm').val();

    if (password === confirmPassword) {
        // 构建User对象  
        var user = {
            name: $('#username').val(),
            realName: $('#username_real').val(),
            passwd: password,
            gender: $('input[name="gender"]:checked').val(),
            modelID: $('input[name="male_modle"]:checked').val(),
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
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                if (result.code === 0) {
                    alert(result.description);
                    // 注册成功后可以执行一些跳转或其他操作  
                    window.location.href = 'login.html';
                } else {
                    alert(result.description);
                }
            })
            .catch(function (error) {
                console.error('Error:', error);
                alert('注册过程中发生错误，请重试。');
            });
    } else {
        alert("两次输入的密码不匹配，请重试。");
    }
}

//选择性别
function selectGender(gender) {
    $('.maleAvatar').toggle(gender === 'male');
    $('.femaleAvatar').toggle(gender === 'female');
}

function logValidateAndSubmit() {
    var username = $('#username').val();
    var password = $('#password').val();

    $.ajax({
        url: 'http://127.0.0.1:8080/suit/account/login',
        type: 'POST',
        data: JSON.stringify({ name: username, passwd: password }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            if (data.code === 0) {
                alert(data.description);

                // 提取用户信息  
                var user = data.data;
                // 存储用户信息到 sessionStorage  
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                // 注册成功后可以执行一些跳转或其他操作  
                window.location.href = 'index.html';
            } else {
                alert(data.description);
            }
        },
        error: function (error) {
            console.error('Error:', error);
            alert('登录过程中发生错误，请重试。');
        }
    });
}


// //模拟一个登录成功的 result 数据
// function logValidateAndSubmit() {
//         var simulatedSuccessResult = {
//             code: 0,
//             description: "登录成功",
//             data: {
//                 name: "testUser",
//                 gender: "male",
//                 passwd: "hashedPassword",  // 填充模拟的密码，实际应用中应该是加密后的密码
//                 realName: "John Doe",
//                 modelID: "maleAvatar_02",  // 填充模拟的模型ID
//             },
//         };

//         handleLoginResult(simulatedSuccessResult);
// }

// function handleLoginResult(result) {
//     if (result.code === 0) {
//         alert(result.description);
//         var user = result.data;
//         sessionStorage.setItem('loggedInUser', JSON.stringify(user));
//         console.log("User ID:", user.id);
//         console.log("Username:", user.name);
//         console.log("Gender:", user.gender);
//         console.log("Real Name:", user.realName);
//         console.log("Model ID:", user.modelID);
//         window.location.href = 'index.html';
//     } else {
//         alert(result.description);
//     }
// }

function selfFunction() {
    var userNow = $.parseJSON(sessionStorage.getItem('loggedInUser'));
    updateUser(userNow.name);
}


function selfFunctionB(userT = null) {

    // var userFormContainer = document.querySelector('.info_form');
    // userFormContainer.style.display = 'block';
    // // 从 sessionStorage 中获取用户信息
    // var user = JSON.parse(sessionStorage.getItem('loggedInUser'));


    // var userFormContainer = $('.info_form');
    // 使用jQuery的css()方法更改样式
    // userFormContainer.css('display', 'block');
    //隐藏其他页面（可添加多个）
    $('.box-clothes').css('display', 'none');
    //切换显示/隐藏
    $('.info_form').toggle();

    // 使用jQuery的$.parseJSON()方法解析sessionStorage中的用户信息  
    if (userT) {
        var user = $.parseJSON(userT);
    } else {
        var user = $.parseJSON(sessionStorage.getItem('loggedInUser'));
    }

    // 检查用户是否存在
    if (user) {
        // // 插入用户信息到页面中的 userInfoContainer 元素中  
        // $('#info_form').append(userInfoHTML);  
        $('#username').attr("value", user.name);
        $('#username').prop("disabled", true);
        $('#username_real').attr("value", user.realName);
        $('#username_real').prop("disabled", true);
        if (user.gender === 'male') {
            $('#user_male').prop('checked', true);
        } else if (user.gender === 'female') {
            $('#user_female').prop('checked', true);
        }

        if (user.modelID === 'mheadA') {
            $('#mheadA').prop('checked', true);
        } else if (user.modelID === 'mheadB') {
            $('#mheadB').prop('checked', true);
        } else if (user.modelID === 'wheadA') {
            $('#wheadA').prop('checked', true);
        } else if (user.modelID === 'wheadB') {
            $('#wheadB').prop('checked', true);
        }

        // 根据用户的 gender 选择展示模型图片 
        selectGender(user.gender);
    } else {
        // 如果用户信息不存在，可以进行相应的处理，例如跳转到登录页面
        alert('用户信息不存在，请登录。');
        window.location.href = 'login.html';
    }
}

function saveUserInfo(userT = null) {
    // 从页面中获取用户输入的密码和确认密码  
    var password = $('#password').val();
    var confirmPassword = $('#password_confirm').val();

    // 从 sessionStorage 中获取用户信息  
    // var user = JSON.parse($.sessionStorage.getItem('loggedInUser'));  
    if (userT) {
        var user = $.parseJSON(userT);
    } else {
        var user = $.parseJSON(sessionStorage.getItem('loggedInUser'));
    }


    // 构造用户修改后的信息对象  
    var updatedUserInfo = {
        name: user.name,
        realName: user.realName,
        gender: $('input[name="gender"]:checked').val(),
        modelID: $('input[name="male_modle"]:checked').val(),
        // 可根据需要添加其他字段  
    };

    // 如果密码和确认密码都为空，表示用户不打算修改密码  
    if (!password && !confirmPassword) {
        updatedUserInfo.passwd = password;
        alert('用户选择不修改密码');

        var nowUser = $.parseJSON(sessionStorage.getItem('loggedInUser'));
        // 提交数据到后端  
       // 提交数据到后端  
       if (userT.name == nowUser.name) {
        submitData(updatedUserInfo, true, getAllUsers);
    } else {
        submitData(updatedUserInfo, null, getAllUsers);
    }

    } else {
        // 如果用户输入了密码，检查两次输入的密码是否一致  
        if (password === confirmPassword) {
            // 更新密码字段  
            updatedUserInfo.passwd = password;

            // 提示密码修改成功  
            alert('信息修改成功');

            var nowUser = $.parseJSON(sessionStorage.getItem('loggedInUser'));
            // 提交数据到后端  
            if (userT.name == nowUser.name) {
                submitData(updatedUserInfo, true, getAllUsers);
            } else {
                submitData(updatedUserInfo, null, getAllUsers);
            }
        } else {
            alert('两次输入的密码不一致，请重新输入');
        }
    }
}





// 提交数据到后端的函数  
// function submitData(updatedUserInfo, state) {
//     $.ajax({
//         url: 'http://127.0.0.1:8080/suit/account/update',
//         type: 'POST',
//         data: JSON.stringify(updatedUserInfo),
//         contentType: 'application/json',
//     })
//         .done(function (response) {
//             // 处理后端返回的结果  
//             if (response.code === 0) {
//                 // 可以在这里执行一些成功后的操作  
//                 // 存储用户信息到 sessionStorage  
//                 // 获取当前存储在 sessionStorage 中的用户信息  
//                 var currentStoredUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
//                 // 更新用户信息  
//                 // 将后端返回的新用户信息合并到当前用户信息中  
//                 var updatedUser = Object.assign({}, currentStoredUser, response.data);
//                 // 存储更新后的用户信息到 sessionStorage  
//                 if (state) {
//                     sessionStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
//                     console.log("当前用户已更新！！！")
//                 }
//                 // 输出更新后的用户信息到控制台（实际应用中根据需求进行操作）  
//                 console.log("Updated Username:", updatedUser.username);
//                 console.log("Updated Gender:", updatedUser.gender);
//                 console.log("Updated Real Name:", updatedUser.realName);
//                 console.log("Updated Model ID:", updatedUser.modelID);

//             } else {
//                 alert(response.description);
//             }
//         })
//         .fail(function (errorThrown) {
//             console.error('Error:', errorThrown);
//             alert('保存信息过程中发生错误，请重试。');
//         });
// }

function submitData(updatedUserInfo, state, callback) {
    $.ajax({
        url: 'http://127.0.0.1:8080/suit/account/update',
        type: 'POST',
        data: JSON.stringify(updatedUserInfo),
        contentType: 'application/json',
    })
        .done(function (response) {
            // 处理后端返回的结果  
            if (response.code === 0) {
                // 可以在这里执行一些成功后的操作  
                // 存储用户信息到 sessionStorage  
                // 获取当前存储在 sessionStorage 中的用户信息  
                var currentStoredUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
                // 更新用户信息  
                // 将后端返回的新用户信息合并到当前用户信息中  
                var updatedUser = Object.assign({}, currentStoredUser, response.data);
                // 存储更新后的用户信息到 sessionStorage  
                if (state) {
                    sessionStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
                    console.log("当前用户已更新！！！")
                }
                // 输出更新后的用户信息到控制台（实际应用中根据需求进行操作）  
                console.log("Updated Username:", updatedUser.username);
                console.log("Updated Gender:", updatedUser.gender);
                console.log("Updated Real Name:", updatedUser.realName);
                console.log("Updated Model ID:", updatedUser.modelID);

                // 调用传入的回调函数
                if (typeof callback === 'function') {
                    callback();
                }
            } else {
                alert(response.description);
            }
        })
        .fail(function (errorThrown) {
            console.error('Error:', errorThrown);
            alert('保存信息过程中发生错误，请重试。');
        });
}



$(document).ready(function () {
    $('.btn_close').on('click', function (event) {
        event.preventDefault();
        // 移除之前绑定的点击事件处理程序
        $(".btn_save").removeAttr('onclick'); // 移除原始的onclick属性
        $(".btn_save").off('click'); // 移除之前的点击事件处理程序
        console.log("清除绑定成功close");
        $(".btn_save").on('click', function () {
            saveUserInfo();
        });
        console.log("Close button clicked");
        $('.info_form').hide();
        // 可以继续执行其他操作
    });
});




function userManage(temp_user) {
    // var table = $('#user_table');  
    // if (table.style.display === 'none') {  
    //     table.css('display', 'block'); 
    //     // table.style.display = 'block';  
    // } else {  
    //     table.css('display', 'none'); 
    //     // table.style.display = 'none';  
    // }

    var user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    console.log(user);
    if (user.identity != 1) {
        alert('您不是管理员，无法获取用户数据。');
        return;
    }
    //显示隐藏表格
    $('.box-user_table').toggle();
    getAllUsers();
}

// function chooseModelImg(modelID) {
//     switch (modelID) {
//         case "maleAvatar_01":

//     }
// }


//获取所有用户信息
// function getAllUsers() {
//     $.ajax({
//         url: 'http://127.0.0.1:8080/suit/account/getAll',
//         type: 'POST',
//         dataType: 'json',
//         success: function (data) {
//             console.log(data);
//             // 更新表格数据  
//             var table = $('#user_table');
//             table.empty(); // 清空表格
//             var row = $('<tr>').appendTo(table);
//             row.append($('<th>').text('id'));
//             row.append($('<th>').text('用户名称'));
//             row.append($('<th>').text('用户实名'));
//             row.append($('<th>').text('性别'));
//             row.append($('<th>').text('模型选择'));
//             row.append($('<th>').text('是否为管理员'));
//             row.append($('<th>').text('操作'));
//             data.data.forEach(function (user, index) {
//                 console.log('User ' + index + ': ' + JSON.stringify(user));
//                 var row = $('<tr>').appendTo(table);
//                 row.append($('<td>').text(user.id));
//                 row.append($('<td>').text(user.name));
//                 row.append($('<td>').text(user.realName));
//                 row.append($('<td>').text(user.gender));
//                 // row.append($('<td>').text(user.modelID)); 
//                 row.append($('<td>').html('<img src="../images/data/model/' + user.modelID + '.png" alt="Model Image">'));
//                 // var temp_img = $('table td').find('img');
//                 // temp_img.css('height', '30px');
//                 row.append($('<td>').text(user.identity == 1 ? '是' : '否'));
//                 row.append($('<td>').html('<button onclick="updateUser(' + "'" + user.name + "'" + ')">修改</button> <button onclick="deleteUser(' + "'" + user.name + "'" + ')">删除</button>'));
//             });
//         },
//         error: function (error) {
//             console.log(error);
//         }
//     });
// }

function getAllUsers() {
    $.ajax({
        url: 'http://127.0.0.1:8080/suit/account/getAll',
        type: 'POST',
        dataType: 'json',

        success: function (data) {
            console.log(data);
            // 更新表格数据  
            var table = $('#user_table');
            table.empty(); // 清空表格
            var row = $('<tr>').appendTo(table);
            row.append($('<th>').text('id'));
            row.append($('<th>').text('用户名称'));
            row.append($('<th>').text('用户实名'));
            row.append($('<th>').text('性别'));
            row.append($('<th>').text('模型选择'));
            row.append($('<th>').text('是否为管理员'));
            row.append($('<th>').text('操作'));
            data.data.forEach(function (user, index) {
                console.log('User ' + index + ': ' + JSON.stringify(user));
                var row = $('<tr>').appendTo(table);
                row.append($('<td>').text(user.id));
                row.append($('<td>').text(user.name));
                row.append($('<td>').text(user.realName));
                row.append($('<td>').text(user.gender));
                // row.append($('<td>').text(user.modelID)); 
                row.append($('<td>').html('<img src="../images/data/model/' + user.modelID + '.png" alt="Model Image">'));
                // var temp_img = $('table td').find('img');
                // temp_img.css('height', '30px');
                row.append($('<td>').text(user.identity == 1 ? '是' : '否'));
                row.append($('<td>').html('<button onclick="updateUser(' + "'" + user.name + "'" + ')">修改</button> <button onclick="deleteUser(' + "'" + user.name + "'" + ')">删除</button>'));
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}





// 更新用户数据  
function updateUser(name) {
    $.ajax({
        url: 'http://127.0.0.1:8080/suit/account/getSingleUser',
        type: 'POST',
        data: JSON.stringify({ name: name }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            if (data.code === 0) {
                // 获取用户信息
                var user = data.data;
                // 显示用户信息表单
                selfFunctionB(JSON.stringify(user));
                $(document).ready(function () {
                    //                    $(".btn_save").attr("onclick", "saveUserInfo('" + JSON.stringify(user) + "')");
                    $(".btn_save").removeAttr('onclick'); // 移除原始的onclick属性
                    $(".btn_save").off('click'); // 移除之前的点击事件处理程序
                    console.log("清除绑定成功xiugai");
                    $(".btn_save").on('click', function () {
                        saveUserInfo(JSON.stringify(user));
                    });
                });
            } else {
                alert(data.description);
            }
        },
        error: function (error) {
            console.error('Error:', error);
            alert('获取用户信息时出错');
        }
    });
}


// 删除用户数据  
function deleteUser(name) {
    var result = confirm("您确认要删除用户名为 " + name + " 的信息吗?");
    if (!result) {
        // 如果用户点击了"取消"，则不执行任何操作  
        return;
    }

    $.ajax({
        url: 'http://127.0.0.1:8080/suit/account/remove',
        type: 'POST',
        data: JSON.stringify({ name: name }),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            // 如果删除成功，更新表格  
            console.log(data);
            getAllUsers();
        },
        error: function (error) {
            console.log(error);
            alert('删除用户信息时出错');
        }
    });

}

function clothesManage(temp_user) {
    var user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    console.log(user);
    if (user.identity != 1) {
        alert('您不是管理员，无法获取用户数据。');
        return;
    }
    //显示隐藏服饰界面
    $('.box-clothes').toggle();
    getAllclothes();
}


// 添加服饰函数
function addClothes() {
    // 从页面中获取用户输入的服饰编号和名称
    var clothId = $('#clothId').val();
    var clothName = $('#clothName').val();

    // 构造用户修改后的信息对象  
    var addACloth = {
        clothCategoryID: clothId,
        clothCategoryName: clothName,
        // 可根据需要添加其他字段  
    };

    // 如果输入都不为空 
    if (clothId && clothName) {
        // 提交数据到后端，并在提交完成后执行获取所有服饰信息
        submitClothesData(addACloth, getAllclothes);
    } else {
        alert('未输入服饰完整信息！请重新输入')
    }
}

// 提交数据到后端的函数，接受一个回调函数作为参数
function submitClothesData(addACloth, callback) {
    console.log("开始submit！！！!!");
    $.ajax({
        url: 'http://127.0.0.1:8080/suit/clothCategory/add',
        type: 'POST',
        data: JSON.stringify(addACloth),
        contentType: 'application/json',
    })
        .done(function (response) {
            // 处理后端返回的结果  
            if (response.code === 0) {
                // 调用传入的回调函数
                if (typeof callback === 'function') {
                    callback();
                }
            } else {
                alert(response.description);
            }
        })
        .fail(function (errorThrown) {
            console.error('Error:', errorThrown);
            alert('提交信息过程中发生错误，请重试。');
        });
}

// 获取所有服饰信息
function getAllclothes() {
    console.log("开始getall！！！");
    $.ajax({
        url: 'http://127.0.0.1:8080/suit/clothCategory/getAll',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            // 更新服饰页面数据
            var clothesBox = $('#box-clothes');
            clothesBox.empty(); // 清空界面
            var row = $('<div>').addClass('clothes').attr('id', 'add-clothes').appendTo(clothesBox);
            row.append($('<div>').text('服饰类别').addClass('clothes-head'));
            row.append($('<span>').text('编号：'));
            row.append($('<input>').attr('type', 'text').attr('id', 'clothId'));
            row.append($('<br>'));
            row.append($('<span>').text('名称：'));
            row.append($('<input>').attr('type', 'text').attr('id', 'clothName'));
            row.append($('<div>').addClass('clothes-head').html('<button id="add-cls-btn" class="btn-clothes" onclick="addClothes()">添加</button>'));

            data.data.forEach(function (cloth, index) {
                var row = $('<div>').addClass('clothes').appendTo(clothesBox);
                row.append($('<input>').addClass('clothHideId').attr('type', 'text').val(cloth.id).css('display', 'none'))
                row.append($('<div>').text('服饰类别').addClass('clothes-head'));
                row.append($('<span>').text('编号：'));
                // row.append($('<span>').text(cloth.clothCategoryID));
                row.append($('<input>').addClass('biaohao').attr('type', 'text').val(cloth.clothCategoryID))
                row.append($('<br>'));
                row.append($('<span>').text('名称：'));
                row.append($('<input>').addClass('mingcheng').attr('type', 'text').val(cloth.clothCategoryName))
                row.append($('<div>').addClass('clothes-head').html('<button class="btn-clothes" onclick="saveClothes(' + "'" + cloth.id + "'" + ')">保存</button><button class="btn-clothes" onclick="delClothes(' + "'" + cloth + "'" + ')">删除</button>'));
                console.log('Cloth ' + index + ': ' + JSON.stringify(cloth));
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}


//保存服饰函数
function saveClothes(id) {
    // 从页面中获取用户输入的服饰编号和名称
    var clothId = $('#' + id + '~ .bianhao').val();
    var clothName = $('#' + id + '~ .mingcheng').val();


    // 构造用户修改后的信息对象  
    var saveACloth = {
        id: id,
        clothCategoryID: clothId,
        clothCategoryName: clothName,
        // 可根据需要添加其他字段  
    };

    // 如果输入都不为空
    if (clothId && clothName) {
        // 提交数据到后端
        submitClothesData(saveACloth);
        getAllclothes();
    } else {
        alert('服饰信息不完整！请重新输入')
    }
}



//删除服饰函数 
function delClothes(cloth) {
    var result = confirm("您确认要删除编号为" + cloth.clothCategoryID + " 的信息吗?");
    if (!result) {
        // 如果用户点击了"取消"，则不执行任何操作  
        return;
    }
    $.ajax({
        url: 'http://127.0.0.1:8080/suit/clothCategory/getSingleClothCategory',
        type: 'POST',
        data: JSON.stringify({ clothCategoryID: clothCategoryID }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            if (data.code === 0) {
                // 获取用户信息
                var aCloth = data.data;
                $.ajax({
                    url: 'http://127.0.0.1:8080/suit/clothCategory/remove',
                    type: 'POST',
                    data: JSON.stringify(aCloth),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        // 如果删除成功，更新表格  
                        getAllclothes();
                        // 显示后端返回的消息
                        alert(data.description);
                    },
                    error: function (error) {
                        console.log(error);
                        alert('删除服饰信息时出错');
                    }
                });
            } else {
                alert(data.description);
            }
        },
        error: function (error) {
            console.error('Error:', error);
            alert('获取用户信息时出错');
        }
    });
}


// 服饰管理页面——导航条
function setClothesManage() {
   
    var user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    console.log(user);
    if (user.identity != 1) {
        alert('您不是管理员，无法获取用户数据。');
        return;
    }
    //隐藏其他页面（可添加多个）
    $('.box-user_table').css('display', 'none');
    $('.box-clothes').css('display', 'none');
    $('.info_form').css('display', 'none');
    //显示隐藏表格
    $('.box-clothes-manage').toggle();
    $.ajax({
        url: 'http://127.0.0.1:8080/suit/clothCategory/getAll',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            console.log(data.data[0].clothCategoryName);
            console.log("!!!!!!!!!!!!!!!!!!!!!!");
            
            console.log(data.data);
            searchSetClothes('male', data.data[0].clothCategoryName, data.data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}



function searchSetClothes(clothGender, clothCategoryName, allClothesData = null) {
    console.log(clothGender);
    //获取服饰类别
    

    var selectData = $('#select-clothes');
    selectData.empty(); // 清空界面


    allClothesData.forEach(function (cloth, index) {
        // $('<option>').val(cloth.clothCategoryName).appendTo(selectData).text(cloth.clothCategoryName);
        selectData.append($('<option>').val(cloth.clothCategoryName).text(cloth.clothCategoryName));
        console.log('Cloth ' + index + ': ' + JSON.stringify(cloth));
    });

    $('#select-clothes').val(clothCategoryName);
    $('#select-gender').val(clothGender);
    

    // 更新服饰页面数据
    var itemChothBox = $('.content-clothes');
    // var setClothBox = $('.clothes-navbar');
    itemChothBox.empty(); // 清空界面
   


     // 加载添加界面
     var addClothitemBox = $('<div>').addClass('box-addClothes').appendTo(itemChothBox);
     addClothitemBox.append($('<span>').addClass('box-addClothes-header').text('服饰细目'));
     var showClothesData = $('<div>').addClass('show-clothesData').appendTo(addClothitemBox);

     var boxSetClothesData1 = $('<div>').addClass('box-setClothesData').appendTo(showClothesData);
     $('<span>').appendTo(boxSetClothesData1).text('编号：');
     $('<input>').attr('type', 'text').attr('name', 'cloth-ref').addClass('cloth-input').appendTo(boxSetClothesData1);
     
     var boxSetClothesData2 = $('<div>').addClass('box-setClothesData').appendTo(showClothesData);
     $('<span>').appendTo(boxSetClothesData2).text('名称：');
     $('<input>').attr('type','text').attr('name','cloth-name').addClass('cloth-input').appendTo(boxSetClothesData2);

     var boxSetClothesData3 = $('<div>').addClass('box-setClothesData').appendTo(showClothesData);
     $('<span>').appendTo(boxSetClothesData3).text('价格：');
     $('<input>').attr('type','text').attr('name','cloth-price').addClass('cloth-input').appendTo(boxSetClothesData3);

     var boxSetClothesData4 = $('<div>').addClass('box-setClothesData').appendTo(showClothesData);
     $('<span>').appendTo(boxSetClothesData4).text('性别：');
     var clothGenderT = $('<select>').attr('name','cloth-gender').addClass('cloth-gender').appendTo(boxSetClothesData4);
     $('<option>').attr('value', 'male').text('男').appendTo(clothGenderT);
     $('<option>').attr('value', 'female').text('女').appendTo(clothGenderT);
     
     var boxSetClothesData5 = $('<div>').addClass('box-setClothesData').appendTo(showClothesData);
     $('<span>').appendTo(boxSetClothesData5).text('分类：');
     var clothSort = $('<select>').attr('name','cloth-sort').addClass('cloth-sort').appendTo(boxSetClothesData5);
     allClothesData.forEach(function (cloth, index) {
        clothSort.append($('<option>').val(cloth.clothCategoryName).text(cloth.clothCategoryName));
        console.log('Cloth ' + index + ': ' + JSON.stringify(cloth));
     });

     var boxClothManageBtn = $('<div>').appendTo(addClothitemBox).addClass('box-clothManage-btn');
     $('<button>').attr('id','clothManageAdd-btn').attr('onclick','addTheClothes()').addClass('clothManage-btn').appendTo(boxClothManageBtn).text('添加');
    $.ajax({
        url: 'http://127.0.0.1:8080/suit/cloth/search',
        type: 'POST',
        data: JSON.stringify({
            clothGender: clothGender,
            clothCategoryName:clothCategoryName
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            // 加载服饰主页面

            //服饰细目展示
            data.data.forEach(function (item, index) {

                var showClothitemBox = $('<div>').addClass('box-showClothes').attr('id',item.id).appendTo(itemChothBox);
                showClothitemBox.append($('<span>').addClass('box-showClothes-header').text('服饰细目'));
                var showClothesData = $('<div>').addClass('show-clothesData').appendTo(showClothitemBox);
                var boxSetClothesData1 = $('<div>').addClass('box-setClothesData').appendTo(showClothesData);
                $('<span>').appendTo(boxSetClothesData1).text('编号：');
                $('<input>').attr('type', 'text').attr('name', 'cloth-ref').addClass('cloth-input').attr('value','' + item.clothID).appendTo(boxSetClothesData1);
                
                var boxSetClothesData2 = $('<div>').addClass('box-setClothesData').appendTo(showClothesData);
                $('<span>').appendTo(boxSetClothesData2).text('名称：');
                $('<input>').attr('type','text').attr('name','cloth-name').addClass('cloth-input').attr('value','' + item.clothName).appendTo(boxSetClothesData2);

                var boxSetClothesData3 = $('<div>').addClass('box-setClothesData').appendTo(showClothesData);
                $('<span>').appendTo(boxSetClothesData3).text('价格：');
                $('<input>').attr('type','text').attr('name','cloth-price').addClass('cloth-input').attr('value','' + item.clothPrice).appendTo(boxSetClothesData3);

                var boxSetClothesData4 = $('<div>').addClass('box-setClothesData').appendTo(showClothesData);
                $('<span>').appendTo(boxSetClothesData4).text('性别：');
                var clothGenderT = $('<select>').attr('name','cloth-gender').addClass('cloth-gender').appendTo(boxSetClothesData4);
                $('<option>').attr('value', 'male').text('男').appendTo(clothGenderT);
                $('<option>').attr('value', 'female').text('女').appendTo(clothGenderT);
                clothGenderT.val(item.clothGender);
                
                var boxSetClothesData5 = $('<div>').addClass('box-setClothesData').appendTo(showClothesData);
                $('<span>').appendTo(boxSetClothesData5).text('分类：');
                var clothSort = $('<select>').attr('name','cloth-sort').addClass('cloth-sort').val(item.clothCategoryName).appendTo(boxSetClothesData5);
                allClothesData.forEach(function (cloth, index) {
                    clothSort.append($('<option>').text(cloth.clothCategoryName));
                    console.log('Cloth ' + index + ': ' + JSON.stringify(cloth));

                });
                clothSort.val(item.clothCategoryName);

                //插入图片
                var showClothesDImg = $('<div>').addClass('box-clothImg').appendTo(showClothitemBox);
                $('<input>').attr('type','file').attr('id','fileInput'+item.id).attr('accept','image/*').css({'display': 'none'}).appendTo(showClothesDImg);
                $('<div>').attr('id','fileInputText'+item.id).addClass('heard-clothImg').appendTo(showClothesDImg).text('点击添加图片').attr('onclick','addTheClothesImg(' + "'" + item.clothID + "'" + ')');
                var imgCloth = $('<div>').addClass('img-cloth').appendTo(showClothesDImg);
                $('<img>').attr('id','thisClothImg'+item.id).attr('src','../images/data/suits/' + item.clothImageName).attr('data-name','cltPic').attr('data-value', '' + item.clothImageName).appendTo(imgCloth);


                var boxClothManageBtn = $('<div>').addClass('box-clothManage-btn').appendTo(showClothitemBox);
                
                $('<button>').addClass('clothManage-btn').attr('onclick', 'saveTheClothes(' + "'" + item.id + "'" + ')').appendTo(boxClothManageBtn).text('保存');
                $('<button>').addClass('clothManage-btn').attr('onclick', 'delTheClothes(' + "'" + item.clothID + "'" + ')').appendTo(boxClothManageBtn).text('删除');
                console.log('Cloth ' + index + ': ' + JSON.stringify(item));       
                });
        },
        error: function (error) {
            console.log(error);
        }
    });
}


//查询按钮
$(document).ready(function () {
    $('#btn-clothes-navbar').on('click', function () {
            searchTheClothes();
    });
});

function searchTheClothes() {
    var clothGender = $('#select-gender').val();
    var clothCategoryName = $('#select-clothes').val();
    $.ajax({
        url: 'http://127.0.0.1:8080/suit/clothCategory/getAll',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            searchSetClothes(clothGender, clothCategoryName, data.data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// 添加按钮
// $(document).ready(function () {
//     $('#clothManageAdd-btn').on('click', function () {
//         console.log('bangdingshijian!!!!');
//         addTheClothes();
//     });
// });

function addTheClothes() {
    
    // 从页面中获取用户输入的服饰编号和名称
    var clothID = $('.show-clothesData .box-setClothesData:nth-of-type(1) input').val();
    var clothName = $('.box-addClothes .show-clothesData .box-setClothesData:nth-of-type(2) input').val();
    var clothPrice = $('.box-addClothes .show-clothesData .box-setClothesData:nth-of-type(3) input').val();
    var clothGender = $('.box-addClothes .show-clothesData .box-setClothesData:nth-of-type(4) select').val();
    var clothCategoryName = $('.box-addClothes .show-clothesData .box-setClothesData:nth-of-type(5) select').val();



    // 构造用户修改后的信息对象  
    var addTheCloth = {
        clothID: clothID,
        clothName: clothName,
        clothPrice: clothPrice,
        clothGender: clothGender,
        clothCategoryName: clothCategoryName,
        clothImageName: 'default.png'
        // 可根据需要添加其他字段  
    };

    // 如果输入都不为空 
    if (clothID && clothName && clothID && clothGender && clothCategoryName) {
        // 提交数据到后端，并在提交完成后执行获取所有服饰信息
        submitSetClothesData(addTheCloth, searchTheClothes);
    } else {
        alert('输入信息不完整！请重新输入')
    }
}

function submitSetClothesData(addTheCloth, callback) {
    $.ajax({
        url: 'http://127.0.0.1:8080/suit/cloth/add',
        type: 'POST',
        data: JSON.stringify(addTheCloth),
        contentType: 'application/json',
    })
        .done(function (response) {
            // 处理后端返回的结果
            if (response.code === 0) {
                // 调用传入的回调函数
                if (typeof callback === 'function') {
                    callback();
                }
            }
            // 显示后端返回的消息
            alert(response.description);
        })
        .fail(function (errorThrown) {
            console.error('Error:', errorThrown);
            alert('提交信息过程中发生错误，请重试。');
        });
}

// 保存按钮
// $(document).ready(function () {
//     $('.box-clothManage-btn button:nth-of-type(1)').on('click', function () {
//             saveTheClothes();
//     });
// });

function saveTheClothes(id) {
    // 从页面中获取用户输入的服饰编号和名称
    var clothID = $('#' + id +' .show-clothesData .box-setClothesData:nth-of-type(1) input').val();
    var clothName = $('#' + id +' .show-clothesData .box-setClothesData:nth-of-type(2) input').val();
    var clothPrice = $('#' + id +' .show-clothesData .box-setClothesData:nth-of-type(3) input').val();
    var clothGender = $('#' + id +' .show-clothesData .box-setClothesData:nth-of-type(4) select').val();
    var clothCategoryName = $('#' + id +' .show-clothesData .box-setClothesData:nth-of-type(5) select').val();
    var clothImageName = $('#' + id +' .box-clothImg .img-cloth img').data('value');
    console.log('保存时的图片名称是' + clothImageName);
    
    
    
    // 构造用户修改后的信息对象  
     var saveTheCloth = {
        id: id,
        clothID: clothID,
        clothName: clothName,
        clothPrice: clothPrice,
        clothGender: clothGender,
        clothCategoryName: clothCategoryName,
        clothImageName: clothImageName,
        // 可根据需要添加其他字段  
    };

        // 如果输入都不为空 
        if (clothID && clothName && clothID && clothGender && clothCategoryName) {
            // 提交数据到后端，并在提交完成后执行获取所有服饰信息
            submitSaveClothesData(saveTheCloth, searchTheClothes);
        } else {
            alert('输入信息不完整！请重新输入');
        }
}

function submitSaveClothesData(saveTheCloth, callback) {
    $.ajax({
        url: 'http://127.0.0.1:8080/suit/cloth/update',
        type: 'POST',
        data: JSON.stringify(saveTheCloth),
        contentType: 'application/json',
    })
        .done(function (response) {
            // 处理后端返回的结果
            if (response.code === 0) {
                // 调用传入的回调函数
                if (typeof callback === 'function') {
                    callback();
                }
            }
            // 显示后端返回的消息
            alert(response.description);
        })
        .fail(function (errorThrown) {
            console.error('Error:', errorThrown);
            alert('提交信息过程中发生错误，请重试。');
        });
}


// 删除按钮
function delTheClothes(clothID) {
    var result = confirm("您确认要删除编号为" + clothID + " 的信息吗?");
    if (!result) {
        // 如果用户点击了"取消"，则不执行任何操作  
        return;
    }
    $.ajax({
        url: 'http://127.0.0.1:8080/suit/cloth/getSingle',
        type: 'POST',
        data: JSON.stringify({ clothID: clothID }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            if (data.code === 0) {
                // 获取用户信息
                var aDelCloth = data.data;
                $.ajax({
                    url: 'http://127.0.0.1:8080/suit/cloth/remove',
                    type: 'POST',
                    data: JSON.stringify(aDelCloth),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        // 如果删除成功，更新表格  
                        searchTheClothes();
                        // 显示后端返回的消息
                        alert(data.description);
                    },
                    error: function (error) {
                        console.log(error);
                        alert('删除服饰信息时出错');
                    }
                });
            } else {
                alert(data.description);
            }
        },
        error: function (error) {
            console.error('Error:', error);
            alert('获取用户信息时出错');
        }
    });
}

//添加图片
function addTheClothesImg(clothID) {
    $.ajax({
        url: 'http://127.0.0.1:8080/suit/cloth/getSingle',
        type: 'POST',
        data: JSON.stringify({ clothID: clothID }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            if (data.code === 0) {
                // 获取用户信息
                var aClothImg = data.data;
                // $(document).ready(function () {
                    // $('#fileInputText'+aClothImg.id).on('click', function () {
                        // 触发文件选择
                $('#fileInput'+aClothImg.id).click();
                    // });
            
                    // 文件输入框变化事件
                $('#fileInput'+aClothImg.id).on('change', function () {
                      var fileInput = this;
                      var file = fileInput.files[0];
            
                       if (file) {
                            var formData = new FormData();
                            formData.append('image', file);
                            formData.append('id', aClothImg.id);
            
                            $.ajax({
                                url: 'http://127.0.0.1:8080/suit/cloth/uploadClothImage', // 替换成实际的上传接口
                                type: 'POST',
                                data: formData,
                                processData: false,
                                contentType: false,
                                success: function (data) {
                                    // 上传成功的处理逻辑
                                    $('#thisClothImg'+aClothImg.id).attr('src', '../images/data/suits/' + data.data).attr('data-value', '' + data.data);
                                    console.log('上传成功后把clothImageName修改为' + data.data);
                                    alert(data.description);
                                },
                                error: function (data) {
                                    // 上传失败的处理逻辑
                                    alert(data.description);
                                }
                            });
                        }
                    });
                
            } else {
                alert(data.description);
            }
        },
        error: function (error) {
            console.error('Error:', error);
            alert('获取用户信息时出错');
        }
    });
}

// 退出
function logout(){
    var result = confirm("您确定退出吗？");
    if (!result) {
        // 如果用户点击了"取消"，则不执行任何操作  
        return;
    }
    window.location.href = 'login.html';  
}