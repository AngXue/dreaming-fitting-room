<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + 
                                      request.getServerName() + ":" +
                                      request.getServerPort() + path;
%>   
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>fitting</title>
    <link rel="stylesheet" href="../css/fitting.css">
    <script src="../js/jquery-3.3.1.js"></script>
    <script src="../js/fitting.js"></script>
</head>
<body>
        <!-- 虚拟着装界面 -->
    <div class="container">   
            <div class="content">
            <div class="A"></div>
            <div class="B">
                <div class="model-box"></div>
                <img id="modelShadow" src="../images/data/model/modelShadow.png" />
                <img id="ground" src="../images/ui/ground.png"/>
                <div class="price-box">
                    <p class="p_title">总价</p>
                    <p class="price">￥0</p>
                </div>
            </div>
            <div class="C">
                <div class="select">
                    <span>选择分类：</span>
                </div>
            </div>
        </div>
    </div>

</body>

</html>