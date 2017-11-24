$(document).ready(function() {
    var $checkbox = $('.ui.checkbox');

    chrome.storage.sync.get('caching', function(items) {
        if (items['caching']) {
            $checkbox.checkbox('set checked');
            chrome.browserAction.setIcon({path: '../../icons/icon16.png'});
        }
        else {
            $checkbox.checkbox('set unchecked');
            chrome.browserAction.setIcon({path: '../../icons/icon16bw.png'});
        }
    });
    $checkbox.checkbox({
        onChecked: function() {
            chrome.storage.sync.set({'caching': true}, function() {
                chrome.browserAction.setIcon({path: '../../icons/icon16.png'});
            });
        },
        onUnchecked: function() {
            chrome.storage.sync.set({'caching': false}, function() {
                chrome.browserAction.setIcon({path: '../../icons/icon16bw.png'});
            });
        }
    });

});
