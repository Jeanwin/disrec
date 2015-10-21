
//initSet
function initSet(){
	var urlAdress,titleValue,mac;
	//云台记忆初始化为空
	var activeMem = '';
	if(document.getElementById("urlAdressValue1") != null){
		urlAdress = document.getElementById("urlAdressValue1");
	} else if(document.getElementById("urlAdressValue2") != null){
		urlAdress = document.getElementById("urlAdressValue2");
	} else if(document.getElementById("urlAdressValue3") != null){
		urlAdress = document.getElementById("urlAdressValue3");
	} else if(document.getElementById("urlAdressValue4") != null){
		urlAdress = document.getElementById("urlAdressValue4");
	}

	if(document.getElementById("titleValue1") != null){
		titleValue = document.getElementById("titleValue1");
	} else if(document.getElementById("titleValue2") != null){
		titleValue = document.getElementById("titleValue2");
	} else if(document.getElementById("titleValue3") != null){
		titleValue = document.getElementById("titleValue3");
	} else if(document.getElementById("titleValue4") != null){
		titleValue = document.getElementById("titleValue4");
	}

	if(document.getElementById("macValue1") != null){
		mac = document.getElementById("macValue1");
	} else if(document.getElementById("macValue2") != null){
		mac = document.getElementById("macValue2");
	} else if(document.getElementById("macValue3") != null){
		mac = document.getElementById("macValue3");
	} else if(document.getElementById("macValue4") != null){
		mac = document.getElementById("macValue4");
	}

	urlAdress = urlAdress.getAttribute("value");
	titleValue = titleValue.getAttribute("value");
	mac = mac.getAttribute("value");
	
	var callData = [];
	callData[0] = urlAdress;
	callData[1] = titleValue;
	callData[2] = mac;
	callData[3] = activeMem;
	return callData;
}

//云台控制
function setVideo2(id) {
	
	var callDataInit = initSet();
	urlAdress = callDataInit[0];
	titleValue = callDataInit[1];
	mac = callDataInit[2];
	
	//云台控制当前视屏控制参数由id改为cardId
	if(titleValue === "教师" || titleValue === "undefined"  || titleValue === ""){
		titleValue = "card0";
	}
	if(titleValue === "学生"){
		titleValue = "card2";
	}
	if(titleValue === "教师全景"){
		titleValue = "card1";
	}
	if(titleValue === "VGA"){
		titleValue = "card3";
	}
	
    if (id !== '') {
        var consoleOperationInfo = id;
        $.get(urlAdress + "consoleOperationInfo?cardInfo=" + titleValue + "&mac="
        		+ mac, {
            consoleOperationInfo: consoleOperationInfo
        }, function (data, textStatus) {
            $("#resText").html(data); // 把返回的数据添加到页面上
        });
    }
}

function setVideoNew2(id) {
	
	var callDataInit = initSet();
	urlAdress = callDataInit[0];
	titleValue = callDataInit[1];
	mac = callDataInit[2];
	
	//云台控制当前视屏控制参数由id改为cardId
	if(titleValue === "教师" || titleValue === "undefined"  || titleValue === ""){
		titleValue = "card0";
	}
	if(titleValue === "学生"){
		titleValue = "card2";
	}
	if(titleValue === "教师全景"){
		titleValue = "card1";
	}
	if(titleValue === "VGA"){
		titleValue = "card3";
	}
	
    if (id !== '') {
        var consoleOperationInfo = id;
        $.get(urlAdress + "consoleOperationStopNewInfo?cardInfo=" + titleValue + "&mac="
        		+ mac, {
            consoleOperationInfo: consoleOperationInfo
        }, function (data, textStatus) {
            $("#resText").html(data); // 把返回的数据添加到页面上
        });
    }
}

function setVideoStopNew2(id) {
	
	var callDataInit = initSet();
	urlAdress = callDataInit[0];
	titleValue = callDataInit[1];
	mac = callDataInit[2];
	
	//云台控制当前视屏控制参数由id改为cardId
	if(titleValue === "教师" || titleValue === "undefined"  || titleValue === ""){
		titleValue = "card0";
	}
	if(titleValue === "学生"){
		titleValue = "card2";
	}
	if(titleValue === "教师全景"){
		titleValue = "card1";
	}
	if(titleValue === "VGA"){
		titleValue = "card3";
	}
	
    if (id !== '') {
        var consoleOperationInfo = id;
        $.get(urlAdress + "consoleOperationNewInfo?cardInfo=" + titleValue + "&mac="
        		+ mac, {
            consoleOperationInfo: consoleOperationInfo
        }, function (data, textStatus) {
            $("#resText").html(data); // 把返回的数据添加到页面上
        });
    }
}

//执行记忆和回调记忆的时候执行的后台服务
function perset(para, activeMem, urlAdress,mac,titleValue) {
	
	$.get(urlAdress + "perset?para=" + para + "&mem=" + activeMem + "&mac=" + mac
	    	+ "&cardInfo=" + titleValue, function (data, textStatus) {
        $("#resText").html(data); // 把返回的数据添加到页面上
    });
	
};

//预置位控制
function operConsole(para,evt) {
	
	var callDataInit = initSet();
	urlAdress = callDataInit[0];
	titleValue = callDataInit[1];
	mac = callDataInit[2];
	
	//云台控制当前视屏控制参数由id改为cardId
	if(titleValue === "教师" || titleValue === "undefined"  || titleValue === ""){
		titleValue = "card0";
	}
	if(titleValue === "学生"){
		titleValue = "card2";
	}
	if(titleValue === "教师全景"){
		titleValue = "card1";
	}
	if(titleValue === "VGA"){
		titleValue = "card3";
	}
	
	//预处理记忆按钮值
	if(document.getElementById("activeMem1") != null){
		activeMemDom = document.getElementById("activeMem1");
	} else if(document.getElementById("activeMem2") != null){
		activeMemDom = document.getElementById("activeMem2");
	} else if(document.getElementById("activeMem3") != null){
		activeMemDom = document.getElementById("activeMem3");
	} else if(document.getElementById("activeMem4") != null){
		activeMemDom = document.getElementById("activeMem4");
	}
	activeMem = activeMemDom.getAttribute("value");

	
    //如果para为0 并且和上次的传值不一样则赋值为0
    if (para == '-1') {
        perset(para, activeMem,urlAdress,mac,titleValue);
        return;
    }
    if (activeMem === '0') {
        if (para == 0) {
        	evt.style.opacity = 1;
        	activeMemDom.setAttribute("value", "");
        } else {
            perset(para, activeMem,urlAdress,mac,titleValue);
        }
    } else {
        if (para == 0) {
        	evt.style.opacity = 0.3;
        	activeMemDom.setAttribute("value", para);
        	
        } else {
            perset(para, activeMem,urlAdress,mac,titleValue);
        }
    }
};

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