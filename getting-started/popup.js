let onlineButton = document.getElementById("online");
let changingImg = document.getElementById("mainImg");

chrome.storage.local.get(['online'], function(result) {
	online = result.online
	if (online) {
	onlineButton.className = "btn btn-danger"
	onlineButton.innerHTML = 'Следим';
	changingImg.src="/images/follow_400.jpeg";
	
	} else {
	onlineButton.className = "btn btn-success"
	onlineButton.innerHTML = 'Не следим';
	changingImg.src="/images/unfollow_400.jpeg";		
	}
});

onlineButton.addEventListener("click", function () {
      chrome.storage.local.get(['online'], function(result) {
		  online = result.online	  
		  online = !online; 
		  chrome.storage.local.set({'online': online });
		  console.log('Статус:', online);
		  if (online) {
			onlineButton.className = "btn btn-danger"
			onlineButton.innerHTML = 'Следим';
			changingImg.src="/images/follow_400.jpeg";
		  } else {
			onlineButton.className = "btn btn-success"
			onlineButton.innerHTML = 'Не следим';
			changingImg.src="/images/unfollow_400.jpeg";			
		  }
	});
});

