function setVideo2(id) {
	var urlAdress = document.getElementById("urlAdressValue").getAttribute("value");
	var titleValue = document.getElementById("titleValue").getAttribute("value");
	var mac = document.getElementById("macValue").getAttribute("value");
	
	//云台控制当前视屏控制参数由id改为cardId
	if(titleValue === "教师" || titleValue === "undefined" || titleValue === ""){
		currentLing = "card0";
	}
	if(titleValue === "教师全景"){
		currentLing = "card1";
	}
	if(titleValue === "学生"){
		currentLing = "card2";
	}
	if(titleValue === "VGA"){
		currentLing = "card3";
	}
	
    if (id !== '') {
        var consoleOperationInfo = id;
        $.get(urlAdress + "consoleOperationInfo?cardInfo=" + currentLing + "&mac="
        		+ mac, {
            consoleOperationInfo: consoleOperationInfo
        }, function (data, textStatus) {
            $("#resText").html(data); // 把返回的数据添加到页面上
        });
    }
}

function setVideoStopNew2(id) {
	var urlAdress = document.getElementById("urlAdressValue").getAttribute("value");
	var titleValue = document.getElementById("titleValue").getAttribute("value");
	var mac = document.getElementById("macValue").getAttribute("value");
	
	//云台控制当前视屏控制参数由id改为cardId
	if(titleValue === "教师" || titleValue === "undefined" || titleValue === ""){
		currentLing = "card0";
	}
	if(titleValue === "教师全景"){
		currentLing = "card1";
	}
	if(titleValue === "学生"){
		currentLing = "card2";
	}
	if(titleValue === "VGA"){
		currentLing = "card3";
	}
	
    if (id !== '') {
        var consoleOperationInfo = id;
        $.get(urlAdress + "consoleOperationNewInfo?cardInfo=" + currentLing + "&mac="
        		+ mac, {
            consoleOperationInfo: consoleOperationInfo
        }, function (data, textStatus) {
            $("#resText").html(data); // 把返回的数据添加到页面上
        });
    }
}

function setVideoNew2(id) {
	var urlAdress = document.getElementById("urlAdressValue").getAttribute("value");
	var titleValue = document.getElementById("titleValue").getAttribute("value");
	var mac = document.getElementById("macValue").getAttribute("value");
	
	//云台控制当前视屏控制参数由id改为cardId
	if(titleValue === "教师" || titleValue === "undefined" || titleValue === ""){
		currentLing = "card0";
	}
	if(titleValue === "教师全景"){
		currentLing = "card1";
	}
	if(titleValue === "学生"){
		currentLing = "card2";
	}
	if(titleValue === "VGA"){
		currentLing = "card3";
	}
	
    if (id !== '') {
        var consoleOperationInfo = id;
        $.get(urlAdress + "consoleOperationStopNewInfo?cardInfo=" + currentLing + "&mac="
        		+ mac, {
            consoleOperationInfo: consoleOperationInfo
        }, function (data, textStatus) {
            $("#resText").html(data); // 把返回的数据添加到页面上
        });
    }
}

/* 创建 XMLHttpRequest 对象 (原生js get请求，可以正常运行)*/
//var xmlHttp;
//function GetXmlHttpObject(){
//    if (window.XMLHttpRequest){
//      // code for IE7+, Firefox, Chrome, Opera, Safari
//      xmlhttp=new XMLHttpRequest();
//    }else{// code for IE6, IE5
//      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//    }
//    return xmlhttp;
//}
//// -----------ajax方法-----------//
//function setVideo2(id){
//    xmlHttp=GetXmlHttpObject();
//    if (xmlHttp==null){
//        alert('您的浏览器不支持AJAX！');
//        return;
//    }
//    var url="http://192.168.12.84:8080/deviceService/consoleOperationInfo?id=" + id;
//    xmlHttp.open("GET",url,true);
//    xmlHttp.onreadystatechange=getOkGet;//发送事件后，收到信息了调用函数
//    xmlHttp.send();
//}
//                   
//function getOkGet(){
//    if(xmlHttp.readyState==1||xmlHttp.readyState==2||xmlHttp.readyState==3){
//        // 本地提示：加载中
//                         
//    }
//    if (xmlHttp.readyState==4 && xmlHttp.status==200){
//        var d= xmlHttp.responseText;
//        // 处理返回结果
//                           
//    }
//}