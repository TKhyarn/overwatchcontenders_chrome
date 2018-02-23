
var notifPoped = null;
var notification = null;
var ajax_call = function() {
	$.ajax({
		type: "GET",
		url: "https://streamapi.majorleaguegaming.com/service/streams/status/mlg892",
		dataType: 'json',
		success: function(data){
			if (data.data.status == 1 && notifPoped != true) {
				chrome.browserAction.getBadgeText;
				chrome.browserAction.setBadgeText({text : "LIVE"});
				chrome.browserAction.getBadgeBackgroundColor;
				chrome.browserAction.setBadgeBackgroundColor({color: "#2ded2d"});
				notifPoped = true;
				notification = new Notification("Cheers love!", {
					icon: 'img/Stream_img.png',
					body: "The stream's here ! \n Click on!",
					requireInteraction: true     
				});
				notification.onclick = function()
				{
					var URL = "https://overwatchleague.com/en-us/";
					window.open(URL, '_blank');
					this.close();
				}
			}
			else if (data.data.status == -1){
				notifPoped = false;
				var txt = chrome.browserAction.getBadgeText({}, function(result) { 
					if (result == "LIVE") {
						chrome.browserAction.setBadgeText({text : ""});
						chrome.browserAction.setBadgeBackgroundColor({color: "#00FF00"});
					}
				});
				if (notification != null){
					notification.close();
					notification = null;
				}
			}
		}
	});
};
var interval = 1000 * 60 * 1;
setInterval(ajax_call, interval);