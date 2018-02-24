'use strict'
angular.module('editServiceModule', [])
	.factory('toFace', ['qqFaceMap', function(faceMap) {
		//replace(/<(?:img|IMG).*?text="(.*?)".*?>/g, '$1')
		return function(str, url) {
			url = url || 'http://chat.51zan.com/img/spacer.gif'
			if(str && typeof str == "string") {
				faceMap.forEach(function(item, idx) {
					var reg = new RegExp("\\\[" + item.text + "\\\]", "g")
					str = str.replace(reg, '<img class="qqemoji qqemoji' + item.id + ' middle" text="[' + item.text + ']_web" src="' + url + '">')
				})
				return str;

			} else {
				return str;
			}
		}
	}])
	.factory('faceInputReg', ['qqFaceMap', 'toFace', function(qqFaceMap, toFace) {
		return function(ipt, length) {
			length = length || 500;
			ipt = ipt || '';
			var txt;
			//			ipt = ipt.replace(/<br>/g, '\n');
			txt = ipt.replace(/<(?:img|IMG).*?text="(.*?)".*?>/g, '$1').replace(/_web/g, '');
			var div = document.createElement('div');
			while(txt.length > length) {
				//				var div = document.createElement('div');
				div.innerHTML = ipt;
				if(div.lastChild.nodeType == 1) {
					div.lastChild.remove();
					ipt = div.innerHTML;
					txt = div.innerHTML.replace(/<(?:img|IMG).*?text="(.*?)".*?>/g, '$1').replace(/_web/g, '');
				} else {
					txt = txt.substr(0, length);
					ipt = toFace(txt);
					break;
				}
			}
			return ipt.replace(/\n/g, '<br>')
		}
	}])
	.directive('faceEditable', ['toFace', 'faceInputReg', function(toFace, faceInputReg) {
		function filter(html) {
			html = toTxt(html.replace(/<br>/g, '\n'));
			var div = document.createElement('div'),txt;
			div.innerHTML = html;
			txt = div.innerText;
			return toFace(txt.replace(/\n/g,'<br>'))
		}

		function toTxt(ipt) {
			return ipt.replace(/<(?:img|IMG).*?text="(.*?)".*?>/g, '$1').replace(/_web/g, '');
		}

		return {
			restrict: 'A',
			require: '?ngModel',
			link: function(scope, element, attrs, ngModel) {
				console.dir(ngModel)
				if(!ngModel) return;
				var max = attrs.maxModelLength || '';
				ngModel.$parsers.push(toTxt);
				ngModel.$formatters.push(toFace)
				ngModel.$render = function() {
					ngModel.$viewValue!==element.html()&& element.html(ngModel.$viewValue || '');
				}
				element.bind('blur keyup change paste', function(ev) {
					scope.$apply(read);
				});
				element.bind('keypress', function(ev) {
					if(ev.keyCode == 13 || ev.key == 'Enter') {
						ev.preventDefault()
						var br = document.createElement('br');
						var ran = getSelection().getRangeAt(0);
						ran.deleteContents()
						ran.insertNode(br)
						ran.setStartAfter(br)
					}
				})

				function read() {
					var prehtml = element.html(),html,val;
					html = filter(prehtml);
					prehtml!==html&&element.html(html);
					val = faceInputReg(html, max);
					html !== val && element.html(val);
					ngModel.$setViewValue(val);
				}
			}
		}
	}])
	.factory('qqFaceMap', function() {
		return [{
			text: "微笑",
			id: 0
		}, {
			text: "撇嘴",
			id: 1
		}, {
			text: "色",
			id: 2
		}, {
			text: "发呆",
			id: 3
		}, {
			text: "得意",
			id: 4
		}, {
			text: "流泪",
			id: 5
		}, {
			text: "害羞",
			id: 6
		}, {
			text: "闭嘴",
			id: 7
		}, {
			text: "睡",
			id: 8
		}, {
			text: "大哭",
			id: 9
		}, {
			text: "尴尬",
			id: 10
		}, {
			text: "发怒",
			id: 11
		}, {
			text: "调皮",
			id: 12
		}, {
			text: "呲牙",
			id: 13
		}, {
			text: "惊讶",
			id: 14
		}, {
			text: "难过",
			id: 15
		}, {
			text: "酷",
			id: 16
		}, {
			text: "冷汗",
			id: 17
		}, {
			text: "抓狂",
			id: 18
		}, {
			text: "吐",
			id: 19
		}, {
			text: "偷笑",
			id: 20
		}, {
			text: "愉快",
			id: 21
		}, {
			text: "白眼",
			id: 22
		}, {
			text: "傲慢",
			id: 23
		}, {
			text: "饥饿",
			id: 24
		}, {
			text: "困",
			id: 25
		}, {
			text: "惊恐",
			id: 26
		}, {
			text: "流汗",
			id: 27
		}, {
			text: "憨笑",
			id: 28
		}, {
			text: "悠闲",
			id: 29
		}, {
			text: "奋斗",
			id: 30
		}, {
			text: "咒骂",
			id: 31
		}, {
			text: "疑问",
			id: 32
		}, {
			text: "嘘",
			id: 33
		}, {
			text: "晕",
			id: 34
		}, {
			text: "疯了",
			id: 35
		}, {
			text: "衰",
			id: 36
		}, {
			text: "骷髅",
			id: 37
		}, {
			text: "敲打",
			id: 38
		}, {
			text: "再见",
			id: 39
		}, {
			text: "擦汗",
			id: 40
		}, {
			text: "抠鼻",
			id: 41
		}, {
			text: "鼓掌",
			id: 42
		}, {
			text: "糗大了",
			id: 43
		}, {
			text: "坏笑",
			id: 44
		}, {
			text: "左哼哼",
			id: 45
		}, {
			text: "右哼哼",
			id: 46
		}, {
			text: "哈欠",
			id: 47
		}, {
			text: "鄙视",
			id: 48
		}, {
			text: "委屈",
			id: 49
		}, {
			text: "快哭了",
			id: 50
		}, {
			text: "阴险",
			id: 51
		}, {
			text: "亲亲",
			id: 52
		}, {
			text: "吓",
			id: 53
		}, {
			text: "可怜",
			id: 54
		}, {
			text: "菜刀",
			id: 55
		}, {
			text: "西瓜",
			id: 56
		}, {
			text: "啤酒",
			id: 57
		}, {
			text: "篮球",
			id: 58
		}, {
			text: "乒乓",
			id: 59
		}, {
			text: "咖啡",
			id: 60
		}, {
			text: "饭",
			id: 61
		}, {
			text: "猪头",
			id: 62
		}, {
			text: "玫瑰",
			id: 63
		}, {
			text: "凋谢",
			id: 64
		}, {
			text: "嘴唇",
			id: 65
		}, {
			text: "爱心",
			id: 66
		}, {
			text: "心碎",
			id: 67
		}, {
			text: "蛋糕",
			id: 68
		}, {
			text: "闪电",
			id: 69
		}, {
			text: "炸弹",
			id: 70
		}, {
			text: "刀",
			id: 71
		}, {
			text: "足球",
			id: 72
		}, {
			text: "瓢虫",
			id: 73
		}, {
			text: "便便",
			id: 74
		}, {
			text: "月亮",
			id: 75
		}, {
			text: "太阳",
			id: 76
		}, {
			text: "礼物",
			id: 77
		}, {
			text: "拥抱",
			id: 78
		}, {
			text: "强",
			id: 79
		}, {
			text: "弱",
			id: 80
		}, {
			text: "握手",
			id: 81
		}, {
			text: "胜利",
			id: 82
		}, {
			text: "抱拳",
			id: 83
		}, {
			text: "勾引",
			id: 84
		}, {
			text: "拳头",
			id: 85
		}, {
			text: "差劲",
			id: 86
		}, {
			text: "爱你",
			id: 87
		}, {
			text: "NO",
			id: 88
		}, {
			text: "OK",
			id: 89
		}, {
			text: "爱情",
			id: 90
		}, {
			text: "飞吻",
			id: 91
		}, {
			text: "跳跳",
			id: 92
		}, {
			text: "发抖",
			id: 93
		}, {
			text: "怄火",
			id: 94
		}, {
			text: "转圈",
			id: 95
		}, {
			text: "磕头",
			id: 96
		}, {
			text: "回头",
			id: 97
		}, {
			text: "跳绳",
			id: 98
		}, {
			text: "投降",
			id: 99
		}, {
			text: "激动",
			id: 100
		}, {
			text: "乱舞",
			id: 101
		}, {
			text: "献吻",
			id: 102
		}, {
			text: "左太极",
			id: 103
		}, {
			text: "右太极",
			id: 104
		}]
	})