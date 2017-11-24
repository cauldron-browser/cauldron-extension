// https://stackoverflow.com/questions/15572595/chrome-extension-access-to-variables-of-a-background-js-from-a-popup-jsp
var background = chrome.extension.getBackgroundPage(); //do this in global scope for popup.js

var $checkbox = $('.ui.checkbox');

if (background.extension_enabled) {
    $checkbox.checkbox('set checked');
    chrome.browserAction.setIcon({path: '../../icons/icon16.png'});
}
else {
    $checkbox.checkbox('set unchecked');
    chrome.browserAction.setIcon({path: '../../icons/icon16bw.png'});
}

$checkbox.checkbox({
    onChecked: function() {
        chrome.storage.sync.set({'caching': true});
        chrome.browserAction.setIcon({path: '../../icons/icon16.png'});
        background.extension_enabled = true;
    },
    onUnchecked: function() {
        chrome.storage.sync.set({'caching': false});
        chrome.browserAction.setIcon({path: '../../icons/icon16bw.png'});
        background.extension_enabled = false;
    }
});