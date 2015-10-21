function videoCO(){
	if(videoCO.self){
		var e = new Error();
		e.message = '禁止再实例化';
		throw e;		
		return;	
	}
	videoCO.self = this;
	this.videoList = [];
	this.$('player').oncontextmenu = function(){return false;};
	this.$('progressbar').onmousedown = function(e){videoCO.in().onprogressclick(e);}
	this.$('point').onmousedown = function(e){
		if(!videoCO.in().isready){return;}
		videoCO.in().startDrag(e)
		if (!document.all) e.preventDefault(); 
		document.onmousemove = function(e){videoCO.in().Drag(e)}
		document.onmouseup = function(e){
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
}
videoCO.in = function(){
		if(!this.self){
			this.self = new videoCO();
			return this.self;
		}else{
			return this.self;	
		}
	}
videoCO.self = null;
videoCO.prototype = {
	videoList:Array,
	v_times:Array,
	activeI:Number,
	isready:Boolean,
	currentTime:Number,
	Dx:Number,
	Ox:Number,
	callback:Function,
	init:function(list){
		this.clear();
		this.isready = false;
		this.activeI = 0;
		for(var i = 0 ;i<list.length;i++){
			this.videoList.push(this.createVideoDom(i,list[i]));
		}
	},
	createVideoDom:function(i,url){
		var m = this.$('player');
		var m_v = document.createElement("video");
		m_v.style.width = '100%';
		m_v.style.height = '100%';
		m_v.src = url;
//		m_v.target = this;
		if(i!=0){
			m_v.style.display = 'none';
		}
		m.appendChild(m_v);
		this.addEventListenner(m_v)
		return m_v;
	},
	clear:function(){
		this.videoList = [];
		this.$('player').innerHTML = '';
	},
	seek:function(time){
		for(var i=0;i<this.v_times.length;i++){
			if(time<this.v_times[i]){			
				break;
			}
		}
		if(i!=0){
			time = time - this.v_times[i-1]	
		}
		this.showVideo(i);
		this.videoList[this.activeI].currentTime =time;
		this.ontimeupdate(null);
	},
	startDrag:function(e){
		var ml = this.$('point').style['margin-left'];
		ml = Number(ml.slice(0,ml.length-2));
		this.Dx = e.screenX-ml;
		this.Ox = e.offsetX;
		//console.log('save',e.screenX,ml,e.screenX-ml,e.offsetX)
	},
	Drag:function(e){
		var x = e.screenX-this.Dx;
		x = Math.min(Math.max(x,-7),this.$('progressbar').clientWidth-7)
		this.$('point').style['margin-left']=x+'px';
		this.$('progress').style.width = (x+7)+'px';
		this.seek(Math.floor((x+7)/this.$('progressbar').clientWidth*this.v_times[this.v_times.length-1]));
	},
	showVideo:function(i){
		if(i==this.activeI){
			return;
		}
		this.videoList[this.activeI].style.display = 'none';
		this.videoList[i].style.display = 'block';
		this.videoList[this.activeI].pause();
		this.activeI = i;
	},
	addEventListenner:function(dom){
		dom.addEventListener('loadedmetadata',this.onloadedmetadata);
		dom.addEventListener('timeupdate',this.ontimeupdate);
		dom.addEventListener('ended',this.onended);
	},
	ontimeupdate:function(e){
		var m=videoCO.in();
		m.currentTime=Math.floor(m.videoList[m.activeI].currentTime+(m.activeI>0?m.v_times[m.activeI-1]:0));
		m.$('progress').style.width = m.currentTime/m.v_times[m.v_times.length-1]*100+'%'
		m.$('point').style['margin-left']=(m.$('progress').clientWidth-7)+'px';
		if(m.callback){m.callback(m.currentTime)}
	},
	onprogressclick:function(e){
		var m=videoCO.in();
		if(!m.isready||e.target===m.$('point')){
			return;
		}
		this.pause();
		m.seek(Math.floor(e.offsetX/m.$('progressbar').clientWidth*m.v_times[m.v_times.length-1]));
		this.$('point').onmousedown(e);
	},
	onloadedmetadata:function(e){
		videoCO.in().checkReady();
	},
	onended:function(e){
		if(videoCO.in().activeI<videoCO.in().videoList.length-1){					
			videoCO.in().showVideo(videoCO.in().activeI+1);
			videoCO.in().videoList[videoCO.in().activeI].currentTime = 0;
			videoCO.in().videoList[videoCO.in().activeI].play();
		}	
	},
	checkReady:function(){
		for(var i = 0 ;i <this.videoList.length;i++){
			if(!this.videoList[i].duration){
				return;
			}
		}
		var vtn = 0;
		this.v_times = [];
		for(var j=0;j<this.videoList.length;j++){
			this.v_times[j] = vtn + this.videoList[j].duration;
			vtn += this.videoList[j].duration;
		}
		this.isready = true;
		this.$('playbtn').onclick = function(e){videoCO.in().play()};
		this.$('pausebtn').onclick = function(e){videoCO.in().pause()};
		this.seek(599);
	},
	play:function(){
		if(!this.isready) return;
		this.videoList[this.activeI].play();
		this.$('playbtn').style.display = 'none';
		this.$('pausebtn').style.display = 'inline-block';
	},
	pause:function(){
		if(!this.isready) return;
		this.videoList[this.activeI].pause();
		this.$('playbtn').style.display = 'inline-block';
		this.$('pausebtn').style.display = 'none';
	},
	$:function(id){
		return document.getElementById(id);	
	}
}