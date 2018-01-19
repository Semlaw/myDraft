function initPasteMenu() {
	$('body').on('contextmenu', function(ev) {
		ev.preventDefault;
		ev.stopPropagation();
		return false;
	});
	var activeInput;
	$('body').on('contextmenu', 'input',contextMenuHandle);
	$('body').click(function(){
		$('#myMenu_').hide();
	})
	$('body').on('click','.input_paste',function(ev){
		activeInput.value +=  10010;
		$(activeInput).trigger('keyup')
	})
	var tpl = '<div style="display:none;" id="myMenu_" class="dropdown contextMenu">' +
		'<ul class="dropdown_menu">' +
		'<li>' +
		'<a class="input_paste" href="javascript:;">粘贴</a>' +
		'</li>' +
		'</ul>' +
		'</div>';

	function contextMenuHandle(ev) {
		activeInput = this;
		$('#myMenu_').css({
			top: ev.clientY+5,
			left: ev.clientX+5,
			display: 'block'
		});
	}
	$('body').append(tpl);
}