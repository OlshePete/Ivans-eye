let onlineButton = document.getElementById("online");

chrome.storage.local.get(['online'], function(result) {
	online = result.online
	if (online) {
	onlineButton.style.backgroundColor = "red";
	onlineButton.innerHTML = 'Следим';
	
	} else {
	onlineButton.style.backgroundColor = "green";
	onlineButton.innerHTML = 'Не следим';	
	}
});

onlineButton.addEventListener("click", function () {
      chrome.storage.local.get(['online'], function(result) {
		  online = result.online	  
		  online = !online; 
		  chrome.storage.local.set({'online': online });
		  console.log('Статус:', online);
		  if (online) {
			onlineButton.style.backgroundColor = "red";
			onlineButton.innerHTML = 'Следим';
		  } else {
			onlineButton.style.backgroundColor = "green";
			onlineButton.innerHTML = 'Не следим';		
		  }
	});
});

