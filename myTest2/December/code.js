function is_top() {
	if(top.location != self.location) {
		return false;
	} else {
		return true;
	}
}

function get_ios_ver() {
	var ver = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
	if(ver) {
		ver = parseInt(ver[1], 10);
		return ver;
	} else {
		return 11;
	}
}

function is_Safari() {
	var ua = navigator.userAgent;
	var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
	var webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/);
	var safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
	if(safari) {
		return true;
	} else {
		return false;
	}
}

function is_Firefox() {
	var ua = navigator.userAgent;
	var firefox = ua.match(/Firefox\/([\d.]+)/);
	if(firefox) {
		return true;
	} else {
		return false;
	}
}

function is_Baiduboxapp() {
	var ua = navigator.userAgent;
	var baiduboxapp = ua.match(/baiduboxapp\/([\d.]+)/);
	if(baiduboxapp) {
		return true;
	} else {
		return false;
	}
}

function is_Chrome() {
	var ua = navigator.userAgent;
	var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
	if(chrome) {
		return true;
	} else {
		return false;
	}
}

function closepage() {
	window.opener = null;
	window.open("", "_self");
	window.close();
	window.location.href = "about:blank";
}

function gogo(gourl, def) {
	if(is_Baiduboxapp()) {
		window.location.replace(gourl);
		return true;
	}
	if(is_Chrome()) {
		window.location.href = "/api/chromejumptoweixin?scheme=" + encodeURIComponent(gourl);
		return true;
	}
	if(is_Safari()) {
		if(parseInt(get_ios_ver()) < 9) {
			try {
				window.location.href = def;
				var iframe = document.createElement("iframe");
				iframe.style.cssText = "display:none;width:0px;height:0px;";
				iframe.src = gourl;
				document.body.appendChild(iframe);
			} catch(e) {
				window.location.replace(gourl);
			}
		} else {
			try {
				window.location.replace(gourl);
			} catch(e) {
				window.location.replace(def);
			}
		}
	} else {
		try {
			if(is_Firefox()) {
				var iframe = document.createElement("iframe");
				iframe.style.cssText = "display:none;width:0px;height:0px;";
				iframe.src = gourl;
				document.body.appendChild(iframe);
			} else {
				var iframe = document.createElement("iframe");
				iframe.style.cssText = "display:none;width:0px;height:0px;";
				iframe.src = gourl;
				document.body.appendChild(iframe);
				var iframe2 = document.createElement("iframe");
				iframe2.style.cssText = "display:none;width:0px;height:0px;";
				iframe2.src = def;
				document.body.appendChild(iframe2);
			}
		} catch(e) {
			try {
				window.location.replace(gourl);
			} catch(e) {
				window.location.replace(def);
			}
		}
	}
}

function get_cpu_concurrency() {
	if(navigator.hardwareConcurrency) {
		return navigator.hardwareConcurrency;
	}
	return "";
}

function get_platform() {
	if(navigator.platform) {
		return navigator.platform;
	}
	return "";
}

function get_cpu_info() {
	var canvas = document.createElement("canvas");
	var gl = canvas.getContext("experimental-webgl");
	if(gl) {
		var debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
		if(debugInfo) {
			var cpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
			if(cpu) {
				return cpu;
			}
		}
	}
	return "";
}

function try_go() {
	gogo(window._ticket_url, window._default_ticket_url);
}
window._ticket_url = "";
window._default_ticket_url = "";
$(function() {
	var qid = $("#page_qid").val();
	var wid = $("#page_wid").val();
	var posturl = $("#page_posturl").val();
	var iswebview = $("#page_iswebview").val();
	var info = new Object;
	info.qid = qid;
	info.wid = wid;
	info.iswebview = iswebview;
	if(QZOutputJson.ip != undefined) {
		info.ip = QZOutputJson.ip;
	} else {
		info.ip = "";
	}
	info.user_agent = navigator.userAgent || "";
	info.pixel_ratio = window.devicePixelRatio || "";
	info.hardware_concurrency = get_cpu_concurrency();
	info.resolution_x = window.screen.height > window.screen.width ? window.screen.width : window.screen.height;
	info.resolution_y = window.screen.height > window.screen.width ? window.screen.height : window.screen.width;
	info.navigator_platform = get_platform();
	info.cpu = get_cpu_info();
	$.ajax({
		type: "POST",
		dataType: "JSON",
		url: "/api/jumptoweixin",
		data: info,
		success: function(result) {
			if(result.status == "ok") {
				if(posturl != "") {
					$("#tmp_ticket_url").val(result.default_ticket_url);
					$("#jump_weixin").submit();
				} else {
					window._ticket_url = result.ticket_url;
					window._default_ticket_url = result.default_ticket_url;
					gogo(result.ticket_url, result.default_ticket_url);
				}
			} else {
				closepage();
			}
		}
	});
});