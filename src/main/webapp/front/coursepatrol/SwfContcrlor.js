function SwfContcrlor(){this.a={};this.d=null;this.e=null;this.b=null;this.p=null;};SwfContcrlor.interFace=function(){if(!this.s){this.s=new SwfContcrlor();}return this.s;};SwfContcrlor.s=null;SwfContcrlor.prototype={a:Object,b:String,c:Number,d:Number,e:Number,f:String,g:Number,h:Number,l:Number,m:Array,n:Boolean,o:Function,p:String,init:function(f,b,c,k,p){this.f=f;this.b=b;this.c=c;this.o=k;this.p=p;window.addEventListener('active',this.fn)},start:function(){this.h=0;this.m=[];this.fa(this);this.n=false;},pause:function(){if(this.n){return;}this.n=true;if(this.e){clearInterval(this.e);this.e=null;}if(this.d){clearInterval(this.d);this.d=null;}},resume:function(){if(!this.n){return;}this.n=false;this.ff();},stop:function(){this.n=false;if(this.e){clearInterval(this.e);this.e=null;}if(this.d){clearInterval(this.d);this.d=null;}this.m=[];window.removeEventListener('active',this.fn);this.p=null;},fa:function(t){var httprequest=new XMLHttpRequest();httprequest.target=t;httprequest.onreadystatechange=t.fb;httprequest.open("GET",t.f+'page='+t.h,true);httprequest.send();},fb:function(e){if(e.target.status>400){return;}if(e.target.readyState==4&&e.target.status==200){e.target.target.fc(e.target.responseText);}},fc:function(t){var ar=this.fm(JSON.parse(t),this.h);if(ar==null){
	console.log('619test:',this.h)
	if(this.h==0){
		return;	
	}else{
		this.h=0;
	this.fa(this);	
	}
return;}if(this.h==0&&ar.length>2){this.g=ar[0];this.l=ar[1];}var i=ar.length-2;if(ar[i].length<this.l){while(ar[i].length<this.l){ar[i].push("");ar[i+1].push("没有教室");}}this.fd(ar,this.h);},fd:function(a,p){
	
console.log(a,p)
	if(this.m.length<3&&!this.e&&!this.n){
		this.m.push(p!=0?a:[a[2],a[3]]);
		this.h++;if(this.m.length<3){this.fa(this);}
	}
	if(this.m.length==3&&!this.e&&!this.n){
			console.log("test:",this.m);
	for(var i=0;i<this.a[this.b].list.length;i++){
		console.log(this.fo(this.a[this.b].list[i]))
		console.log(this.m[0][0][i])
try{
		this.fo(this.a[this.b].list[i]).initRtmpPlayer(this.m[0][0][i]);
		this.fo(this.a[this.b].list[i]).RtmpPlayerCache(this.m[1][0][i]);
		this.fo(this.a[this.b].list[i]).RtmpPlayerCache(this.m[2][0][i]);
}catch(e){
	console.log('rtmp change error')
}
	}
		if(this.o){this.o(this.m[0][1]);}
		this.ff();return;
	}
	if((this.e||this.n)&&this.m.length<3){
		this.m.push(a);
		this.h++;
		for(var i=0;i<this.a[this.b].list.length;i++){
try{			
			this.fo(this.a[this.b].list[i]).RtmpPlayerCache(this.m[this.m.length-1][0][i]);
}catch(e){
	console.log('rtmp change error')
}			
		}
		if(this.m.length<3){this.fa(this);}
	}
},
			
			addswf:function(o){var id=o.ref.id;var n=id.split('_');if(this.a[n[1]]?0:1){this.a[n[1]]={list:[]};};if(this.a[n[1]]['list'].length>0){var idindex=this.fe(id);if(idindex!=null){this.a[n[1]]['list'][idindex]=id;}else{this.a[n[1]]['list'].push(id);}}else{this.a[n[1]]['list'].push(id);}},removeswf:function(i,d){var n=d.split('_');if(!Boolean(i)){i=this.fe(d);if(!Boolean(i)){return;}}this.a[n[1]]['list']=this.a[n[1]]['list'].splice(i,1);if(this.a[n[1]]['list'].length==0){this.a[n[1]]['list']=null;this.a[n[1]]=null;}},fe:function(d){var n=d.split('_');for(var i=0;i<this.a[n[1]]['list'].length;i++){if(this.a[n[1]]['list'][i]==d){return i;}}return null;},initCount:function(d){this.c--;if(this.c==0){this.c=this.a[this.b].list.length;this.a[this.b].list.sort();this.start();}},ff:function(){if(!this.e){this.e=setInterval(this.fg,this.g,this)}},fg:function(t){if(t.d){clearInterval(t.d);t.d=null;}t.fh();t.m.shift();if(t.o){t.o(t.m[0][1]);}t.fa(t);},fh:function(){for(var i=0;i<this.a[this.b].list.length;i++){this.fo(this.a[this.b].list[i]).RtmpPlayerChange();}},sV:function(d){var gn=d.split('_')[1];if(this.a[gn]){for(var i=0;i<this.a[gn]['list'].length;i++){try{if(this.a[gn]['list'][i]!=d){this.fo(this.a[gn]['list'][i]).RtmpPlayer_Volume(0);}}catch(e){}}}},fm:function(obj,page){var ar=obj.data;try{ar.length}catch(e){return null;}var da=[[],[]];for(var i=0;i<ar.length;i++){da[0].push(ar[i]['rtmp']?ar[i]['rtmp']:"");da[1].push(ar[i]['className']+'_'+ar[i]['seatName']);}if(page!=0){return da;}else{if(this.e){return da;}else{return [parseInt(obj.polingtime)*1000,parseInt(obj.polingset),da[0],da[1]];}}},fn:function(e){var t=SwfContcrlor.interFace();if(t.p!=e.id&&t.p){t.stop();window.removeEventListener('active',t.fn);t.p=null;}},fo:function(m){if(navigator.appName.indexOf("Microsoft")!=-1){return window[m];}else{return document[m];}}}