chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {

    if (navigator.onLine == false) {
    	alert("See if what you're looking for is in Cauldron")
    }

  }
})