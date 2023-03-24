onload = (function () {
	console.log('insert_js.js', window.location.pathname);
	// 業務開始
	// scr(8, 51, 'button0')
	// // 業務終了
	// scr(18, 1, 'button1')
	if (typeof scr === 'function') {
		scr(8, 31, 55, 'button0');
		scr(18, 0, 55, 'button1');
	}
	console.log('onload');
})



