var notifPoped = null;
var notification = null;
var ajax_call = function() {
	$.ajax({
		type: "GET",
		url: "https://api.twitch.tv/helix/streams?user_login=overwatchcontenders",
		headers: {'Client-ID': '74r6k01pksoouztdb23pc8483p6uf1'},
		dataType: 'json',
		success: function(data){
			if (data.data.length == 1 && notifPoped != true) {
				chrome.browserAction.getBadgeText;
				chrome.browserAction.setBadgeText({text : "LIVE"});
				chrome.browserAction.getBadgeBackgroundColor;
				chrome.browserAction.setBadgeBackgroundColor({color: "#2ded2d"});
				notifPoped = true;
				notification = new Notification("Hi there!", {
					icon: 'img/Stream_img.png',
					body: "Overwatch contenders'stream is now live!\nClick on and have fun!",
					requireInteraction: true     
				});
				notification.onclick = function()
				{
					var URL = "https://contenders.playoverwatch.com";
					window.open(URL, '_blank');
					this.close();
				}
			}
			else if (data.data.length == 0){
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