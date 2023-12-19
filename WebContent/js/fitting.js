//初始化页面
$(function(){
    upload_ClothSpecies();
    build_model_original_cloth();
})

//初始化衣服种类
function upload_ClothSpecies(){
    var user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    let select = $("<select></select>");
    $.ajax({
        url: "http://127.0.0.1:8080/suit/clothCategory/getAll",  
        type:"post",
        contentType: "application/json",  
        success:function(result){
            console.log("初始化衣服种类获取成功！");
            console.log(result);
            for(var i = 0;i<result.data.length;i++){
                //如果是最上面的(此时没有选择任何种类)，直接显示该种类的全部服饰
                if(i == 0){
                    upload_cloth_classification(result.data[i].clothCategoryName);
                }
                var option = $("<option></option>").append(result.data[i].clothCategoryName).val(result.data[i].clothCategoryName);
                select.append(option);
            }
        }
    });
    select.appendTo(".select");
    //当用户改变种类时，需要更新衣服
    select.change(function(){
        console.log($(this).val());
        upload_cloth_classification($(this).val());
    });
}

//根据种类显示所有对应的衣服放到区域C
function upload_cloth_classification(clothCategoryName){
    var user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    $(".C > div").not(":first").remove();
    var cloth = {};
    cloth.clothCategoryName = clothCategoryName;
    cloth.clothGender = user.gender;
    $.ajax({
        url: "http://127.0.0.1:8080/suit/cloth/search",  
        type:"post",
        contentType: "application/json",
        data:JSON.stringify(cloth),
        success:function(result){
            //遍历构建表单
            console.log("根据种类显示所有对应的衣服放到区域C");
            console.log(result);
            result.data.forEach(function(item){
                console.log(item);
                var addImg = $("<img class='addCloth'></img>").attr("src","../images/ui/add.png");
                var clothImg = $("<img class='specific_cloth'></img>").attr("src","../images/data/suits/"+item.clothImageName);
                var clothDiv = $("<div></div>").addClass("cloth").append(addImg).append(clothImg);
                
                var numberSpan1 = $("<span></span>").append("编号：");
                var numberSpan2 = $("<span></span>").append(item.clothID);
                var numberDiv = $("<div></div>").append(numberSpan1).append(numberSpan2);
                var nameSpan1 = $("<span></span>").append("名称：");
                var nameSpan2 = $("<span></span>").append(item.clothName);
                var nameDiv = $("<div></div>").append(nameSpan1).append(nameSpan2);
                var priceSpan1 = $("<span></span>").append("价格：");
                var priceSpan2 = $("<span></span>").append("￥"+Number(item.clothPrice).toFixed(2));
                var priceDiv = $("<div></div>").append(priceSpan1).append(priceSpan2);
                var attributeDiv = $("<div></div>").addClass("attribute").append(numberDiv).append(nameDiv).append(priceDiv);
                
                var itemDiv = $("<div></div>").append(clothDiv).append(attributeDiv).appendTo(".C");
                //添加饰品
                addImg.click(function(){
                    build_form(item.clothID,item.clothName,item.clothPrice,0,true);
                    build_cloth(item.clothID,item.clothImageName,item.clothCategoryName,0);
                });
            });
        }
    });
}

// 初始化人物模型以及饰品，区域B
function build_model_original_cloth(){
    // 初始化人物模型 
    //var model = "${sessionScope.user.model}";
    var user = window.sessionStorage.getItem("loggedInUser");
    var model = JSON.parse(user).modelID;
    //var model="wheadA";
    var modelImg = $("<img class='model'></img>").attr("src","../images/data/model/"+model+"Model.png").appendTo(".model-box");
    $.ajax({
        url: "http://127.0.0.1:8080/suit/dressedClothes/getClothList",
        type:"post",
        contentType: "application/json",
        data:JSON.stringify({"name":JSON.parse(user).name}),
        success:function(result){
            //遍历构建表单
            console.log("初始化装扮表单");
            console.log(result);
            result.data.forEach(function(data){
                build_form(data.clothID,data.clothName,data.clothPrice,data.zIndex,false);
                build_cloth(data.clothID,data.clothImageName,data.clothCategoryName,data.zIndex);
            });
        }
    });
}
 
// 将所有的饰品放到模特身上
function build_cloth(clothID,clothImageName,clothCategoryName,zIndex){
    var img = $("<img></img>").attr("src","../images/data/suits/"+clothImageName)
        .addClass(clothCategoryName)
        .attr("id",clothID)
        .appendTo(".model-box");
    img.css("z-index",zIndex);
}

//将模特身上的所有饰品显示在区域A
function build_form(clothID,name,price,zIndex,isadd){
    console.log(name)
     var number1 = $("<span></span>").append("编号：");
     var number2 = $("<span></span>").append(clothID);
     var numberDiv = $("<div></div>").append(number1).append(number2);

     var nameSpan1 = $("<span></span>").append("名称：");
     var nameSpan2 = $("<span></span>").append(name);
     var nameDiv = $("<div></div>").append(nameSpan1).append(nameSpan2);

     var priceSpan1 = $("<span></span>").append("价格：");
     // 保留两位小数
     var priceSpan2 = $("<span></span>").append("￥"+Number(price).toFixed(2)).addClass("dress_price");
     var priceDiv = $("<div></div>").append(priceSpan1).append(priceSpan2);

     var topDiv = $("<div></div>").addClass("top").append(numberDiv).append(nameDiv).append(priceDiv);

     var zIndexImg = $("<img></img>").attr("src","../images/ui/zIndex.png");
     var span = $("<span></span>").addClass("z-index").append(zIndex);
     var upImg = $("<img></img>").attr("src","../images/ui/up.png").addClass("up");
     var downImg = $("<img></img>").attr("src","../images/ui/down.png").addClass("down");
     var removeImg = $("<img></img>").attr("src","../images/ui/remove.png").addClass("remove");

     var bottomDiv = $("<div></div>").addClass("bottom")
         .append(zIndexImg).append(span).append(upImg).append(downImg).append(removeImg);
     var form = $("<form></form>").append(topDiv).append(bottomDiv).appendTo(".A");
     
     var dress = {};
     var id  = 1;
     let user = window.sessionStorage.getItem("loggedInUser");
     $.ajax({
        url:"http://127.0.0.1:8080/suit/cloth/getSingle",
        type:"post",
        contentType: "application/json",
        data:JSON.stringify({"clothID":clothID}),
        success:function(result){
            dress.clothID = result.data.clothID;
            dress.clothImageName = result.data.clothImageName;
            dress.clothCategoryName = result.data.clothCategoryName;
            dress.clothName = result.data.clothName;
            dress.clothPrice = result.data.clothPrice;
            dress.clothGender = result.data.clothGender;
            dress.id = result.data.id;
            id = result.data.id;
            dress.belongUserName = JSON.parse(user).name;
            calculate_price(price);
            if(isadd){
                //向数据库中添加该饰品
                $.ajax({
                    url:"http://127.0.0.1:8080/suit/dressedClothes/add",
                    type:"post",
                    contentType: "application/json", 
                    data:JSON.stringify(dress),
                });
            }
        }
    });

     /*增加z-index*/
     upImg.click(function(){
        var index = $(this).siblings(".z-index").text();
        index++;
        $(this).siblings(".z-index").text(index);
            dress.zIndex = index;
            dress.id = id;
           $.ajax({
               url:"http://127.0.0.1:8080/suit/dressedClothes/update",
               type:"post",
               contentType: "application/json", 
               data:JSON.stringify(dress),
               success:function(){
                   change_dress_index(clothID,index);
               }
         })
     })
     //减少z-index
     downImg.click(function(){
        var index = $(this).siblings(".z-index").text();
        index--;
        $(this).siblings(".z-index").text(index);
             dress.zIndex = index;    
             dress.id = id;      
           $.ajax({
               url:"http://127.0.0.1:8080/suit/dressedClothes/update",
               type:"post",
               contentType: "application/json", 
               data:JSON.stringify(dress),
               success:function(result){	
                   change_dress_index(clothID,index);
               }
         })
     })
     
     //删除该衣服
     removeImg.click(function(){
         $(this).parents("form").remove();
         dress.id = id;
         $.ajax({
            url:"http://127.0.0.1:8080/suit/dressedClothes/remove",  
            type:"post",
            contentType: "application/json",  
               data:JSON.stringify(dress),
               success:function(result){
                   remove_clothImg(clothID);
                   calculate_price(-price);
               }
         });
     });
}
  
//计算当前的总值
function calculate_price(price){
    var oldprice = parseInt($(".price").text().substring(1));
    // 保留两位小数
    $(".price").text("￥"+(Number(oldprice)+Number(price)).toFixed(2));
}

// 改变饰品层级 
function change_dress_index(id,index){
    $('#'+id).css("z-index",index);
}

// 删除服饰图片 
function remove_clothImg(id){
    $('#'+id).remove();
}