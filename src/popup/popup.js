document.addEventListener('DOMContentLoaded', function() {
    const disableCheckbox = document.getElementById('disableToggle');
    const githubToken = document.getElementById('githubToken');

    console.log("HAHA2");

    chrome.storage.local.get('disabled', function(data) {
        disableCheckbox.checked = data.disabled;
    });

    chrome.storage.local.get('githubToken', function(data) {
        githubToken.value = data.githubToken;
    });

    disableCheckbox.addEventListener('change', function() {
        chrome.storage.local.set({'disabled': disableCheckbox.checked});
        refreshIfNotDisabled();
    });

    githubToken.addEventListener('change', function(e) {
        console.log(e)
        chrome.storage.local.set({'githubToken': e.target.value});
        // chrome.storage.local.set({'disabled': checkbox.checked});
        // refreshIfNotDisabled();
    });

    function refreshIfNotDisabled() {
        if (disableCheckbox.checked) {
            return;
        }

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var currentTab = tabs[0];
            if (currentTab) {
                chrome.runtime.sendMessage({refreshTab: true, tabId: currentTab.id});
            }
        });
    }
});

