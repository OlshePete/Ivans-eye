let onlineButton = document.getElementById("online");
let changingImg = document.getElementById("mainImg");

chrome.storage.local.get(['online'], function(result) {
	online = result.online
	if (online) {
	onlineButton.style.backgroundColor = "red";
	onlineButton.innerHTML = 'Не следить';
	changingImg.src="/images/follow.jpeg";
	
	} else {
	onlineButton.style.backgroundColor = "green";
	onlineButton.innerHTML = 'Следить';
	changingImg.src="/images/unfollow.jpeg";		
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
			onlineButton.innerHTML = 'Не следить';
			changingImg.src="/images/follow.jpeg";
		  } else {
			onlineButton.style.backgroundColor = "green";
			onlineButton.innerHTML = 'Следить';
			changingImg.src="/images/unfollow.jpeg";			
		  }
	});
});

