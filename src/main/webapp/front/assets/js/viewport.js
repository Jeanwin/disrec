/*
 * author by wanghan
 */
function viewport(img,tx,id,father){
	this.father = father
	this.img = img;
	this.tx = tx;
	this.id = id;
	this.baseurl = "";
	this.curIndex = 0;//id*20+1; 
	this.enable = true;
	//img.src = "img/part0/"+toStr(this.curIndex)+".jpg"
	tx.innerHTML="<p>暂无图片</p>";
	this.playList = [];
	this.baseurl = '';
	this.mac ='';
	//this.updateList();
	//this.playList = father.getresource(id);
}
viewport.prototype = {
	id:Number,img:Object,tx:Object,father:Object,isupdate:Boolean = false,playList:Array,baseurl:String,mac:String,
	changeImg:function(){
//		this.curIndex = (this.curIndex+1)%this.num; 
//   		this.img.src = 'img/part0/'+toStr(this.curIndex+1)+'.jpg';
		if(!this.isupdate){
			if(this.curIndex + 1 >= this.playList.length){
				return;
			}
			if(this.playList.length - this.curIndex ==3){
				this.updateList();
			}
			this.curIndex++;
			if(this.enable){
				this.img.src = this.baseurl+'/'+this.father.toStr(this.playList[this.curIndex])+'.jpg';
			}
			//this.img.src = 'http://192.168.12.133/self/lunxun/img/part0/'+this.father.toStr(this.playList[this.curIndex])+'.jpg';
			//this.img.src = 'http://192.168.12.133/self/lunxun/img/yzk/part0/yzk ('+this.playList[this.curIndex]+').png';
		}
	},
	
	setbaseurl:function(url,txt,mac){
		this.baseurl = url;
		this.tx.innerHTML = txt;
		this.mac =mac;
		this.playList = [];
	},
	
	updateList:function(){
		this.isupdate = true;
		var newlist = this.father.getresource(this.id);
//console.log("view ports ->newlist",newlist)
		this.playList = this.playList.concat(newlist);
		this.playList = this.playList.slice(this.curIndex);
		this.curIndex = -1;
		this.isupdate = false;
	}
}