//Variable List ---------
var $nameBox = $("#name");
var $creditBox = $("#credit");
var $stageSuccess = 0;
var $overlayLose = $('<div class="overlay"><div class="boxes overbox"><h4>Sorry, it wasnt a match.</h4><p>To play again, click the button below!</p><form><input type="submit" value="Play Again!" class="button" onclick="history.go(0)"></form></div></div>');
var $overlayLeave = $('<div class="overlay"><div class="boxes overbox"><h4>Congratulations on winning!</h4><p></hr>Your winnings have been added to your credit card. <br/> To play again, click the button below!</p><form><input type="submit" value="Play Again!" class="button" onclick="history.go(0)"></form></div></div>');
var $overlayGrand = $('<div class="overlay"><div class="boxes overbox"><h4>YOU WON THE GRAND PRIZE!!</h4><p></hr>To accept your prize click the button below!<form><input type="submit" value="Accept Prize!" class="button" onclick="history.go(0)"></form></div></div>');

$("body").append($overlayLose);
$("body").append($overlayLeave);
$("body").append($overlayGrand);

$overlayLose.hide();
$overlayLeave.hide();
$overlayGrand.hide();

//Hides Each Game --------
 $("div[class='internals']").hide();

//Lock Message ----------
 $("div[id='box1']").append("<h4 class='locked1'>Stage 1 is Currently Locked</h4>");
 $("div[id='box2']").append("<h4 class='locked2'>Stage 2 is Currently Locked</h4>");
 $("div[id='box3']").append("<h4 class='locked3'>Stage 3 is Currently Locked</h4>");
 $("div[id='box4']").append("<h4 class='locked4'>Stage 4 is Currently Locked</h4>");
 $("div[id='box5']").append("<h4 class='locked5'>Stage 5 is Currently Locked</h4>");

//Hide Game Buttons
$('.gameButton').hide();

//Submit Button Reveals Next Game --------- 
$( "#submitButton" ).on( "click", function( event ){
	if($nameBox.val() != '' && $creditBox.val() != ''){
	event.preventDefault();
	$("div[id='internal1']").show();
	$(".locked1").remove();
	newBoard1();
	$( "#submitButton" ).hide();
} else {
	event.preventDefault();
	$('#infoBox').append("<p id='warning'> Please Fill in Form </p>");
}
});

//Continue Buttons Open up Next Game
$( "#continue1" ).on( "click", function( event ){
	event.preventDefault();
	$("div[id='internal2']").show();
	$(".locked2").remove();
	newBoard2();
	$(this).hide();
	$('#leaveButton1').hide();
});

$( "#continue2" ).on( "click", function( event ){
	event.preventDefault();
	$("div[id='internal3']").show();
	$(".locked3").remove();
	newBoard3();
	$(this).hide();
	$('#leaveButton2').hide();
});

$( "#continue3" ).on( "click", function( event ){
	event.preventDefault();
	$("div[id='internal4']").show();
	$(".locked4").remove();
	newBoard4();
	$(this).hide();
	$('#leaveButton3').hide();
});

$( "#continue4" ).on( "click", function( event ){
	event.preventDefault();
	$("div[id='internal5']").show();
	$(".locked5").remove();
	newBoard5();
	$(this).hide();
	$('#leaveButton4').hide();
});

$( "#continue5" ).on( "click", function( event ){
	event.preventDefault();
	$overlayGrand.show();
});

//leaveButtons show overlay
$(".leaveButton").on("click", function(event){
	event.preventDefault();
	$overlayLeave.show();
});

//Game mechanics

//Stage 1

/* Array holds all tiles which are letters*/
var tiles_array = ['Blue','Blue','Blue','Red'];
/* Array will store short term memory */
var memory_values = [];
/* Array will store tile ids*/
var memory_tile_ids = [];

/* Creates a shuffle method */
Array.prototype.tile_shuffle = function(){
	var i = this.length, j, temp;
	while (--i > 0){
		j = Math.floor(Math.random() * (i+1));
		temp = this[j];
		this[j] = this[i];
		this[i] = temp;
	}
}

/* Creates a new board*/
function newBoard1(){
	/* Will be used to hold new divs */
	var output = '';
	/* Shuffles array holding tiles */
    tiles_array.tile_shuffle();
    /* For when i is less than the length of the tile array it increases by 1 and adds to output a div with each array value and a function which onclick will perform a new function which takes the argument of this as in the clicked div and the memory array value of the clicked div.*/
	for(var i = 0; i < tiles_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+tiles_array[i]+'\')"></div>';
	}
	/* Writes output as the inner html of the memory_board*/
	document.getElementById('gameBox1').innerHTML = output;
}

//Flipping function which recieves the tile and value onclick
function memoryFlipTile(tile,val){
	/*if the tile hasn't been flipped and the short term memory array has less than 2 we will flip the tile by adding a white background and setting the inner HTML to the value captured.*/
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = val;
		tile.innerHTML = val;
		/* If this is the first card being flipped in the short term memory array add it's value and it's id to the arrays.*/
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			/* If it's the second card being flipepd in the short term memory push the value and id then check to see if they match. If so reset the arrays to empty, and 2 to the amount of flipped tiles.  */
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				$('#continue1').show();
				$('#leaveButton1').show();

				//Clears both arrays
				memory_values = [];
				memory_tile_ids = [];
				//If not a match
			} else {
				function flip2Back(){
				    $overlayLose.show();
				    console.log('You Lose');
				    
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}

//Stage 2

/* Array holds all tiles which are letters*/
var tiles_array2 = ['Blue','Blue','Red'];



/* Creates a new board*/
function newBoard2(){
	/* Will be used to hold new divs */
	var output = '';
	/* Shuffles array holding tiles */
    tiles_array2.tile_shuffle();
    /* For when i is less than the length of the tile array it increases by 1 and adds to output a div with each array value and a function which onclick will perform a new function which takes the argument of this as in the clicked div and the memory array value of the clicked div.*/
	for(var i = 0; i < tiles_array2.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile2(this,\''+tiles_array2[i]+'\')"></div>';
	}
	/* Writes output as the inner html of the memory_board*/
	document.getElementById('gameBox2').innerHTML = output;
}

//Flipping function which recieves the tile and value onclick
function memoryFlipTile2(tile,val){
	/*if the tile hasn't been flipped and the short term memory array has less than 2 we will flip the tile by adding a white background and setting the inner HTML to the value captured.*/
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = val;
		tile.innerHTML = val;
		/* If this is the first card being flipped in the short term memory array add it's value and it's id to the arrays.*/
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			/* If it's the second card being flipepd in the short term memory push the value and id then check to see if they match. If so reset the arrays to empty, and 2 to the amount of flipped tiles.  */
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				$('#continue2').show();
				$('#leaveButton2').show();

				//Clears both arrays
				memory_values = [];
				memory_tile_ids = [];
				//If not a match
			} else {
				function flip2Back(){
				    $overlayLose.show();
				    console.log('You Lose');
				    
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}

//Stage 3

/* Array holds all tiles which are letters*/
var tiles_array3 = ['Blue','Blue','Red','Red'];



/* Creates a new board*/
function newBoard3(){
	/* Will be used to hold new divs */
	var output = '';
	/* Shuffles array holding tiles */
    tiles_array3.tile_shuffle();
    /* For when i is less than the length of the tile array it increases by 1 and adds to output a div with each array value and a function which onclick will perform a new function which takes the argument of this as in the clicked div and the memory array value of the clicked div.*/
	for(var i = 0; i < tiles_array3.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile3(this,\''+tiles_array3[i]+'\')"></div>';
	}
	/* Writes output as the inner html of the memory_board*/
	document.getElementById('gameBox3').innerHTML = output;
}

//Flipping function which recieves the tile and value onclick
function memoryFlipTile3(tile,val){
	/*if the tile hasn't been flipped and the short term memory array has less than 2 we will flip the tile by adding a white background and setting the inner HTML to the value captured.*/
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = val;
		tile.innerHTML = val;
		/* If this is the first card being flipped in the short term memory array add it's value and it's id to the arrays.*/
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			/* If it's the second card being flipepd in the short term memory push the value and id then check to see if they match. If so reset the arrays to empty, and 2 to the amount of flipped tiles.  */
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				$('#continue3').show();
				$('#leaveButton3').show();

				//Clears both arrays
				memory_values = [];
				memory_tile_ids = [];
				//If not a match
			} else {
				function flip2Back(){
				    $overlayLose.show();
				    console.log('You Lose');
				    
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}

//Stage 4

/* Array holds all tiles which are letters*/
var tiles_array4 = ['Blue','Blue','Red','Yellow'];



/* Creates a new board*/
function newBoard4(){
	/* Will be used to hold new divs */
	var output = '';
	/* Shuffles array holding tiles */
    tiles_array4.tile_shuffle();
    /* For when i is less than the length of the tile array it increases by 1 and adds to output a div with each array value and a function which onclick will perform a new function which takes the argument of this as in the clicked div and the memory array value of the clicked div.*/
	for(var i = 0; i < tiles_array4.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile4(this,\''+tiles_array4[i]+'\')"></div>';
	}
	/* Writes output as the inner html of the memory_board*/
	document.getElementById('gameBox4').innerHTML = output;
}

//Flipping function which recieves the tile and value onclick
function memoryFlipTile4(tile,val){
	/*if the tile hasn't been flipped and the short term memory array has less than 2 we will flip the tile by adding a white background and setting the inner HTML to the value captured.*/
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = val;
		tile.innerHTML = val;
		/* If this is the first card being flipped in the short term memory array add it's value and it's id to the arrays.*/
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			/* If it's the second card being flipepd in the short term memory push the value and id then check to see if they match. If so reset the arrays to empty, and 2 to the amount of flipped tiles.  */
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				$('#continue4').show();
				$('#leaveButton4').show();

				//Clears both arrays
				memory_values = [];
				memory_tile_ids = [];
				//If not a match
			} else {
				function flip2Back(){
				    $overlayLose.show();
				    console.log('You Lose');
				    
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}

//Stage 5

/* Array holds all tiles which are letters*/
var tiles_array5 = ['Blue','Blue','Red','Purple','Yellow'];



/* Creates a new board*/
function newBoard5(){
	/* Will be used to hold new divs */
	var output = '';
	/* Shuffles array holding tiles */
    tiles_array5.tile_shuffle();
    /* For when i is less than the length of the tile array it increases by 1 and adds to output a div with each array value and a function which onclick will perform a new function which takes the argument of this as in the clicked div and the memory array value of the clicked div.*/
	for(var i = 0; i < tiles_array5.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile5(this,\''+tiles_array5[i]+'\')"></div>';
	}
	/* Writes output as the inner html of the memory_board*/
	document.getElementById('gameBox5').innerHTML = output;
}

//Flipping function which recieves the tile and value onclick
function memoryFlipTile5(tile,val){
	/*if the tile hasn't been flipped and the short term memory array has less than 2 we will flip the tile by adding a white background and setting the inner HTML to the value captured.*/
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = val;
		tile.innerHTML = val;
		/* If this is the first card being flipped in the short term memory array add it's value and it's id to the arrays.*/
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			/* If it's the second card being flipepd in the short term memory push the value and id then check to see if they match. If so reset the arrays to empty, and 2 to the amount of flipped tiles.  */
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				$('#continue5').show();
				$('#leaveButton5').show();

				//Clears both arrays
				memory_values = [];
				memory_tile_ids = [];
				//If not a match
			} else {
				function flip2Back(){
				    $overlayLose.show();
				    console.log('You Lose');
				    
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}