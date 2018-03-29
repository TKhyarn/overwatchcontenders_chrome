	var currentStage2 = "";
	const req = new XMLHttpRequest();
	req.open('GET', 'https://overwatch-contenders-api-prod.playoverwatch.com/schedule', false);
	req.send(null);
	if (req.status === 200) {
		var myData = JSON.parse(req.responseText);
		var myData_nbStages = Object.keys(myData['data']['stages']).length;
		var myData_nbMatches = 0;
		var todayMinusTwoHours = new Date();
		todayMinusTwoHours.setHours(todayMinusTwoHours.getHours() - 2);
		var currentStage = null;
		var myData_current = null;
		var next_match = false;
		loop1:
		for (var i = 0; i < myData_nbStages; i++) {
			myData_nbMatches = Object.keys(myData['data']['stages'][i]['matches']).length;
			currentStage = myData['data']['stages'][i]['name'];
			loop2:
			for (var y = 0; y < myData_nbMatches; y++) {
				myData_current = myData['data']['stages'][i]['matches'][y];
				if (new Date(myData_current['startDate']) > todayMinusTwoHours && myData_current['competitors'][0] != null) {
					next_match = true;
					break loop1;
				}
			}
		}
		if (next_match === true) {
			var Team1 = myData_current['competitors'][0]['name'];
			var Team2 = myData_current['competitors'][1]['name'];
			var logo1 = myData_current['competitors'][0]['logo'];
			if (logo1 == null) {
				logo1 = '../img/logo404.png';
			}
			var logo2 = (myData_current['competitors'][1]['logo']);
			if (logo2 == null) {
				logo2 = '../img/logo404.png';
			}
			var Region = "";
			const req2 = new XMLHttpRequest();
			req2.open('GET', 'https://overwatch-contenders-api-prod.playoverwatch.com/teams?expand=team.content&locale=en-us', false);
			req2.send(null);
			if (req2.status === 200) {
				var myTeams = JSON.parse(req2.responseText).competitors;
				var nbTeams = Object.keys(myTeams).length;
				loop2:
				for (var y = 0; y < nbTeams; y++) {
					if (myTeams[y]['competitor']['name'] === Team1 || myTeams[y]['competitor']['name'] === Team2) {
						Region = " ("+myTeams[y]['competitor']['region']+")";
						break loop2;
					}
				}

			}
			var MatchDate = dateFormat(myData_current['startDate'], "dd mmm yy h:MM TT");
		}
		const req2 = new XMLHttpRequest();
			req2.open('GET', 'https://api.twitch.tv/helix/streams?user_login=overwatchcontenders', false);
			req2.setRequestHeader('Client-ID', '74r6k01pksoouztdb23pc8483p6uf1');
			req2.send(null);
			if (req2.status === 200 && JSON.parse(req2.responseText).data.length == 1) {
				$("#stage span").html('<a href="https://contenders.playoverwatch.com/en-us/" target="_blank">'+currentStage+Region+'</a>');
			}
			else
			{
				$("#stage span").html(currentStage+Region);
			}

	}
	else {
		var error = 1;
		var Team1 = "I'm sorry but";
		var Team2 = "No match has been found";
		var logo1 = "";
		var logo2 = "";
		var currentStage = "Season off";
		var MatchDate = "See you soon";
	}

	$("#date span").html(MatchDate);

	if (error == 1) {
		$("#logoA").remove();
		$("#logoB").remove();
		$("#versus").remove();

	}
	else  {
		$("#logoA").attr('src', logo1);
		$("#logoB").attr('src', logo2);

	}
	$("#teamA span").html(Team1);
	$("#teamB span").html(Team2);