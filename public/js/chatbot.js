console.log("chatbot.js v0.21");

$(document).ready(function() {

	let firstTimeOpen = true;
	// Credentials
	var baseUrl = "https://api.api.ai/v1/query?v=20160910&";
	//var baseUrl = "";

	var accessToken = "21b3b9deef38447ebe84f84631e28542";

/*
  var http = new XMLHttpRequest();
  var url = '/Dialogflow/query';
  var params = 'question=hello';
  http.open('POST', url, true);

  //Send the proper header information along with the request
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        console.log(http.responseText);
      }
    }
    http.send(params);
    console.log(http);
*/



	//---------------------------------- Add dynamic html bot content(Widget style) ----------------------------
	// You can also add the html content in html page and still it will work!
	var mybot = '<div class="chatCont" id="chatCont">'+
								'<div class="bot_profile">'+
									'<img src="img/bot2.png" class="bot_p_img">'+
									'<div class="close">'+
										'<i class="fa fa-times" aria-hidden="true"></i>'+
									'</div>'+
								'</div><!--bot_profile end-->'+
								'<div id="result_div" class="resultDiv"></div>'+
								'<div class="chatForm" id="chat-div">'+
									'<div class="spinner">'+
										'<div class="bounce1"></div>'+
										'<div class="bounce2"></div>'+
										'<div class="bounce3"></div>'+
									'</div>'+
									'<input type="text" id="chat-input" autocomplete="off" placeholder="Try typing here"'+ 'class="form-control bot-txt"/>'+
								'</div>'+
							'</div><!--chatCont end-->'+

							'<div class="profile_div">'+
								'<div class="row">'+
									'<div class="col-hgt">'+
										'<img src="img/bot2.png" class="img-circle img-profile">'+
									'</div><!--col-hgt end-->'+
									'<div class="col-hgt">'+
										'<div class="chat-txt">'+
											'Chat with us now!'+
										'</div>'+
									'</div><!--col-hgt end-->'+
								'</div><!--row end-->'+
							'</div><!--profile_div end-->';

	$("mybot").html(mybot);

	// ------------------------------------------ Toggle chatbot -----------------------------------------------
	$('.profile_div').click(function() {
		$('.profile_div').toggle();
		$('.chatCont').toggle();
		$('.bot_profile').toggle();
		$('.chatForm').toggle();
		document.getElementById('chat-input').focus();
		//Set greetings
		if(firstTimeOpen){
		setBotResponse("Hello there, my name is chatnow-a. I am here to answer questions about Now Finance products and point you in the right direction. I can understand questions in plain english. How can I assist you today?");
		firstTimeOpen = false;
	}
	});

	$('.close').click(function() {
		$('.profile_div').toggle();
		$('.chatCont').toggle();
		$('.bot_profile').toggle();
		$('.chatForm').toggle();
	});


	// Session Init (is important so that each user interaction is unique)--------------------------------------
	var session = function() {
		// Retrieve the object from storage
		if(sessionStorage.getItem('session')) {
			var retrievedSession = sessionStorage.getItem('session');
		} else {
			// Random Number Generator
			var randomNo = Math.floor((Math.random() * 1000) + 1);
			// get Timestamp
			var timestamp = Date.now();
			// get Day
			var date = new Date();
			var weekday = new Array(7);
			weekday[0] = "Sunday";
			weekday[1] = "Monday";
			weekday[2] = "Tuesday";
			weekday[3] = "Wednesday";
			weekday[4] = "Thursday";
			weekday[5] = "Friday";
			weekday[6] = "Saturday";
			var day = weekday[date.getDay()];
			// Join random number+day+timestamp
			var session_id = randomNo+day+timestamp;
			// Put the object into storage
			sessionStorage.setItem('session', session_id);
			var retrievedSession = sessionStorage.getItem('session');
		}
		return retrievedSession;
		// console.log('session: ', retrievedSession);
	}

	// Call Session init
	var mysession = session();


	// on input/text enter--------------------------------------------------------------------------------------
	$('#chat-input').on('keyup keypress', function(e) {
		var keyCode = e.keyCode || e.which;
		var text = $("#chat-input").val();
		if (keyCode === 13) {
			if(text == "" ||  $.trim(text) == '') {
				e.preventDefault();
				return false;
			} else {
				$("#chat-input").blur();
				setUserResponse(text);
				send(text);
				e.preventDefault();
				return false;
			}
		}
	});


	//------------------------------------------- Send request to API.AI ---------------------------------------
	function send(text) {
		/*console.log($.ajax({
			type: "POST",
			url: "/Dialogflow/query",
			contentType: "application/x-www-form-urlencoded",
			params: "question=" + text
		}))*/

/*
		var type = "POST";
		var url = "/Dialogflow/query";
		var ct = "application/x-www-form-urlencoded";
		var params = "question=" + text;

		console.log("text: " + text);
		console.log("type: " + type);
		console.log("url: " + url);
		console.log("contentType: " + ct);
		console.log("params: " + params);
*/
		/*$.ajax({
			/*type: type,
			url: url,
			contentType: ct,
			params: params + text,*/
 			//dataType:
			/*type: "GET",
			url: baseUrl+"query="+text+"&lang=en-us&sessionId="+mysession,
			contentType: "application/json",
			dataType: "json",
			headers: {
				"Authorization": "Bearer " + accessToken
			},*/
			// data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),

			var http = new XMLHttpRequest();
  			var url = '/Dialogflow/query';
  			var params = 'question=' + text;//hello';
  			http.open('POST', url, true);

  			//Send the proper header information along with the request
  			http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  			http.onreadystatechange = function() {//Call a function when the state changes.
  			  if(http.readyState == 4 && http.status == 200) {
    	    console.log(http.responseText);
    	    data = http.responseText;
			console.log("server response: " + data);
			main(data);
   		   		}
  			}


    		http.send(params);
    		//console.log(http);

			/*


			success: function(data) {
				main(data);
				// console.log(data);
			},
			error: function(e) {
				console.log (e);
			}
		});*/

		//------------------------ Modified code for server based dialogflow call ------------------------------
/*
		var http = new XMLHttpRequest();
  var url = '/Dialogflow/query';
  //var params = 'question=' + text;
  var params = 'question=';
  http.open('POST', url, true);

  //Send the proper header information along with the request
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        console.log(http.responseText);
      }
    }
    //http.send(params);
    //console.log(http);
    http.send(params + text);
*/
	}


	//------------------------------------------- Main function ------------------------------------------------
	function main(data) {

		/*var action = data.result.action;
		var speech = data.result.fulfillment.speech;
		// use incomplete if u use required in api.ai questions in intent
		// check if actionIncomplete = false
		var incomplete = data.result.actionIncomplete;
		*/

		/*if(data.result.fulfillment.messages) { // check if messages are there
			if(data.result.fulfillment.messages.length > 0) { //check if quick replies are there
				var suggestions = data.result.fulfillment.messages[1];
			}
		}*/

		setBotResponse(data);

		/*

		switch(action) {
			// case 'your.action': // set in api.ai
			// Perform operation/json api call based on action
			// Also check if (incomplete = false) if there are many required parameters in an intent
			// if(suggestions) { // check if quick replies are there in api.ai
			//   addSuggestion(suggestions);
			// }
			// break;
			default:
				setBotResponse(speech);
				if(suggestions) { // check if quick replies are there in api.ai
					addSuggestion(suggestions);
				}
				break;
		}*/
	}


	//------------------------------------ Set bot response in result_div -------------------------------------
	function setBotResponse(val) {
		setTimeout(function(){
			if($.trim(val) == '') {
				val = 'I couldn\'t get that. Let\' try something else!'
				var BotResponse = '<p class="botResult">'+val+'</p><div class="clearfix"></div>';
				$(BotResponse).appendTo('#result_div');
			} else {
				val = val.replace(new RegExp('\r?\n','g'), '<br />');
				var BotResponse = '<p class="botResult">'+val+'</p><div class="clearfix"></div>';
				$(BotResponse).appendTo('#result_div');
			}
			scrollToBottomOfResults();
			hideSpinner();
		}, 500);
	}


	//------------------------------------- Set user response in result_div ------------------------------------
	function setUserResponse(val) {
		var UserResponse = '<p class="userEnteredText">'+val+'</p><div class="clearfix"></div>';
		$(UserResponse).appendTo('#result_div');
		$("#chat-input").val('');
		scrollToBottomOfResults();
		showSpinner();
		$('.suggestion').remove();
	}


	//---------------------------------- Scroll to the bottom of the results div -------------------------------
	function scrollToBottomOfResults() {
		var terminalResultsDiv = document.getElementById('result_div');
		terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
	}


	//---------------------------------------- Ascii Spinner ---------------------------------------------------
	function showSpinner() {
		$('.spinner').show();
	}
	function hideSpinner() {
		$('.spinner').hide();
	}


	//------------------------------------------- Suggestions --------------------------------------------------
	function addSuggestion(textToAdd) {
		setTimeout(function() {
			var suggestions = textToAdd.replies;
			var suggLength = textToAdd.replies.length;
			$('<p class="suggestion"></p>').appendTo('#result_div');
			$('<div class="sugg-title">Suggestions: </div>').appendTo('.suggestion');
			// Loop through suggestions
			for(i=0;i<suggLength;i++) {
				$('<span class="sugg-options">'+suggestions[i]+'</span>').appendTo('.suggestion');
			}
			scrollToBottomOfResults();
		}, 1000);
	}

	// on click of suggestions get value and send to API.AI
	$(document).on("click", ".suggestion span", function() {
		var text = this.innerText;
		setUserResponse(text);
		send(text);
		$('.suggestion').remove();
	});
	// Suggestions end -----------------------------------------------------------------------------------------
});
