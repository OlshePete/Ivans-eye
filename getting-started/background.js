let online = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({'online': online });
  console.log('Статус:', online);
});

function sendUrl() {
  chrome.tabs.query({'active': true}, function(tabs) {
    var tabURL = tabs[0].url;
    console.log(tabURL);
  })
}

chrome.tabs.onActivated.addListener((activeInfo) => {  
  sendUrl();
})

chrome.tabs.onUpdated.addListener((activeInfo) => {  
  sendUrl();
})

