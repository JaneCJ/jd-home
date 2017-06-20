window.onload = function (){
	closeHeadAd();
	choseCity();
	myJD();
	getNavs();
	getBanner();
	getNotice();
	seckill();
}
function $(id){
	return typeof id==="string"?document.getElementById(id):id;
}
function closeHeadAd(){
	var ad = $("head_ad");
	var close = $("close");
	close.onclick = function(){
		ad.style.opacity = "0";
		setTimeout(function(){
			ad.style.display = "none";
		},500);
	}
}
function choseCity(){
	var curr = $("cities");
	var local = $("local");
	var city = $("chose_city");
	var cities = city.querySelectorAll("a");
	curr.onmouseover = function(){
		local.className = "local_on";
		city.style.display = "block";
	}
	curr.onmouseout = function(){
		local.className = "local";
		city.style.display = "none";
	}
	for (var i = 0; i < cities.length; i++) {
		cities[i].onclick = function(){
			if(this.className == "a_on"){
				return;
			}else {
				for (var j = 0; j < cities.length; j++) {
					cities[j].className = "";
				}
				this.className = "a_on";
				local.querySelector("b").innerHTML = this.innerHTML;
			}
		}
	}
}
function myJD(){
	var myJd = $("my_jd");
	var tit = $("my_jd_tit");
	var pop = $("my_jd_pop");
	myJd.onmouseover = function(){
		tit.className = "my_jd_on";
		pop.style.display = "block";
	}
	myJd.onmouseout = function(){
		tit.className = "my_jd_tit";
		pop.style.display = "none";
	}
}
function getNavs(){
	var lis = document.querySelectorAll("#nav_main>ul>li");
	var pop = $("nav_pop");
	for (var i = 0; i < lis.length; i++) {
		lis[i].onmouseover = function(){
			this.style.background = "#999395";
			pop.style.display = "block";
		}
		lis[i].onmouseout = function(){
			this.style.background = "";
			pop.style.display = "none";
		}
	}
}
function getBanner(){
	var prev = $("prev");
	var next = $("next");
	var imglist = $("imglist");
	var cuts = $("cuts").querySelectorAll("span");
	var index = 1;
	var len = 5;
	var animated = false;
	var timer;		

	function animate(offset){
		var left = parseInt(imglist.style.left)+offset;
		var time = 100;
		var interval = 10;
		var speed = offset/(time/interval);
		function go(){
			animated = true;
			if((speed>0 && parseInt(imglist.style.left)<left) || (speed<0 && parseInt(imglist.style.left)>left)){
				imglist.style.left = parseInt(imglist.style.left) + speed + "px";
				setTimeout(go,interval);
			}else {
				imglist.style.left = left + "px";
				if(left>-790){
					imglist.style.left = -790*len + "px";
				}else if(left<(-790*len)){
					imglist.style.left ="-790px";
				}
				animated = false;
			}
		}
		go();
	}
	function showBtn(){
		for (var i = 0; i < cuts.length; i++) {
			if(cuts[i].className == "on"){
				cuts[i].className = "";
				break;
			}
		}
		cuts[index-1].className = "on";
	}
	for (var i = 0; i < cuts.length; i++) { 
		
		cuts[i].onmouseover = function(){	
			if(animated){
					return;
			}else if (this.className == "on"){
					return;
			}		
			var myIndex = parseInt(this.getAttribute("index"));//取到的index属性是字符串，所以转number;
			var offset = -790*(myIndex - index);
			animate(offset);
			index = myIndex;
			showBtn();
		}
	}
	prev.onclick = function(){
		if(animated){
			return;
		}
		if(index == 1){
			index = 5;
		}else{
			index -= 1;
		}			
		animate(790);		
		showBtn();
	}
	next.onclick = function(){
		if(animated){
			return;
		}
		if(index == 5){
			index = 1;
		}else{
			index += 1;
		}
		animate(-790);
		showBtn();
	}
	function play(){
		timer = setInterval(function(){
			next.onclick();
		},2000);
	}
	function stop(){
		clearTimeout(timer);
	}
	banner.onmouseover = stop;
	banner.onmouseout = play;
	play();
}
function getNotice(){
	var tits = document.querySelectorAll("#notice_tit>a");
	var cons = $("notice_con").getElementsByTagName("div");
	var index = 0;
	var line = $("notice_line");
	var offset = 0;
	for (var i = 0; i < tits.length; i++) {
		tits[i].id = i;
		tits[i].onmouseover = function(){
			for (var j = 0; j < tits.length; j++) {
				cons[j].style.display = "none";
			}
			cons[this.id].style.display = "block";
			if(this.id==index){
				return;
			}else{
				offset += 51*(this.id-index);
				line.style.transform = "translateX("+offset+"px)";
				index = this.id;
			}
		}
	}
}
function seckill(){
	var times = $("sec_tit_count").getElementsByTagName("b");
	var timer;
	timer = setInterval(function(){
		var mh = parseInt(times[0].innerHTML);
		var mm = parseInt(times[1].innerHTML);
		var ms = parseInt(times[2].innerHTML);
		ms--;
		if(ms>=10){
			times[2].innerHTML=""+ms;
		}else if(ms<0){
			mm--;
			if(mm>=10){
				times[1].innerHTML=""+mm;
				times[2].innerHTML="59";
			}else if(mm<0){
				mh--;
				if(mh<0){
					clearInterval(timer);
					timer=null;
				}else{
					times[0].innerHTML="0"+mh;
					times[1].innerHTML="59";
					times[2].innerHTML="59";
				}
			}else{
				times[1].innerHTML="0"+mm;
			}
		}else{
			times[2].innerHTML="0"+ms;
		}
	},1000);
}