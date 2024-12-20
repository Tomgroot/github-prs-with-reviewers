chrome.runtime.onInstalled.addListener(function(details) {

});

chrome.runtime.onMessage.addListener(function(request, sender) {
    if(request.redirect) {
        chrome.tabs.update(sender.tab.id, {url: request.redirect}, function() {
            let tabId = sender.tab.id;
            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                if (tabId == tabId && changeInfo.status === 'complete') {
                    chrome.tabs.remove(tabId);
                    chrome.tabs.onUpdated.removeListener(listener);
                }
            });
        });
    }
});
