// global that can be modified by popup
var extension_enabled = false; 

chrome.storage.sync.get('caching', function(items) {
  if (items['caching'])
    extension_enabled = true; 
  
  chrome.tabs.onUpdated.addListener(function (tabId, changeinfo, tab) { 
    if (changeinfo.status != 'complete' || !extension_enabled)
      return;

    if (navigator.onLine == false) {
      alert("You're offline!");
      // $.get('http://localhost:2222/retrieve', {'href': tab.url}, function(data) {
      //   // load cached page automagically
      // });
    }
    else {
      var data = {
        "href": tab.url,
        "access_time": Date.now(),
      };

      var rx = /https:\/\/www\.google\.(.*)\/search\?(.*)q=(.*?)&(.*)/g;
      var arr = rx.exec(tab.url);
      
      if (arr)
        data["query"] = decodeURIComponent(arr[3]).split('+').join(' ')
      console.log(data);

      // $.post('http://localhost:2222/visit', data = data);
    }
  });
});

chrome.omnibox.onInputEntered.addListener(function (text) {
  console.log(text);
  chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
    var url = 'src/search/results.html?q=' +  encodeURI(text);
    chrome.tabs.update(tab.id, {url: chrome.runtime.getURL(url)});
  });
});