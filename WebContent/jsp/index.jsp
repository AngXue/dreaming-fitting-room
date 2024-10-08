<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + 
                                      request.getServerName() + ":" +
                                      request.getServerPort() + path;
%> 
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>梦想试衣间</title>
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/fitting.css">
    <script src="../js/jquery-3.3.1.js"></script>
    <script src="../js/index.js"></script>
    <script src="../js/fitting.js"></script>
    <script src="../js/wk.js"></script>
</head>

<body class="wk_body">
    <div class="banner">
        <span class="user_now_prompt">当前用户：<span id="loggedInUsername" class="user_now"></span></span>
        <span class="log"></span>
    </div>

    <div class="mbody">
        <div class="mbody_left">
            <ul>
                <li>
                    <button onclick="selfFunction()">
                        <img src="../images/ui/head.png">
                    </button>
                </li>
                <li>
                    <button onclick="userManage()">
                        <img src="../images/ui/table.png">
                    </button>
                </li>
                <li>
                    <button onclick="clothesManage()">
                        <img src="../images/ui/catalog.png">
                    </button>
                </li>
                <li>
                    <button onclick="setClothesManage()">
                        <img src="../images/ui/home_service_ui_norm.png">
                    </button>
                </li>
                <li>
                    <button >
                        <a href="./fitting.jsp">
                            <img src="../images/ui/shoes.png">
                        </a>
                    </button>
                </li>
                <li>
                    <button onclick="logout()">
                        <img src="../images/ui/logout.png">
                    </button>
                </li>
            </ul>
        </div>
        <div class="mbody_right">
            <!-- 第一个表单管理 -->
            <form class="info_form" id="info_form">
                <button class="btn_close"><img src="../images/ui/close.png" alt=""></button>
                <h2>用户信息</h2>
                <label class="gender_prompt" for="username">用户名称：</label>
                <input type="text" id="username" name="username" maxlength="20" value="${user.name}" disabled><br>

                <label class="gender_prompt" for="username_real">用户实名：</label>
                <input type="text" id="username_real" name="username_real" value="${user.realName}" maxlength="20"
                    disabled><br>

                <label class="gender_prompt" for="password">密码：</label>
                <input type="password" id="password" name="password" placeholder="tips:密码如果不需要修改本项留空" minlength="6"
                    maxlength="20"><br>

                <label class="gender_prompt" for="password_confirm">密码确认：</label>
                <input type="password" id="password_confirm" name="password_confirm"
                    placeholder="tips:密码如果不需要修改本项留空"><br>

                <label class="gender_prompt">性别：</label>
                <span class="gender_box">
                    <label class="gender-label" onclick="selectGender('male')">
                        <input type="radio" name="gender" id="user_male" value="male">
                        男
                    </label>

                    <label class="gender-label" onclick="selectGender('female')">
                        <input type="radio" name="gender" id="user_female" value="female">
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
                            <input type="radio" class="img_radio" name="male_modle" id="mheadA"
                                value="mheadA">
                            <img src="../images/data/model/mheadA.png" class="img_avatar">
                        </label>
                        <label>
                            <input type="radio" class="img_radio" name="male_modle" id="mheadB"
                                value="mheadB">
                            <img src="../images/data/model/mheadB.png" class="img_avatar">
                        </label>
                    </div>
                    <div class="femaleAvatar">
                        <label>
                            <input type="radio" class="img_radio" name="male_modle" id="wheadA"
                                value="wheadA">
                            <img src="../images/data/model/wheadA.png" class="img_avatar">
                        </label>
                        <label>
                            <input type="radio" class="img_radio" name="male_modle" id="wheadB"
                                value="wheadB">
                            <img src="../images/data/model/wheadB.png" class="img_avatar">
                        </label>
                    </div>
                </div>
                <div class="footer_rgs">
                    <button type="button" class="btn_save" onclick="saveUserInfo()">保存信息</button><br>
                </div>
            </form>
            <!-- 用户信息管理 -->
            <div class="box-user_table">
                <table id="user_table" class="user_table"></table>
            </div>

            <!-- 服饰类别管理 -->
            <div class="box-clothes" id="box-clothes">
            </div>

            <!-- 服饰管理页面 -->
            <div class="box-clothes-manage">
                <!-- 导航条 -->
                <div class="clothes-navbar">
                    <span>性别：</span>
                    <select name="select-gender" id="select-gender">
                        <option value="male">男</option>
                        <option value="female">女</option>
                    </select>
                    <span>服饰类别：</span>
                    <select name="select-clothes" id="select-clothes">
                    </select>
                    <button id="btn-clothes-navbar">查询</button>
                </div>
                <!-- 服饰主页面 -->
                <div class="content-clothes">
                </div>
            </div>

        </div>
    </div>
</body>

</html>