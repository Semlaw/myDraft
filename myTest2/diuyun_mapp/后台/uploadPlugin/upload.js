(function($) {
	function upload(opt) {
		this.append('<input style="display:none" type="file" accept="'+(opt.accept||'image/jpg,image/jpeg,image/png')+'" />')
		this.on("click",function(ev){
			if(ev.target.nodeName!="INPUT" || ev.target.tagName!="INPUT"){
				$(this).find("input[type='file']").click()
			}
		})
		.find("input[type='file']").on("change", function() {
			var f = this.files[0]
			if(f) {
				var xhr = new XMLHttpRequest()
				var data = new FormData()
				data.append('file', f)
				xhr.onreadystatechange = function(status) {
					if(xhr.readyState == 4) {
						if(opt && typeof opt.callback=='function'){
							opt.callback(xhr.responseText)
						}
					}
				}
				xhr.onerror = function(){
					if(opt && typeof opt.err=='function'){
							opt.err(xhr.responseText)
						}
					console.error("上传失败")
				}
				xhr.open('POST', opt&&opt.dist ||'http://client.51zan.com/rest/front/storage/upload')
				xhr.send(data)
			}
		})

	}
	$.fn.extend({
		initUpload: upload
	})
})(jQuery)