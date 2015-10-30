//define a regular expression pattern to test for letters
var allLetters = /^[A-Za-z]+$/;

$(document).ready(function() {

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
	
});