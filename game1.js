"use strict"

// Makes 'document.getelementbyid' til en variabel. 
var $ = function (foo) {
    return document.getElementById(foo);    // save keystrokes
}

var computerGuess; //store your random number 
var userGuessLog = []; // Emty array
var attempts = 0;
var maxGuesses = 10;



function gameEnded(){
    $('newGameBtn').style.display = 'inline';
    $("easyBtn").style.display = 'none';
    document.getElementById('inputGuess').setAttribute('readonly', 'readonly'); // can't click on the input field
}
function easyMode(){
    maxGuesses = 10;
    document.getElementById("easyBtn").className = 'activeButton'; // add class name
    
}

function newGame(){
  window.location.reload(); // To reload and start game again and generate a number.
}

function init() {
    computerGuess = Math.ceil(Math.random()*1000);
    console.log(computerGuess);
    document.getElementById('newGameBtn').style.display = 'None'; 
}

function compareGuess() {
    var userGuess = $('inputGuess').value; // Store the value of the players guess 
   //console.log(userGuess);

   userGuessLog.push(userGuess); // add value to array
   //console.log(userGuessLog);

   $('guessLog').innerHTML = userGuessLog;
   attempts++; // counts attempts 


   $('attempts').innerHTML = attempts; // show the counts attempts  
    if(userGuessLog.length < maxGuesses){
        if (userGuess > computerGuess) { 
            $('output').innerHTML = 'Your guess is too high.';
            document.getElementById('inputGuess').value =""; // clear input field each time it have been guessed
        } else if (userGuess < computerGuess) {
            document.getElementById('output').innerHTML = 'Your guess is too low.';
            document.getElementById('inputGuess').value = "";
        } else {
            document.getElementById('output').innerHTML = 'You guessed right! you got in ' + attempts + " attempts";
            document.getElementById('container').style.backgroundColor = 'green';

            gameEnded();
        }
    } else{
        if (userGuess > computerGuess){
            $('output').innerHTML = 'You lose, no more attempts.' + '<br> the number was ' + computerGuess;
            document.getElementById('container').style.backgroundColor = '#e82c4e';
            gameEnded();
        } else if(userGuess < computerGuess){
            document.getElementById('output').innerHTML = 'You lose, no more attempts.' + '<br> the number was ' + computerGuess;
            document.getElementById('container').style.backgroundColor = '#e82c4e';
            gameEnded();
        } else{
            document.getElementById('output').innerHTML = 'Correctyou got in' + attempts + "attempts";
            document.getElementById('container').style.backgroundColor = 'green';
            gameEnded();
            
        }
    }
   
}




// Create, read and erease cookies 
function createCookie(name, value, days) {
    let expires;
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}



// function to show highscore 
function showScore() {
    let cookietxt = document.cookie; // reads all cookies 
    let arr = cookietxt.split(';'); // splits all cookies elements after ; 
    for (let i = 0; i < arr.length; i++)  { // create a loop for the whole array 
        let tr = document.createElement('tr'); // create table row in html
        let arr1 = arr[i].split('='); // splits name and value 
        let td = document.createElement('td'); // creates the table data
        let arrayTxt = document.createTextNode(arr1[0]); // array content 

        // Why we don't use let here or (declare it to a new variable) is because we ABOVE declared e.g ((let td = 5;)) so if we want to change the value of the variable td later we can just
        // write ((td = 10;))
        td.appendChild(arrayTxt); // input table content
        tr.appendChild(td); // input table data in to a row
        td = document.createElement('td'); // change varible
        arrayTxt = document.createTextNode(arr1[1]); // create value in table 
        td.appendChild(arrayTxt);
        tr.appendChild(td);
        $('showScore').appendChild(tr); // input to table in html file
    }
}


//This works, and saves cookies, also displays it... FIGURE OUT HOW TO DISPLAY AT ALL TIMES.
let saveScore = function () {
    let pName = $('playerName').value;

    if (pName.length > 0) {
        $('playerScore').innerHTML = $('playerName').value;
        $('playerAttempts').innerHTML = "guessed it in" + " " + attempts;
        
        createCookie(pName, attempts, 14);
    }
}


//#endregion

let windowLoad = function () {
    
    $('newGameBtn').addEventListener('click', newGame);
    $("inputGuess").addEventListener('change', compareGuess);
    $('saveScoreToBoard').addEventListener('click', saveScore);
    showScore();
    // $('showCookie').textContent = document.cookie;
    
}

window.addEventListener('load', windowLoad);