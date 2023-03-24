(function () {
	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (tab.url.indexOf('https://tm.minagine.net') > -1) {
			chrome.scripting.executeScript(
				{
					target: { tabId: tab.id },
					files: ['onminagine.js'],
				}
			);
		}
		if (tab.url.indexOf('https://www.aiuto-jp.co.jp/') > -1) {
			chrome.scripting.executeScript(
				{
					target: { tabId: tab.id },
					files: ['test.js'],
				}
			);
		}
	});
})() 