var oCurrentTime = document.getElementsByClassName("current-time")[0],
	oAllTime = document.getElementsByClassName("all-time")[0],
	oBtn = document.getElementsByClassName("btn")[0],
	oPlayBtn = oBtn.getElementsByTagName("i")[0],
	oProActive = document.getElementsByClassName("active")[0],
	oProBox = document.getElementsByClassName("pro-box")[0],
	oRadioBox = document.getElementsByClassName("radio-box")[0],
	oAudio = document.getElementById("audio");
var sil,
	bgWidth = 232,
	oDuration;

setTimeout(function(){
	oDuration = oAudio.duration;
	oAllTime.innerHTML = TimeReplacement(oDuration);
},100)

//资源加载完成后
window.onload = function() {
	//时间初始化
	oCurrentTime.innerHTML = TimeReplacement(0);
	//图片旋转初始化
	audioImg.style.animationPlayState = "paused";
	//音量初始化
	oVolumeValue.innerHTML = oAudio.volume * 100;
	oVolumeActive.style.width = oAudio.volume / 1 * volumeWidth + 8 + "px";
}

// 时间装换
function TimeReplacement(time) {
	var s = parseInt(time % 60) < 10 ? "0" + parseInt(time % 60) : parseInt(time % 60);
	var min = parseInt(time / 60) < 10 ? "0" + parseInt(time / 60) : parseInt(time / 60);
	return min + ":" + s;
}

// 按下播放按钮
oBtn.onclick = function() {
	if (oAudio.paused) {
		musicPlay();
	} else {
		musicPause();
	}
}

// 音乐播放
function musicPlay() {
	oAudio.play();
	oPlayBtn.classList = "iconfont icon-zanting";
	sil = setInterval(promove, 200);
	audioImg.style.animationPlayState = "running";
}

// 音乐暂停
function musicPause() {
	oAudio.pause();
	oPlayBtn.classList = "iconfont icon-bofang";
	clearInterval(sil);
	audioImg.style.animationPlayState = "paused";
}

//音乐播放结束
oAudio.onended = function() {
	i++;
	musicPause();
	oProActive.style.width = 8 + "px";
	song(i);
	oCurrentTime.innerHTML = TimeReplacement(0);
	musicPlay();
}

// 进度条
function promove() {
	oCurrentTime.innerHTML = TimeReplacement(oAudio.currentTime);
	var proWidth = oAudio.currentTime / oDuration * bgWidth;
	oProActive.style.width = proWidth + 8 + "px";
	console.log(1)
}

//拖动进度条
oRadioBox.onmousedown = function() {
	var audioCurrentTime = oAudio.currentTime;
	clearInterval(sil);
	document.body.onmousemove = function(e) {
		var activeLen = e.clientX - oProBox.getBoundingClientRect().left;
		if (activeLen < 8) {
			activeLen = 8;
		} else if (activeLen > 240) {
			activeLen = 240;
		}
		oProActive.style.width = activeLen + "px";
		audioCurrentTime = (activeLen - 8) / bgWidth * oDuration;
		oCurrentTime.innerHTML = TimeReplacement(audioCurrentTime);

	}
	document.body.onmouseup = function() {
		document.body.onmousemove = null;
		document.body.onmouseup = null;
		musicPlay();
		oAudio.currentTime = audioCurrentTime;
	}
}

// 音量
var volume = document.getElementsByClassName("volume")[0],
	volumeBox = document.getElementsByClassName("volume-box")[0];
oVolumeActive = document.getElementsByClassName("volume-active")[0],
	oVolumeValue = document.getElementsByClassName("volume-value")[0],
	oVolumeBar = document.getElementsByClassName("volume-bar")[0],
	oRadioBox2 = document.getElementsByClassName("radio-box-2")[0];
var volumeWidth = 172,
	logic = true;

//显示音量框
volume.onclick = function() {
	if (logic) {
		volumeBox.style.display = "block";
	} else {
		volumeBox.style.display = "none";
	}
	logic = !logic;
}

//拖动音量条
oRadioBox2.onmousedown = function() {
	document.body.onmousemove = function(e) {
		var VolumeActiveLen = e.clientX - oVolumeBar.getBoundingClientRect().left;
		if (VolumeActiveLen < 8) {
			VolumeActiveLen = 8;
		} else if (VolumeActiveLen > 180) {
			VolumeActiveLen = 180;
		}
		oVolumeActive.style.width = VolumeActiveLen + "px";
		audioVolume = (VolumeActiveLen - 8) / volumeWidth;
		oVolumeValue.innerHTML = parseInt(audioVolume * 100);
		oAudio.volume = audioVolume;
	}
	document.body.onmouseup = function() {
		document.body.onmousemove = null;
		document.body.onmouseup = null;
	}
}

// 上下曲
var last = document.getElementsByClassName("last")[0],
	next = document.getElementsByClassName("next")[0],
	audioImg = document.getElementsByClassName("main")[0].getElementsByTagName("img")[0];
var i = 1;

last.onclick = function() {
	i--;
	song(i);
}

next.onclick = function() {
	i++;
	song(i);
}

function song(value) {
	musicPause();
	
	if (value > 5) {
		i = 1;
	}else if(value < 1){
		i = 5;
	}
	
	audioImg.src = "source/" + i + ".jpg";
	oAudio.src = "source/" + i + ".mp3";
	oAudio.load();
	oAudio.oncanplay = function() {
		oDuration = oAudio.duration;
		oAllTime.innerHTML = TimeReplacement(oDuration);
	}
	
	setTimeout(function(){
		musicPlay();
	},100)
}