// global that can be modified by popup
var extension_enabled = false; 

chrome.storage.sync.get('caching', function(items) {
  if (items['caching'])
    extension_enabled = true; 
  
  chrome.tabs.onUpdated.addListener(function (tabId, changeinfo, tab) { 
    if (extension_enabled && changeinfo.status == 'complete') {
      var data = {
        "href": tab.url,
        "access_time": Date.now(),
      };

      var rx = /https:\/\/www\.google\.(.*)\/search\?(.*)q=(.*?)&(.*)/g;
      var arr = rx.exec(tab.url);
     
      if (arr)
        data["query"] = decodeURIComponent(arr[3]).split('+').join(' ')
      console.log(data);
    }
    // $.post('http://localhost:2222/visit', data = data);
  });
});

chrome.omnibox.onInputEntered.addListener(function (text) {
  console.log(text);
  //$.get('localhost:8888/search', { q: text}, function(data) {
  //  console.log(data);
  //});
});