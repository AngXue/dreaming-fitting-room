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
    <title>用户登录界面</title>
    <link rel="stylesheet" href="../css/main.css">
    <script src="../js/jquery-3.3.1.js"></script>
    <script src="../js/index.js"></script>
    <script src="../js/loginKeyboard.js"></script>
</head>
<body class="l_body">
    <div class="login-container">
        <h2>Fitting Room Login</h2>
        <form id="login_form">
            <input type="text" id="username" name="username" placeholder="用户名" maxlength="20" required><br>

            <input type="password" id="password" name="password" placeholder="密码" minlength="6" maxlength="20" required><br>

            <button type="button" class="btn_login" id="btn_login" onclick="logValidateAndSubmit()">登录</button><br>
            <span class="footer_login">
                <div class="footer_left">
                    <!-- <button id="login_lost_btn" type="button" class="btn btn-link">忘记密码</button> -->
                </div>
                <div class="footer_right">
                    <button type="button" class="btn btn-link"><a href="register.jsp">注册</a></button>
                </div>
            </span>
        </form>
    </div>
</body>
</html>
</html>