angular.module('app', ['editServiceModule'])
	.controller('appCtrl', function($scope, qqFaceMap) {
		$scope.qqFaceMap = qqFaceMap;
		var sel = getSelection(),
			ran, btnEle;
		window.hasFaceBox = false;
		$(document).on('click keyup', '.edit-area', function(ev, param) {
			if(param != 'forFace') {
				ran = sel.getRangeAt(0)
			}
		}).on('click', '.qqface-btn', function(ev) {
			btnEle = ev.target;
			var y = ev.clientY,
				top;
			if(y - 270 > 0) {
				top = y - 250
			} else {
				top = y + 20
			}

			$('.facebox').css({
				top: top
			}).show()
		}).on('click', function(ev) {
			console.log(ev)
			if($(ev.target).hasClass('qqface-btn')) {
				return;
			}
			if($(ev.target).parents('.facebox').length > 0) {
				return;
			}
			console.log('hide')
			$('.facebox').hide();
		})
		$scope.faceClick = function(data) {
			//			commonAncestorContainer
			var wrapper = $(btnEle).parents('.edit-wrapper').get(0),
				container = ran && ran.commonAncestorContainer,
				ranWrapper = ran ? $(container).parents('.edit-wrapper').get(0) : false;
			var img = document.createElement('img');
			img.setAttribute('class', 'qqemoji qqemoji' + data.id + ' middle');
			img.setAttribute('text', '[' + data.text + ']' + '_web');
			img.setAttribute('src', 'http://chat.51zan.com/img/spacer.gif');

			if(wrapper == ranWrapper && ($(container).hasClass('edit-area') || $(container).parents('.edit-area').length > 0)) {

				ran.deleteContents()
				ran.insertNode(img)
				ran.setStartAfter(img)
			} else {

				$(wrapper).find('.edit-area').append(img)
			}
			//			$(wrapper).find('.edit-area').trigger('keyup');
			setTimeout(function() {
				$(wrapper).find('.edit-area').trigger('keyup', 'forFace');
				wrapper = null;
			})
		}

		$scope.dataModel = "Hello[惊讶][惊恐][白眼][惊恐][抓狂][嘘][愉快][白眼][憨笑][疑问]";
		
	})
	