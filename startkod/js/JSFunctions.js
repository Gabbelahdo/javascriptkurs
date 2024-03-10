"use strict";




/* Koden nedan (onload) gör det möjligt att på uppstartningen
av sidan så: Nickname1 redo att skrivas istället för att
behöva klicka själv,
*/

let oGameData = {
    
    gameField : Array('', '', '', '', '', '', '', '', ''),
    nickNamePlayerOne : document.getElementById('#nick1'),
    nickNamePlayerTwo : document.getElementById('#nick2'),
   playerOne : "X",
   playerTwo : "O",
    currentPlayer : "",
    colorPlayerOne : '',
   colorPlayerTwo : '',
   timerEnabled : false,
   timerId: null 
   

  

}; 


window.onload = function(){
    document.querySelector('#nick1').focus() 
    console.log(oGameData.playerOne)
};


document.querySelector('#newGame').addEventListener('click',function(event){
    

    try {

        let textRefs = this.querySelectorAll('input[type=text]');

        let currentTextRef = null;

        for( let counter =0; counter < textRefs.length; counter++){
            currentTextRef = textRefs.item(counter);

            if(currentTextRef.value.length === 0){

                throw{elmRef : currentTextRef };
            }
        }


        //färg väljare, updateras beronde på vad spelarna väljer
        //hs1 funkar genom att kolla hs1(hue,saturation,lightness)
        let color1Value = document.getElementById('color1').value;
        let color2Value = document.getElementById('color2').value;

        oGameData.colorPlayerOne = color1Value ? `hs1(${color1Value},100%, 50%` : `hs1(180, 100%, 50%)`
        oGameData.colorPlayerTwo = color2Value ? `hs1(${color2Value},100%, 50%` : `hs1(180, 100%, 50%)`;


        if (!oGameData.nickNamePlayerOne || !oGameData.nickNamePlayerTwo){
            throw { errorMsg: 'glöm inte välja nicknames!!!'};

        }



        //iteration på ifall player one or two inte (!) eller är null skriv ut error
        if (!oGameData.colorPlayerOne || !oGameData.colorPlayerTwo){
            throw { errorMsg: 'glöm inte välja färger!!!'};
        }

        console.log("börja spela");

        return false;
    } 
    
    catch (oError) {

        if(oError.elmRef) {
            oError.elmRef.focus();
            document.querySelector('#errorMsg').textContent = 'bruh glöm inte ' + oError.elmRef.getAttribute('placeHolder') + '!'; 
        }

        else {

            document.querySelector('#errorMsg').textContent = oError.errorMsg;
        }


        return false;



    }
});




const boxValue  = document.querySelectorAll('#game-area td')
console.log(boxValue);

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */







const vinnandeKombinationer = [



['X', 'X', 'X', '', '', '', '', '', ''],
['X', '', '', 'X', '', '', 'X', '', ''],
['X', '', '', '', 'X', '', '', '', 'X'],
['', '', 'X', '', 'X', '', 'X', '', ''],
['X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O']


];


initializeGame();

function initializeGame(){
    boxValue.forEach(cell => cell.addEventListener("click", boxClick));
   

}

function boxClick(event) {

    const boxTarget = event.target;
    console.log(boxTarget);


if (!boxValue[boxTarget.id]){
   boxValue[boxTarget.id] = currentPlayer
   boxTarget.innerText = currentPlayer

    currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne

}

}




 let checkForGameOver = {

    checkHorizontal,
    checkVertical,
    checkDiagonalLeftToRight,
    checkDiagonalRightToLeft,



}

 function checkHorizontal(){


    if(['X', 'X', 'X', '', '', '', '', '', '']){


    }

 }

 function checkVertical(){

 }

function checkDiagonalLeftToRight(){

}
function checkDiagonalRightToLeft(){

}


function gameField(check){

    
}

/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */


oGameData.checkForGameOver = function(gameField) {

   

}


//Testutskrifter
/*
console.log( oGameData );
oGameData.initGlobalObject();
console.log( oGameData.gameField );
console.log( oGameData.checkForGameOver() );
*/

/*
console.log( oGameData.checkHorizontal() );
console.log( oGameData.checkVertical() );
console.log( oGameData.checkDiagonalLeftToRight() );
console.log( oGameData.checkDiagonalRightToLeft() );
console.log( oGameData.checkForDraw() );
*/




/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
  

    
    
  //  oGameData.initGlobalObject = function() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
   // oGameData.gameField = Array('', '', '', '', '', '', '', '', '');
    
    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
    //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    //oGameData.gameField = Array('X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O');

    //Indikerar tecknet som skall användas för spelare ett.
   // oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
   // oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
   // oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
   // oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
   // oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
   // oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
  //  oGameData.colorPlayerTwo = "";

    //"Flagga" som indikerar om användaren klickat för checkboken.
   // oGameData.timerEnabled = false;

    //Timerid om användaren har klickat för checkboxen. 
   // oGameData.timerId = null;

//}  
