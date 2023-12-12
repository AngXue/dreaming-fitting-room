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
    <script src="../js/jquery-3.3.1.js"></script>
    <script src="../js/index.js"></script>
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
                    <button onclick="myFunction()">
                        <img src="../images/ui/table.png">
                    </button>  
                </li>
                <li>
                    <button onclick="myFunction()">
                        <img src="../images/ui/catalog.png">
                    </button>  
                </li>
                <li>
                    <button onclick="myFunction()">
                        <img src="../images/ui/home_service_ui_norm.png">
                    </button>  
                </li>
                <li>
                    <button onclick="myFunction()">
                        <img src="../images/ui/shoes.png">
                    </button>  
                </li>
                <li>
                    <button onclick="myFunction()">
                        <img src="../images/ui/logout.png">
                    </button>                      
                </li>
            </ul>
        </div>
        <div class="mbody_right">
            <form class="info_form" id="info_form">
                
            </form>
        </div>
    </div>
</body>
</html>