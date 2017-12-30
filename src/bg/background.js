// global that can be modified by popup
var extension_enabled = false; 

chrome.storage.sync.get('caching', function(items) {
  if (items['caching'])
    extension_enabled = true; 
  
  chrome.tabs.onUpdated.addListener(function (tabId, changeinfo, tab) { 
    // https://stackoverflow.com/a/26434126
    var link = document.createElement('a');
    link.setAttribute('href', tab.url);
    if (link.protocol != 'http:' && link.protocol != 'https:')
      return;
    if (link.hostname == 'localhost')
      return;

    var rx = /https:\/\/www\.google\.(.*)\/search\?(.*)q=(.*?)&(.*)/g;
    var arr = rx.exec(tab.url);
    var query = undefined;
    if (arr) 
      query = decodeURIComponent(arr[3]).split('+').join(' ');

    if (navigator.onLine == false) {
      if (query) {
        launchSearch(query);
      }
      else {
        var url = 'http://localhost:8091/retrieve/' + tab.url;
        chrome.tabs.update(tab.id, {url: url}, function() {
          chrome.history.deleteUrl(tab.url);
        });
      }
      return false;
    }

    if (changeinfo.status != 'complete' || !extension_enabled)
      return;

    if(navigator.onLine) {
      var data = {
        "url": tab.url,
        "access_time": Date.now(),
      };

      if (query)
        data["query"] = query;
      else 
        data["query"] = "";

      var tmp  = document.createElement ('a');
      tmp.href   = data.url;
      var cleanhostname = tmp.hostname
      if(cleanhostname.indexOf('www.') === 0){
        cleanhostname = cleanhostname.replace('www.','');
      }
      if (DEFAULT_BLACKLIST.indexOf(cleanhostname) == -1) {
        $.post('http://localhost:8091/visit', data = data);
      }
    }
  });
});

chrome.omnibox.onInputEntered.addListener(function (text) {
  console.log(text);
  launchSearch(text);
});

var launchSearch = function(query) {
  chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
    var url = 'src/popup/popup.html?q=' +  encodeURI(query);
    chrome.tabs.update(tab.id, {url: chrome.runtime.getURL(url)});
  });
}
