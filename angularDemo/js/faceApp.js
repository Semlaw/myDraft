angular.module('app', [])
	.controller('emojiFaceCtrl', ['$scope', '$rootScope', "qqFaceMap",
		function($scope, $rootScope, qqFaceMap) {
			//发送内容表情
			$scope.isShow = false;
			$rootScope.faceType = 0;
			$(document).click(function() {
				$scope.$apply(function() {
					$scope.isShow = false;
				})
			});

			$scope.getEditArea = function(e) {
				console.log('getEdit')
				var ev = e.target;
				if(ev.id == 'chatEditArea' || ev.className == 'face') {
					if(window.getSelection) {
						$rootScope.getsel = window.getSelection();
						$rootScope.range = $rootScope.getsel.getRangeAt(0);
					}
				}
				$rootScope.emojiClick = true;
			}
			$scope.panel = function(e) {
				e.stopPropagation();
			}
			$scope.emojiBtn = function(e) {
				e.stopPropagation();
				$scope.isShow = !$scope.isShow;
			}
			$scope.checkedFace = function($event, face) {
				var target = $event.target;
				var action = target.checked;
				if(action == true) {
					$rootScope.faceType = 1;
				} else {
					$rootScope.faceType = 0;
				}
			}

			$rootScope.QQFaceMap = qqFaceMap;

			var o, A, t, n;
			$scope.selectFace = function(data, e) {

				var img = document.createElement('img');
				img.setAttribute('class', 'qqemoji qqemoji' + data.id + ' middle');
				img.setAttribute('text', '[' + data.text + ']');
				img.setAttribute('src', './img/spacer.gif');
				if($rootScope.emojiClick) {
					console.log('middle')
					$scope.insertToEditArea(img, e);

				} else {
					console.log('append')
					$('.editArea').append('<img class="qqemoji qqemoji' + data.id + ' middle" text="[' + data.text + ']" src="./img/spacer.gif">');
				}
			}
			$scope.insertToEditArea = function(r, e) {

				var ev = e.target;
				var n;
				if(window.getSelection) {
					n = $rootScope.range;
					o = $rootScope.getsel;
					n.deleteContents();
					var f;
					if(n.createContextualFragment) {
						f = n.createContextualFragment(r);
					} else {
						var a = document.createElement('div');
						a.innerHTML = r,
							f = document.createDocumentFragment();
						for(var i, c; i = a.firstChild;) c = f.appendChild(i)
					}

					var s = r;
					var s = f.lastChild = r;
					var c = document.createRange();
					n.insertNode(r);
					n.setStartAfter(s);
					o.removeAllRanges();
					o.addRange(n);
				}
			}
		}
	])
	.factory("qqFaceMap", function() {
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
		}];
	})

	.controller('commentEmojiCtrl', ['$scope', '$rootScope', '$timeout',
		function($scope, $rootScope, $timeout) {
			//发送内容表情
			$scope.isShow = false;
			
			$scope.calcLength = function(str){
				$scope.regStr()
				if(str){
					return str.length
				}else{
					return '0'
				}
				
			}
			
			$scope.regStr = function(){
				var str = $scope.comment
				if(str&&str.length>300){
					var div = document.createElement('div');
					div.innerHTML = str
					if(div.lastChild.nodeType==1){
						div.lastChild.remove();
						$scope.comment = div.innerHTML;
					}else{
						$scope.comment = str.substr(0,300);
					}
				}
			}
			
			
			$(document).click(function() {
				$scope.$apply(function() {
					$scope.isShow = false;
				})
			});

			$scope.getEditArea = function(e) {
				console.log('getEdit')
				var ev = e.target;
				if(ev.id == 'chatEditArea' || ev.className == 'face') {
					if(window.getSelection) {
						$rootScope.getsel = window.getSelection();
						$rootScope.range = $rootScope.getsel.getRangeAt(0);
					}
				}
				$rootScope.emojiClick = true;
			}
			$scope.panel = function(e) {
				event.stopPropagation();
			}
			$scope.commentemojiBtn = function(e) {
				e.stopPropagation();
				$scope.isShow = !$scope.isShow;
			}
			$scope.checkedFace = function($event, face) {
				var target = $event.target;
				var action = target.checked;
				if(action == true) {
					$rootScope.faceType = 1;
				} else {
					$rootScope.faceType = 0;
				}
			}

			$rootScope.QQFaceMap = [{
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
			}];
			var o, A, t, n;
			$scope.commentSelectFace = function(data, e) {
				var img = document.createElement('img');
				img.setAttribute('class', 'qqemoji qqemoji' + data.id + ' middle');
				img.setAttribute('text', '[' + data.text + ']');
				img.setAttribute('src', '../../images/spacer.gif?v=20160929');
				//	        	if($rootScope.emojiComClickFlag){
				$scope.insertToEditArea(img, e);

				//	        	}else{
				//	        		$('.editComment').append('<img class="qqemoji qqemoji'+data.id+' middle" text="['+data.text+']" src="../../images/spacer.gif?v=20160929">');
				//	        	}
			}
			$scope.insertToEditArea = function(r, e) {
				console.dir('commentEmojiCtrl')
				var ev = e.target;
				var n;
				if(window.getSelection) {
					n = $rootScope.range;
					o = $rootScope.getsel;
					n.deleteContents();
					var f;
					if(n.createContextualFragment) {
						f = n.createContextualFragment(r);
					} else {
						var a = document.createElement('div');
						a.innerHTML = r,
							f = document.createDocumentFragment();
						for(var i, c; i = a.firstChild;) c = f.appendChild(i)
					}
					var s = f.lastChild = r;
					var c = document.createRange();
					n.insertNode(r);
					n.setStartAfter(s);
					o.removeAllRanges();
					o.addRange(n);
				}
			}
			//	        $rootScope.commentgetEditArea = function(e){
			//	    		var ev = e.target;
			//	    		if(ev.id == 'commentEdit' || ev.className == 'face'){
			//					if(window.getSelection){
			//						$rootScope.getsel = window.getSelection();
			//						$rootScope.range = $rootScope.getsel.getRangeAt(0);
			//					}
			//				}
			//	    		$rootScope.emojiClick = true;
			//	    	}
			//			$rootScope.commentregArea = function(){
			//	    		$scope.Edit = $('#commentEdit').html();
			//	    		var regEdit = RegExp('(?!<img class="qqemoji.*?".*?>|<br|BR>)<.+?>','g');
			//	    		var regs = RegExp('</?[aApP][^>]*>|style="(.*?)"','g');
			//				$('#commentEdit').html($scope.Edit.replace(regEdit,'').replace(regs,''));
			//				var se = window.getSelection();
			//				se.modify('move','right','sentence');//移动光标
			//	    	}
			$scope.reg = function() {
				$scope.Edit = $('#chatEditArea').html();
				var regEdit = RegExp('(?!<img class="qqemoji.*?".*?>|<br|BR>)<.+?>', 'g');
				var regs = RegExp('</?[aApP][^>]*>|style="(.*?)"', 'g');
				$('#chatEditArea').html($scope.Edit.replace(regEdit, '').replace(regs, '').replace(/&nbsp;/g, ' '));
				var se = window.getSelection();
				//			se.modify('move', 'right', 'sentence'); //移动光标
			}
			$rootScope.commentpaste = function() {
				$timeout(function() {
					console.log('reg')
					$scope.reg()
				})
			}
			$rootScope.commentkeyUpClick = function(e) {
				//	    		$rootScope.commentgetEditArea(e);
				$scope.getEditArea(e)
			}
			$rootScope.commentkeydownClick = function(e) {
				//				alert('commentkeydownClick')
				var ev = e || window.event;
				var sel, rang, br, fixbr, node, inner, tempRange, offset;
				var o = e.keyCode,
					that = e.currentTarget;
				if(o === 13) {
					if(ev.preventDefault) {
						ev.preventDefault(); //取消事件的默认动作
					} else {
						ev.returnValue = false;
					}
					console.dir(ev)

					if(ev.ctrlKey) {
						if(window.getSelection) {
							br = document.createElement('br');
							sel = window.getSelection();
							rang = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
							if(rang === null) {
								return false;
							};
							rang.deleteContents();
							node = sel.focusNode;
							inner = true;
							//if (true) {
							if(browser.chrome || browser.safari || browser.firefox) {
								tempRange = rang.cloneRange();
								tempRange.selectNodeContents(that);
								tempRange.setEnd(rang.endContainer, rang.endOffset);
								offset = tempRange.toString().length;
								if(offset == that.textContent.length && that.querySelectorAll("#edit-div br[type='_moz']").length == 0) {
									fixbr = br.cloneNode();
									rang.insertNode(fixbr);
								}
							}
							rang.insertNode(br);
							if(document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("Range", "2.0")) {
								tempRange = document.createRange();
								tempRange.selectNodeContents(that);
								tempRange.setStart(rang.endContainer, rang.endOffset);
								tempRange.setEnd(rang.endContainer, rang.endOffset);
								sel.removeAllRanges();
								sel.addRange(tempRange);
							}
						}
					} else {
						var editAreaCont = $('#chatEditArea').html();
						editAreaCont = editAreaCont.replace(/<(?:img|IMG).*?text="(.*?)".*?>/g, '$1').replace(/<(?:br|BR)\/?>/g, "\n").replace(/&nbsp;/g, ' ').replace(/\<.*?\>/g, '');
						console.dir(editAreaCont)
					}

				}
				if(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
					if(e.keyCode === 86) {
						setTimeout(function() {
							$scope.reg()
						}, 50);
					}
				}
			}
			//判断浏览器
			$(function() {
				window.browser = {};
				if(navigator.userAgent.indexOf("MSIE") > 0) {
					browser.name = 'MSIE';
					browser.ie = true;
				} else if(navigator.userAgent.indexOf("Firefox") > 0) {
					browser.name = 'Firefox';
					browser.firefox = true;
				} else if(navigator.userAgent.indexOf("Chrome") > 0) {
					browser.name = 'Chrome';
					browser.chrome = true;
				} else if(navigator.userAgent.indexOf("Safari") > 0) {
					browser.name = 'Safari';
					browser.safari = true;
				} else if(navigator.userAgent.indexOf("Opera") >= 0) {
					browser.name = 'Opera';
					browser.opera = true;
				} else {
					browser.name = 'unknow';
				}
			})
		}
	])
	.directive('contenteditable', function() {
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function(scope, element, atrrs, ngModel) {
				if(!ngModel) return;
				ngModel.$render = function() {
					element.html(ngModel.$viewValue || '');
				}
				element.on('blur keyup change', function() {
					scope.$apply(read);
				});

				function read() {
					var html = element.html();
					ngModel.$setViewValue(html);
				}
			}
		}
	})