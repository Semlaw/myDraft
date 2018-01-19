(function($) {
	function compress(f, success) {
		console.log(f);
		// 压缩图片需要的一些元素和对象
		var reader = new FileReader(),
			img = new Image();

		// 选择的文件对象
		var file = null;

		// 缩放图片需要的canvas
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');

		// base64地址图片加载完毕后
		img.onload = function() {
			// 图片原始尺寸
			var originWidth = this.width;
			var originHeight = this.height;
			// 最大尺寸限制
			var maxWidth = 400,
				maxHeight = 400;
			// 目标尺寸
			var targetWidth = originWidth,
				targetHeight = originHeight;
			// 图片尺寸超过400x400的限制
			if(originWidth > maxWidth || originHeight > maxHeight) {
				if(originWidth / originHeight > maxWidth / maxHeight) {
					// 更宽，按照宽度限定尺寸
					targetWidth = maxWidth;
					targetHeight = Math.round(maxWidth * (originHeight / originWidth));
				} else {
					targetHeight = maxHeight;
					targetWidth = Math.round(maxHeight * (originWidth / originHeight));
				}
			}

			// canvas对图片进行缩放
			canvas.width = targetWidth;
			canvas.height = targetHeight;
			// 清除画布
			context.clearRect(0, 0, targetWidth, targetHeight);
			// 图片压缩
			context.drawImage(img, 0, 0, targetWidth, targetHeight);
			// canvas转为blob并上传
			canvas.toBlob(success, f.type || 'image/png')
		};

		// 文件base64化，以便获知图片原始尺寸
		reader.onload = function(e) {
			img.src = e.target.result;
		};
		reader.readAsDataURL(f);
	}

	function upload(opt) {
		this.append('<input style="display:none" type="file" accept="' + (opt.accept || 'image/jpg,image/jpeg,image/png') + '" />')
		this.on("click", function(ev) {
				if(ev.target.nodeName != "INPUT" || ev.target.tagName != "INPUT") {
					$(this).find("input[type='file']").click()
				}
			})
			.find("input[type='file']").on("change", function() {
				var f = this.files[0]
				if(f) {
					function compressHandle(b) {
						var xhr = new XMLHttpRequest();
						var data = new FormData();
						if(f.name) b = new File([b],f.name);
						data.append('file', b);
						xhr.onreadystatechange = function(status) {
							if(xhr.readyState == 4) {
								if(opt && typeof opt.callback == 'function') {
									opt.callback(xhr.responseText);
								}
							}
						}
						xhr.onerror = function() {
							if(opt && typeof opt.err == 'function') {
								opt.err(xhr.responseText);
							}
							console.error("上传失败");
						}
						xhr.open('POST', opt && opt.dist || 'http://client.51zan.com/rest/front/storage/upload');
						xhr.send(data);
					}
					console.log('excute compress')
					compress(f,compressHandle);
				}
			})

	}
	$.fn.extend({
		initUpload: upload
	})
})(jQuery)