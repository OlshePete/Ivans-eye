let online = false;
const whiteList = ['stackoverflow', 'github', 'chekio', 'kaggle', 'coursera', 'codecademy', 'pythontutor', 'codewars', 'python', 'skillbox'];
const searcherList = ['yandex', 'google'];

function checkWhteListAvailability(arr, val) {
  return arr.some(arrVal => val === arrVal)
}
async function sendHTTPrequest(data) {
  let url = `http://84.201.152.151:8023/log?url=${encodeURIComponent(data)}`;
  const promise =  await fetch(url)
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ 'online': online });
  console.log('Статус:', online);
});

function parseUrl(tabURL) {
  const url = new URL(tabURL);

  const regexp = /(?<=text\=|q\=)([^\&]*)/;
  const text = regexp.exec(url.search);

  const hostname = url.hostname.replace(/.+\/\/|www.|\..+/g, ''); 
  const isSearcher = searcherList.includes(hostname); 
  const isWhite = checkWhteListAvailability(whiteList,hostname)  
  
  if (isSearcher) {
    const status = url.search.includes(`suggest_req`)
    if (!status) {
      // console.log("Запрос в поисковик", hostname);
      console.log("Данные для отправки: ", `${hostname}+${decodeURI(text[0])}`);

      sendHTTPrequest(encodeURIComponent(`${hostname}+${decodeURI(text[0])}`))
    }
  } else if (isWhite) {
    // console.log("Переход на страницу из белого списка")
    console.log("Данные для отправки: ", `${decodeURI(tabURL)}`)
    sendHTTPrequest( encodeURIComponent(decodeURI(tabURL)))
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
  if (change.url && change.status && change.status === "loading") sendUrl(activeInfo);
})

