$(document).ready(function() {
    var $checkbox = $('.ui.checkbox');

    console.log("pickle rick");
    chrome.storage.sync.get('caching', function(items) {
        if (items['caching']) {
            $checkbox.checkbox('set checked');
        }
        else {
            $checkbox.checkbox('set unchecked');
        }
    });
    $checkbox.checkbox({
        onChecked: function() {
            chrome.storage.sync.set({'caching': true}, function() {
                console.log('dam gurl');
            });
        },
        onUnchecked: function() {
            chrome.storage.sync.set({'caching': false}, function() {
                console.log("no damn girl");
            });
        }
    });
});
