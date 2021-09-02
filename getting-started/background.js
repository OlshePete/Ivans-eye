let online = false;
const whiteList = ['stackoverflow.com', 'learn.javascript.ru'];
const searcherList = ['yandex', 'google'];


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ 'online': online });
  console.log('Статус:', online);
});

function parseUrl(tabURL) {
  const url = new URL(tabURL);
  const regexp = /(?<=text\=|q\=)([^\&]*)/;
  const hostname = url.hostname.replace(/.+\/\/|www.|\..+/g, '');
  const isSearcher = searcherList.includes(hostname);

  const isWhite = whiteList.includes(url.hostname);

  const text = regexp.exec(url.search);
  // яндекс меняет формат URL обновить regexp
  // если использует домен поисковика но не для поиска
  if (isSearcher) {
    const status = url.search.includes(`suggest_req`)
    if (!status) {
      console.log("Запрос в поисковик", hostname);
      console.log("Данные для отправки: ", `${hostname} ${text[0].replace(/\+/g, " ")}`);
    }
  } else if (isWhite) {
    console.log("Переход на страницу из белого списка")
    console.log("Данные для отправки: ", `${tabURL}`)
  } else return
}

function sendUrl() {
  chrome.tabs.query({ 'active': true }, function (tabs) {
    var tabURL = tabs[0].url;
    chrome.storage.local.get(['online'], function (result) {
      online = result.online
      if (online) parseUrl(tabURL);
    })
  })

}

chrome.tabs.onActivated.addListener((activeInfo) => {
  sendUrl(activeInfo);
})

chrome.tabs.onUpdated.addListener((activeInfo, change) => {
  if (change.url && change.status && change.status === "loading") {
    sendUrl(activeInfo);
  }
})

