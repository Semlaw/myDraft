addEventListener("message", function(evt) {
	var date = new Date();
	var currentDate = null;
	evt.data.stamp = +new Date;
	postMessage(evt.data);
	return;
	do {
		currentDate = new Date();
	} while (currentDate - date < evt.data);
	postMessage(currentDate);
}, false);