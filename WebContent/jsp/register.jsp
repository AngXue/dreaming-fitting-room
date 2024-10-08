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
    <title>用户注册界面</title>
    <link rel="stylesheet" href="../css/main.css">
    <script src="../js/jquery-3.3.1.js"></script>
    <script src="../js/index.js"></script>
    <script src="../js/registerKeyboard.js"></script>
</head>

<body class="l_body">
    <div class="register-container">
        <h2>Fitting Room Regiser</h2>
        <form id="register_form">
            <label class="gender_prompt" for="username">用户名称：</label>
            <input type="text" id="username" name="username" placeholder="请输入用户名称" maxlength="20" required><br>

            <label class="gender_prompt" for="username_real">用户实名：</label>
            <input type="text" id="username_real" name="username_real" placeholder="请输入用户实名" maxlength="20"
                required><br>

            <label class="gender_prompt" for="password">密码：</label>
            <input type="password" id="password" name="password" placeholder="请输入密码" minlength="6" maxlength="20"
                required><br>

            <label class="gender_prompt" for="password_confirm">密码确认：</label>
            <input type="password" id="password_confirm" name="password_confirm" placeholder="请再次输入密码" required><br>

            <label class="gender_prompt">性别：</label>
            <span class="gender_box">
                <label class="gender-label" onclick="selectGender('male')">
                    <input type="radio" name="gender" id="male" value="male">
                    男
                </label>

                <label class="gender-label" onclick="selectGender('female')">
                    <input type="radio" name="gender" id="female" value="female">
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
                <button type="button" class="btn_register" id="btn_register"
                    onclick="validateAndSubmit()">立即注册</button><br>
                <span class="footer_register">
                    <div class="footer_left">
                        <!-- <button id="login_lost_btn" type="button" class="btn btn-link"></button> -->
                    </div>
                    <div class="footer_right">
                        <button id="login_login_btn" type="button" class="btn btn-link"><a
                                href="login.jsp">返回登录</a></button>
                    </div>
                </span>
            </div>
        </form>
    </div>
</body>

</html>