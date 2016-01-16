/*
* cPlayer --A beautiful(maybe not) and clean(maybe not also) WEB Music Player by HTML5.
* Author  Corps
*/


function cPlayer(json){
	try{
		try{
			json = eval(json);
		}catch(e){
			if((/(http|https):\/\//gi).test(json)){
				var url = json;
				json = new Object;
				json.url = url;
			}else{
				console.error("What the fuck you do! \nThere isn't anything as a music url.");
				return false;
			}
		}
		var thisPlayer = document.createElement("div");
		thisPlayer.classList.add("player");
		if(json.url !== undefined) {
			thisPlayer.setAttribute("src", json.url);
		}
		if(json.lyric !== undefined) thisPlayer.innerHTML = json.lyric;
		if(json.white === true) thisPlayer.classList.add("white");
		thisPlayer.cPlayer();
		return thisPlayer;
	}catch(e){
		document.write("cPlayer Function Error" + e);
	}
}

//仿jQuery Slide,Fade特效
Element.prototype.slide = function(time){
	time = time ? time : 1000;
	var that = this;
	if(window.getComputedStyle(this).display == "none" || window.getComputedStyle(this).height == "0px"){
		if(this.style.transition != "all " + (time / 1000) + "s ease 0s"){
			this.style.transition = "all " + (time / 1000) + "s ease 0s";
			setTimeout(function(){that.style.transition = ""},time);
		}
		this.style.display = "";
		setTimeout(function(){
			that.style.height = "";
			that.style.margin = "";
		},1);
	}else{
		if(this.style.transition != "all " + (time / 1000) + "s ease 0s"){
			this.style.transition = "all " + (time / 1000) + "s ease 0s";
			setTimeout(function(){that.style.transition = ""},time);
		}
		this.style.height = "0px";
		this.style.margin = "0";
		setTimeout(function(){that.style.display = "none"},time);
	}
}

Element.prototype.fade = function(time){
	time = time ? time : 1000;
	var that = this;
	if(window.getComputedStyle(this).display == "none"){
		if(this.style.transition != "all " + (time / 1000) + "s ease 0s"){
			this.style.transition = "all " + (time / 1000) + "s ease 0s";
			setTimeout(function(){that.style.transition = ""},time);
		}
		this.style.display = "";
		setTimeout(function(){
			that.style.opacity = "";
		},1);
	}else{
		if(this.style.transition != "all " + (time / 1000) + "s ease 0s"){
			this.style.transition = "all " + (time / 1000) + "s ease 0s";
			setTimeout(function(){that.style.transition = ""},time);
		}
		this.style.opacity = "0";
		setTimeout(function(){that.style.display = "none"},time);
	}
}
Element.prototype.cPlayer = function(){
	try{
		/* 元素修正 / 添加 */
		//歌词验证
		if((/\S/).test(this.innerHTML)){
			this.lyric = new Object; //建立一个对象集
			this.lyric.check = true; //存储Lyric证据.
			this.lyric.content = this.innerHTML.replace(/<br>/gi,"\n"); //去除HTML换行元素
			this.innerHTML = ""; //清空内容,以便之后增加DOM元素
			this.lyric.result = this.lyric.content.replace(/\[(\d+):(\d+)\.(\d+)\](.*)|.*/gi,
									function(w,a,b,c,d){
									if((/\[(\d+):(\d+)\.(\d+)\].*/gi).test(w) === false) return "";
										return '<lrc time="' + (parseInt(a)*60 + parseInt(b)) + "." + c + '">' + d + "</lrc>\n"
									}); //嗯..转换成DOM格式歌词
		}else{
			this.lyric = new Object;
			this.lyric.check = false;
			this.lyric.content = "";
			this.lyric.result = "";
		}

		//增加audio元素
		if(this.audio === undefined) this.audio = new Audio;
		this.audio.src = this.getAttribute("src");
		this.innerHTML = this.audio.outerHTML + this.innerHTML;
		//增加Waiting DIV
		if(this.getElementsByClassName("placeholder")[0] === undefined) {
			var p = document.createElement("div");
			p.classList.add("placeholder");
			this.appendChild(p);
		}
		//增加主面板DIV
		if(this.getElementsByClassName("player-primary")[0] === undefined){
			var p = document.createElement("div");
			p.classList.add("player-primary");
			p.innerHTML = '				<div class="left"><button class="bc plays"><i class="played">played</i></button><div class="leng"><div class="wall"><div class="clicks"></div><div class="buffer"></div></div></div></div><div class="right"><button class="bc volumeButton"><i class="volume_up">volume_up</i></button><div class="volume"><div class="v-wall"><div class="v-clicks"></div></div></div></div>';
			this.innerHTML = this.innerHTML + p.outerHTML;
		}
		//增加歌词DIV
		if(this.lyric.check === true){
			var p = document.createElement("div");
			p.classList.add("lyric");
			p.style.display = "none";
			pl = document.createElement("div");
			pl.classList.add("lyric-primary");
			pl.innerHTML = this.lyric.result;
			p.appendChild(pl);
			this.innerHTML = this.innerHTML + p.outerHTML;
		}
		this.addMusic();
	}catch(e){
		document.write("Prototype cPlayer Error" + e  );
	}
}

Element.prototype.playicon = function(a,lists){
	    if(a === "pause"){
    		lists.icon.plays.classList.toggle("played");
    		if(lists.icon.plays.classList.contains("paused")) lists.icon.plays.classList.remove("paused");
    	}else if(a === "play"){
    		lists.icon.plays.classList.toggle("paused");
    		if(lists.icon.plays.classList.contains("played")) lists.icon.plays.classList.remove("played");
    	};
}

Element.prototype.addMusic = function(){
	this.audio = this.getElementsByTagName("audio")[0];
	var lists = new Object;
	lists.button = new Object;
	lists.icon = new Object;
	lists.button.plays = this.getElementsByClassName("plays")[0];
	lists.button.clicks = this.getElementsByClassName("clicks")[0];
	lists.button.buffer = this.getElementsByClassName("buffer")[0];
	lists.button.vclicks = this.getElementsByClassName("v-clicks")[0];
	lists.button.volumeButton = this.getElementsByClassName("volumeButton")[0];
	lists.icon.volumeButton = this.getElementsByClassName("volumeButton")[0].getElementsByTagName('i')[0];
	lists.icon.plays = this.getElementsByClassName("plays")[0].getElementsByTagName("i")[0];
	if(this.lyric.check === true){
		lists.lyricprimary = this.getElementsByClassName("lyric-primary")[0];
		lists.lrc = this.getElementsByTagName("lrc");
	}
	var thats = this;
	setInterval(
		function(){
			lists.button.clicks.style.width = (( thats.audio.currentTime / thats.audio.duration ) * 100) + "%";
		}
		,200);
	this.getElementsByClassName("leng")[0].onclick = function (e) {
		//i=0; 嗯改进一下
		thats.audio.currentTime = (e.offsetX / this.offsetWidth * thats.audio.duration);
		if(thats.audio.paused === true){
			thats.audio.play();
			//thats.playicon("play",lists); 冲突
		}
	};
	this.getElementsByClassName("volume")[0].onclick = function (e) {
		thats.audio.volume = (e.offsetX / this.offsetWidth);
	};

	//声音响度改变时
	if(this.audio.onvolumechange === undefined){
		var volumes = thats.audio.volume;
		setInterval(function(){
			if(volumes !== thats.audio.volume){
				lists.button.vclicks.style.width = (this.volume * 100) + "%";
				if(this.volume === 0&&lists.icon.volumeButton.classList.contains("volume_up")){
					lists.icon.volumeButton.classList.add('volume_mute');
					if(lists.icon.volumeButton.classList.contains("volume_up")) lists.icon.volumeButton.classList.remove('volume_up');
				}
				if(this.volume !== 0&&lists.icon.volumeButton.classList.contains("volume_mute")){
					lists.icon.volumeButton.classList.add('volume_mute');
					if(lists.icon.volumeButton.classList.contains("volume_up")) lists.icon.volumeButton.classList.remove('volume_up');
				}
			}
		}, 1000); //垃圾浏览器支持
	}else{
		this.audio.onvolumechange = function(){
			lists.button.vclicks.style.width = (this.volume * 100) + "%";
			if(this.volume === 0&&lists.icon.volumeButton.classList.contains("volume_up")){
				lists.icon.volumeButton.classList.add('volume_mute');
				if(lists.icon.volumeButton.classList.contains("volume_up")) lists.icon.volumeButton.classList.remove('volume_up');
			}
			if(this.volume !== 0&&lists.icon.volumeButton.classList.contains("volume_mute")){
				lists.icon.volumeButton.classList.add('volume_mute');
				if(lists.icon.volumeButton.classList.contains("volume_up")) lists.icon.volumeButton.classList.remove('volume_up');
			}
		};
	}

	//响应?无需了
	/*this.audio.onwaiting = function(){
		//thats.getElementsByClassName("placeholder")[0].fade(100); 效果不好
	};
	*/

	//PlaceHolder消失的?
	if(this.audio.oncanplay === undefined){
			if(thats.getElementsByClassName("placeholder")[0].style.display !== "none")thats.getElementsByClassName("placeholder")[0].fade(100);
			lists.button.vclicks.style.width = (this.volume * 100) + "%";
			setInterval(function(){
				lists.button.buffer.style.width = (( thats.audio.buffered.end(0) / thats.audio.duration ) * 100) + "%";
			},200);
	}else{
		this.audio.oncanplay = function(){
			if(thats.getElementsByClassName("placeholder")[0].style.display !== "none")thats.getElementsByClassName("placeholder")[0].fade(100);
			lists.button.vclicks.style.width = (this.volume * 100) + "%";
			setInterval(function(){
				lists.button.buffer.style.width = (( thats.audio.buffered.end(0) / thats.audio.duration ) * 100) + "%";
			},200);
		};
	}

	//结束了么?
	if(this.audio.onended === undefined){
		setInterval(function(){
			if(this.audio.currentTime === this.audio.duration){
				if(thats.lyric.check === true){
					lists.lyricprimary.style.transform = "translateY(100px)";
					thats.getElementsByClassName("lyric")[0].slide(500);
				}
				i=0;
			}
		},1000);
	}else{
		this.audio.onended = function(){
			//thats.playicon("pause",lists);
			if(thats.lyric.check === true){
				lists.lyricprimary.style.transform = "translateY(100px)";
				thats.getElementsByClassName("lyric")[0].slide(500);
			}
			i=0;
			//thats.audio.pause();
		};
	}
	if(this.audio.onpause === null){
		this.audio.onpause = function(){
			thats.playicon("pause",lists);
		}
	}

	if(this.audio.onplay === null){
		this.audio.onplay = function(){
			if(thats.lyric.check === true && thats.getElementsByClassName("lyric")[0].style.display === "none"){
				thats.getElementsByClassName("lyric")[0].slide(500);
			}
			thats.playicon("play",lists);
		};
	}else{
			if(thats.lyric.check === true && thats.getElementsByClassName("lyric")[0].style.display === "none"){
				thats.getElementsByClassName("lyric")[0].slide(500);
			}
	}

    //This is LYRICs Break.
    if(this.lyric.check === true){
    	if(lists.lyricprimary.style.transform === ""){
    		lists.lyricprimary.style.transform = "translateY(100px)";
    	}else{
    		lists.lyricprimary.style.marginTop = "100px";
    		var m = true;
    	}
    	var i=0;
    	if(thats.audio.ontimeupdate === null){
	    	thats.audio.ontimeupdate = function(){
		    	if(i < (lists.lrc.length-1)){
		    		do{
		    			if(thats.paused !== true && i <= (lists.lrc.length) && lists.lrc[i].getAttribute("time")<=thats.audio.currentTime){
		    				if(thats.getElementsByClassName("lyric-context")[0]) thats.getElementsByClassName("lyric-context")[0].classList.toggle("lyric-context");
		    				lists.lrc[i].classList.toggle("lyric-context");
		    				lists.lyricprimary.style.transform = "translateY("+(-(thats.getElementsByClassName("lyric-context")[0].offsetTop-thats.getElementsByClassName("lyric-context")[0].parentNode.offsetTop)+parseInt(getComputedStyle(thats.getElementsByClassName("lyric-context")[0].parentNode.parentNode).height)/2 - thats.getElementsByClassName("lyric-context")[0].scrollHeight/2)+"px)";
		    				i++;
		    			}
		    		}while(lists.lrc[i].getAttribute("time")<=thats.audio.currentTime&&i < (lists.lrc.length-1));
		    		(function lrcu(){
		    			if(thats.paused !== true && i <= (lists.lrc.length) && lists.lrc[i].getAttribute("time")>thats.audio.currentTime && i>1){
		    				i--;
		    				if(thats.getElementsByClassName("lyric-context")[0]) thats.getElementsByClassName("lyric-context")[0].classList.toggle("lyric-context");
		    				lists.lrc[i].classList.toggle("lyric-context");
		    				lists.lyricprimary.style.transform = "translateY("+(-(thats.getElementsByClassName("lyric-context")[0].offsetTop-thats.getElementsByClassName("lyric-context")[0].parentNode.offsetTop)+parseInt(getComputedStyle(thats.getElementsByClassName("lyric-context")[0].parentNode.parentNode).height)/2 - thats.getElementsByClassName("lyric-context")[0].scrollHeight/2)+"px)";
		    				setTimeout(0,lrcu);
		    			}
		    		})();
		    	}else{
		    		if(thats.getElementsByClassName("lyric-context")[0]) thats.getElementsByClassName("lyric-context")[0].classList.toggle("lyric-context");
		    		lists.lrc[i].classList.toggle("lyric-context");
		    		lists.lyricprimary.style.transform = "translateY("+(-(thats.getElementsByClassName("lyric-context")[0].offsetTop-thats.getElementsByClassName("lyric-context")[0].parentNode.offsetTop)+parseInt(getComputedStyle(thats.getElementsByClassName("lyric-context")[0].parentNode.parentNode).height)/2 - thats.getElementsByClassName("lyric-context")[0].scrollHeight/2)+"px)";
		    		return;
		    	}
	    	};
	    }else{
	    	setInterval(function(){
		    	if(i < (lists.lrc.length-1)){
		    		do{
		    			if(thats.paused !== true && i <= (lists.lrc.length) && lists.lrc[i].getAttribute("time")<=thats.audio.currentTime){
		    				if(thats.getElementsByClassName("lyric-context")[0]) thats.getElementsByClassName("lyric-context")[0].classList.toggle("lyric-context");
		    				lists.lrc[i].classList.toggle("lyric-context");
		    				lists.lyricprimary.style.marginTop = (-(thats.getElementsByClassName("lyric-context")[0].offsetTop-thats.getElementsByClassName("lyric-context")[0].parentNode.offsetTop)+parseInt(getComputedStyle(thats.getElementsByClassName("lyric-context")[0].parentNode.parentNode).height)/2 - thats.getElementsByClassName("lyric-context")[0].scrollHeight/2)+"px";
		    				i++;
		    			}
		    		}while(lists.lrc[i].getAttribute("time")<=thats.audio.currentTime&&i < (lists.lrc.length-1));
		    		(function lrcu(){
		    			if(thats.paused !== true && i <= (lists.lrc.length) && lists.lrc[i].getAttribute("time")>thats.audio.currentTime && i>1){
		    				i--;
		    				if(thats.getElementsByClassName("lyric-context")[0]) thats.getElementsByClassName("lyric-context")[0].classList.toggle("lyric-context");
		    				lists.lrc[i].classList.toggle("lyric-context");
		    				lists.lyricprimary.style.marginTop = (-(thats.getElementsByClassName("lyric-context")[0].offsetTop-thats.getElementsByClassName("lyric-context")[0].parentNode.offsetTop)+parseInt(getComputedStyle(thats.getElementsByClassName("lyric-context")[0].parentNode.parentNode).height)/2 - thats.getElementsByClassName("lyric-context")[0].scrollHeight/2)+"px";
		    				setTimeout(0,lrcu);
		    			}
		    		})();
		    	}else{
		    		if(thats.getElementsByClassName("lyric-context")[0]) thats.getElementsByClassName("lyric-context")[0].classList.toggle("lyric-context");
		    		lists.lrc[i].classList.toggle("lyric-context");
		    		lists.lyricprimary.style.marginTop = (-(thats.getElementsByClassName("lyric-context")[0].offsetTop-thats.getElementsByClassName("lyric-context")[0].parentNode.offsetTop)+parseInt(getComputedStyle(thats.getElementsByClassName("lyric-context")[0].parentNode.parentNode).height)/2 - thats.getElementsByClassName("lyric-context")[0].scrollHeight/2)+"px";
		    		return;
		    	}
	    	},200);
	    }
    };
    lists.button.plays.onclick = function(){
    	if(thats.audio.paused === false){
    		thats.audio.pause();
    		if(thats.audio.onpause === undefined) thats.playicon("pause",lists);
    	}else{
    		thats.audio.play();
    		if(thats.audio.onplay === undefined) thats.playicon("play",lists);
    	};
    };
    lists.button.volumeButton.onclick = function(){
		if(thats.audio.volume === 0){
			lists.icon.volumeButton.classList.add('volume_up');
			if(lists.icon.volumeButton.classList.contains("volume_mute")) lists.icon.volumeButton.classList.remove('volume_mute');
			thats.audio.volume = 1;
		}else{
			lists.icon.volumeButton.classList.add('volume_mute');
			if(lists.icon.volumeButton.classList.contains("volume_up")) lists.icon.volumeButton.classList.remove('volume_up');
			thats.audio.volume = 0;
		}
    };
};


window.onload = function(){
		for(var key = 0;key <= (document.getElementsByClassName("player").length-1);key++){
			try{
				document.getElementsByClassName("player")[key].cPlayer();
			}catch(e){
				alert(e);
			}
		}
};
