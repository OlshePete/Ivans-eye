let online = false;
const whiteList=['stackoverflow.com', 'learn.javascript.ru'];
const searcherList = ['yandex.ru', 'www.google.ru','google.ru', 'www.google.com'];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({'online': online });
  console.log('Статус:', online);
});

function parseUrl(tabURL) {
  const url = new URL(tabURL);  
  const regexp = /(?<=text\=|q\=)([^\&]*)/;
  const isSearcher= searcherList.includes(url.host);
  const isWhite= whiteList.includes(url.host);
  const text=regexp.exec(url.search);
  //  яндекс меняет формат URL обновить regexp
// если запрос пустой? или вкладка только открылась
  if (isSearcher) {
    // console.log("Запрос от пользователя в поисковик")
    console.log("Отправляем: ", text[0])
  } else if (isWhite) {
      console.log("Запрос страницы из белого списка")
      console.log("Отправляем: ", tabURL)    
  } else return
}

function sendUrl() {
  chrome.tabs.query({'active': true}, function(tabs) {
    var tabURL = tabs[0].url;
    // console.log(tabURL);
    parseUrl(tabURL)
  })
}

chrome.tabs.onActivated.addListener((activeInfo) => {  
  sendUrl();
})

chrome.tabs.onUpdated.addListener((activeInfo) => {  
  sendUrl();
})

