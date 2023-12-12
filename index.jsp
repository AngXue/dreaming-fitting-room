<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + 
                                      request.getServerName() + ":" +
                                      request.getServerPort() + path;
%>    
<html>
<head>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/main.css" />
<script type="text/javascript" src="<%=basePath%>/js/jquery.min.js"></script>
</head>
<body>
	<div id="searchBox">
	    名称：<input id="searchValue" type = "text"/>
	   			 <button onclick="doSearch()">查询</button>
	   	<hr>		 
	   <input id="catId" type = "hidden"/>
	   编号：<input id="catCode" type = "text"/> 
	   名称：<input id="catName" type = "text"/>
	   <button onclick="doAdd()">添加</button>			 
	   <button onclick="doUpdate()">修改</button>
	 </div>
	 <hr>
	 <div id="resultList"></div>	 
</body>
<script>	
	$(document).ready(function () {
		request("POST","<%=basePath%>/demo/list",{},drawList,serverError,true);
    });
	
	function doSearch(){
		var input = $("#searchValue");
		var cat = {"name":input.val()};
		request("POST","<%=basePath%>/demo/listByName",cat,drawList,serverError,true);
	}
	
	function doAdd(){
		var input = $("#searchValue");
		var cat = {};
		cat.code = $("#catCode").val();
		cat.name = $("#catName").val();
		request("POST","<%=basePath%>/demo/add",cat,doSearch,serverError,true);
	}
	
	function doAdd(){
		var cat = {};
		cat.code = $("#catCode").val();
		cat.name = $("#catName").val();
		request("POST","<%=basePath%>/demo/add",cat,doSearch,serverError,true);
	}
	
	function doUpdate(){
		var cat = {};
		cat.id =  $("#catId").val();
		cat.code = $("#catCode").val();
		cat.name = $("#catName").val();
		request("POST","<%=basePath%>/demo/update",cat,doSearch,serverError,true);
	}
	
	function drawList(responseData){
		showMessage(responseData);
		if(responseData.code<0){
			return;
		}
		var resultList = $("#resultList");
		var cats = responseData.data;
		resultList.html("");
		$(cats).each(function(index,item){
			var catDiv = $("<div>");
			catDiv.html("["+(index+1)+"] id:"+item.id+", code:"+item.code+", name:"+item.name);
			
			var btDelete = $("<button>");
			btDelete.text("删除");
			btDelete.click(function(){
				request("POST","<%=basePath%>/demo/delete",item,doSearch,serverError,true);
			});	
			
			var btEdit = $("<button>");
			btEdit.text("修改");
			btEdit.click(function(){
				$("#catId").val(item.id);
				$("#catCode").val(item.code);
				$("#catName").val(item.name);				
			});	
			catDiv.append(btDelete);
			catDiv.append(btEdit);
			resultList.append(catDiv);
		});
	}

    function request(method,url,data,successCallBack,errorCallBack,async){
        $.ajax({
            url: url,
            async:async,
            contentType: "application/json",
            data: JSON.stringify(data),
            method: method
        }).success(successCallBack).error(errorCallBack);
    }
    
    function showMessage(responseData){
    	console.log("showMessage",responseData);
    	alert(responseData.description);
    }

    function serverError(XMLHttpRequest, textStatus){
        console.log("responseText:",XMLHttpRequest.responseText);
        console.log("status:",XMLHttpRequest.status);
        console.log("textStatus:",textStatus);
        console.log("readyState:",XMLHttpRequest.readyState);
        alert("服务器错误，请检查前后台控制台输出！");
    }
</script>
</html>