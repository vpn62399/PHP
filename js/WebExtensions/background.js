(function () {
	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (tab.url.indexOf('https://tm.minagine.net/mypage/list') > -1) {
			chrome.scripting.executeScript(
				{
					target: { tabId: tab.id },
					files: ['onminagine.js'],
				}
			);
		}
	});
})() 