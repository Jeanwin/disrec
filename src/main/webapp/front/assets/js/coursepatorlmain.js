/*
 * author by wanghan
 */
function coursepatorlmain(id,width,height,wNum,hNum,callBack){
	this.myvieoports = [];
//	this.viewLimt = wNum*hNum;
	this.width = width;
	this.height = height;	
	this.intervalNum = null;
	this.callBack = callBack;
	this.timeInterval = 1000;
	this.m_dom = {};
	this.createDom(id);
	this.initCss(wNum,hNum);
}

coursepatorlmain.prototype = {
	timeInterval:Number,
	myvieoports:Array,
	m_dom:Object,
	viewLimt:Number,
	width:Number,
	height:Number,
	intervalNum:Number,
	callBack:Function,
	m_base_ar:Array,
	
	m_date:Array,	//临时生成数组 测试用
	
	start:function(json){
		if(this.intervalNum){
			clearInterval(this.intervalNum);
		}
		this.m_base_ar = this.changeJsonDate(JSON.parse(json));
		//this.m_base_ar = this.changeJsonDate(JSON.parse('{"url":"http://127.0.0.1/","data":[{"mac": "000000000003","seats": [{"seat": "card0","fileName":"00.jpg"},{"seat": "card1","fileName":"01.jpg"}]},{"mac": "000000000005","seats": [{"seat": "card0","fileName":"02.jpg"},{"seat": "card1","fileName":"03.jpg"}]}]}'));
		this.vpLimt = this.m_base_ar[0].length;
		if(this.vpLimt<this.viewLimt){
			for(var li = this.vpLimt;li<this.viewLimt;li++){
				this.m_dom.lis[li].style.display = 'none';
				this.myvieoports[li].enable = false;
			}
		}
		var list = this.createSource(this.m_base_ar[1]);
		this.m_date = [];
		if(this.m_date.length==0){
			for(var j = 0 ; j<this.vpLimt; j++){
				this.m_date.push(list[j]);
			}
			for(var i = 0 ;i <this.vpLimt; i++){
				this.myvieoports[i].setbaseurl(this.m_base_ar[0][i],this.m_base_ar[2][i],this.m_base_ar[3][i]);
				this.myvieoports[i].updateList();
			}
			
		}else{
			for(var k = 0 ; k<list.length; k++){
				this.m_date[k] = this.m_date[k].concat(list[k]);	
			}
		}		
		this.intervalNum =setInterval(this.changeImg,this.timeInterval,this);
	//alert(txt)	
	},
	
	stop:function(){
		if(this.intervalNum){
			clearInterval(this.intervalNum);
		}
	},
	
	createDom:function(id){
		this.m_dom.main = this.$(id);
		this.m_dom.lis = [];
		var m_ul = document.createElement("ul");
		m_ul.className = "cfix";
		for(var i=0;i<16;i++){
			var m_li = document.createElement("li");
			var li_img = document.createElement("img");
			var li_div_bg = document.createElement("div");
			var li_div_tx = document.createElement("div");
			
			li_img.className = "videoImg";
			li_div_bg.className = "maskBg-1";
			li_div_tx.className = "maskTx-1";
			
			m_li.appendChild(li_img);
			m_li.appendChild(li_div_bg);
			m_li.appendChild(li_div_tx);
			m_ul.appendChild(m_li);
			this.m_dom.lis.push(m_li);
			this.myvieoports.push(new viewport(li_img,li_div_tx,i,this));
		}
		
		this.$(id).appendChild(m_ul);
	},
	
	getresource:function(id){
		var length = Math.min(10,this.m_date[id].length);
		var returndate = this.m_date[id].slice(0,length);
		this.m_date[id] = this.m_date[id].slice(length).concat(returndate);
		return returndate;
	},
	
	changeImg:function(target){
		for(var i = 0 ; i<target.viewLimt ;i++){
			target.myvieoports[i].changeImg();
		}
	},
	
	initCss:function(wNum,hNum){	

		this.viewLimt = wNum*hNum;
		var li_width = 100/wNum;
		var li_height = 100/hNum;
		this.m_dom.main.style.width = this.width+'%';
		this.m_dom.main.style.height = this.height+'%';
		for(var i = 0 ;i <this.m_dom.lis.length; i++){
			if(i<this.viewLimt){
				this.m_dom.lis[i].style.width = li_width+'%';
				this.m_dom.lis[i].style.height = li_height+'%';
				//this.myvieoports[i].updateCss(li_width,li_height);
			}else{
				this.m_dom.lis[i].style.display = 'none';
			}
		}
	},
	
	$:function(id){
		return document.getElementById(id);	
	},
	
	
	//以下函数待改
	
	toStr:function(num){
		num = '' + num;
		while(num.length<2){
			num = '0'+num;
		}
		return num;
	},
	
	changeJsonDate:function(obj){
		var ar = obj.data;
		var url = obj.url;
		
		var da=[[],[],[],[]];
		//fullurl 99 name mac
		for(var i = 0;i<ar.length;i++){
			for(var j=0;j<ar[i]['seats'].length;j++){
				var filename =	ar[i]['seats'][j]['fileName'];
				filename = filename.slice(0,filename.indexOf('.'));
				da[0].push(url+'/'+ar[i]['mac']+'/'+ar[i]['seats'][j]['seat']);
				da[1].push(parseInt(filename.replace(/0\d/g,function(){return arguments[0].replace('0','');})));
				da[2].push(ar[i]['className']+'_'+ar[i]['seats'][j]['seatName']);
				da[3].push(ar[i]['mac']);
			}
		}
		return da;
	},
	
	createSource:function(ar){
		var date =[];
		for(var i = 0 ; i < ar.length ; i++ ){
			var newdate = [];
			for(var j = 0 ; j < 100 ; j++ ){
				newdate[j] = (j+ar[i])%100;
			}
			date.push(newdate);
		}
		return date;
	}
}