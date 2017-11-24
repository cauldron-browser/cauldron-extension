chrome.storage.sync.get('caching', function(items) {
  var extension_enabled = false;
  if (items['caching'])
    extension_enabled = true; 
  
  chrome.storage.onChanged.addListener(function(changes) {
    if (changes['caching'].newValue == true)
      extension_enabled = true;
    else if (changes['caching'].newValue == false)
      extension_enabled = false;
  });

  chrome.tabs.onUpdated.addListener(function (tabId, changeinfo, tab) { 
    if (extension_enabled && changeinfo.status == 'complete') {
      var data = {
        "href": tab.url,
        "access_time": Date.now(),
      };
      console.log(data);
    }
    // $.post('http://localhost:2222/visit', data = data);
  });
});