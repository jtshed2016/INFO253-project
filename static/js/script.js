//define a regular expression pattern to test for letters
var allLetters = /^[A-Za-z]+$/;
var newRecordFields = [0,0,0,0,0,0]
//flags for whether new records are filled in: 0-shelfmark/identifier, 1-title,
//2-author, 3-place, 4-language, 5-description

function makeTableFromJson(recordObject) {
	console.log(typeof(recordObject));
	var tableText = '<table id="mssTable" cellspacing=2 cellpadding=2 border=1>'
	tableText+= '<tr><th>Shelfmark</th><th>Author</th><th>Title</th></tr>'
	
	$.each(recordObject, function(k,v) {
		tableText += '<tr><td><a href="/record/' + k +'">' + k + '</td><td>' + v.Author + '</td><td>' + v.Title +'</td></tr>';
	})

	tableText+='</table>'
	console.log(tableText)
	$("#mssinfotable").html(tableText);
}

$(document).ready(function() {
	if ($("#titlediv p").text() === 'N/A') {
		$("titlediv").css('display', 'none');
		console.log("success");
	}





$( "#input_short").keyup(function() {
		if (allLetters.test($("#input_short").val()) === true) {
			//if all characters are alpha, activate and color submit button
			$("#saveurl").prop('disabled', false);
			$("#saveurl").css('color', 'red');
			$("#saveurl").css('background-color', 'rgb(102, 102, 153)');
			
		}
		else {
			//if string is empty or not completely alphabetical, disable and grey out button
			$("#saveurl").prop('disabled', true);
			$("#saveurl").css('color', 'grey');
			$("#saveurl").css('background-color', 'rgb(209, 209, 224)');
		}
	});
	

//check each field for blankness; set flag to 1 or 0

	$("#identifier").keyup(function() {
		if ($("#identifier").val() === '') {
			newRecordFields[0] = 0;
		}
		else {
			newRecordFields[0] = 1;
		}
	});
	
	$("#mstitle").keyup(function() {
		if ($("#mstitle").val() === '') {
			newRecordFields[1] = 0;
		}
		else {
			newRecordFields[1] = 1;
		}
	});
	
	$("#msauthor").keyup(function() {
		if ($("#msauthor").val() === '') {
			newRecordFields[2] = 0;
		}
		else {
			newRecordFields[2] = 1;
		}
	});
	
	$("#msplace").keyup(function() {
		if ($("#msplace").val() === '') {
			newRecordFields[3] = 0;
		}
		else {
			newRecordFields[3] = 1;
		}
	});
	
	$("#mslang").keyup(function() {
		if ($("#mslang").val() === '') {
			newRecordFields[4] = 0;
		}
		else {
			newRecordFields[4] = 1;
		}
	});
	
	$("#msdescription").keyup(function() {
		if ($("#msdescription").val() === '') {
			newRecordFields[5] = 0;
		}
		else {
			newRecordFields[5] = 1;
		}
	});


//on each keystroke, check whether each field is blank (based on values above) and enable or disable submit button accordingly
	$("#newrecordform").keyup(function() {
		//console.log(newRecordFields);
		counter = 0;
		for (i=0; i < newRecordFields.length; i++) {
			counter = counter + newRecordFields[i];
		}
		//console.log(counter);
		if (counter===6) {
			$("#recordsubmit").prop('disabled', false);
		}
		else {
			$("#recordsubmit").prop('disabled', true);
		}
	});


	//function to detect input into short URL field and activate if alpha
	$( "#input_short").keyup(function() {
		if (allLetters.test($("#input_short").val()) === true) {
			//if all characters are alpha, activate and color submit button
			$("#saveurl").prop('disabled', false);
			$("#saveurl").css('color', 'red');
			$("#saveurl").css('background-color', 'rgb(102, 102, 153)');
			
		}
		else {
			//if string is empty or not completely alphabetical, disable and grey out button
			$("#saveurl").prop('disabled', true);
			$("#saveurl").css('color', 'grey');
			$("#saveurl").css('background-color', 'rgb(209, 209, 224)');
		}
	});
	

	
	//$("#titlediv").ready(function() {
	//	if ($("#titlediv p").text() === 'N/A') {
	//		$("#titlediv").css('display', 'none');
	//	}
	//});
});