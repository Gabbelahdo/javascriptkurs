"use strict";




let oGameData;

initGlobalObject();

function initGlobalObject(){

    oGameData = {
    
        gameField : Array('', '', '', '', '', '', '', '', ''),
        nickNamePlayerOne : document.getElementById('div-in-form nick1'),
        nickNamePlayerTwo : document.getElementById('div-in-form nick2'),
        playerOne : "X",
        playerTwo : "O",
        currentPlayer : "",
        colorPlayerOne : document.getElementById('div-in-form color1'),
        colorPlayerTwo : document.getElementById('div-in-form color2'),
        timerEnabled : false,
        timerId: null,
        initGlobalObject: function(){},

    
        // funktion checkForGameOver med foor loops som rättar horizontel och vertikalt och även från höger till vänster
        checkForGameOver: function(){
           

            
            for (let raden = 0; raden < 3; raden++) {
                if (this.gameField[raden * 3] === this.gameField[raden * 3 + 1] && this.gameField[raden * 3] === this.gameField[raden * 3 + 2] && this.gameField[raden * 3] !== '') { //rätta horizontel
                    return this.gameField[raden * 3] === this.playerOne ? 1 : 2;
                }
            }

                  //for loopen ovan med variabeln raden kollar om det är en vinst på det horizontella hållet av raden, när den hittar vinst visar den vinnande spelare (retunera 1 eller 2)


            for (let kolumner = 0; kolumner < 3; kolumner++) {
                if (this.gameField[kolumner] === this.gameField[kolumner + 3] && this.gameField[kolumner] === this.gameField[kolumner + 6] && this.gameField[kolumner] !== '') { // rätta vertical

                    return this.gameField[kolumner] === this.playerOne ? 1 : 2;                   
                }

            }
                     //for loopen ovan med variabeln kolumner kollar om det är en vinst på det vertikala hållet av kolumnerna, när den hittar vinst visar den vinnande spe
                  

            if (this.gameField[0] === this.gameField[4] && this.gameField[0] === this.gameField[8] && this.gameField[0] !== '') {  // rätta diagonal från vänster till höger
                return this.gameField[0] === this.playerOne ? 1 : 2;
            }


            
            
            if (this.gameField[2] === this.gameField[4] && this.gameField[2] === this.gameField[6] && this.gameField[2] !== '') { //rätta diagonal från höger till vänster
                return this.gameField[2] === this.playerOne ? 1 : 2;
            }

            if (!this.gameField.includes('')) { 
                return 3;  
            }                                  // returnerar 3 om ingen vinner


            return 0;                         // 0 blir det ifall ingen vinner


        }
    
   

    };

    console.log(oGameData.currentPlayer);
    console.log(oGameData.playerTwo);
    console.log(oGameData.playerOne);

} 




/* Koden nedan (onload) gör det möjligt att på uppstartningen
av sidan så: Nickname1 redo att skrivas istället för att
behöva klicka själv,
*/

window.addEventListener('load', ()=>{

    oGameData.initGlobalObject();

    document.getElementById('div-with-a').addEventListener('click', (event)=> {
    
        event.preventDefault();

        ValidateForm();
    
    
    
    });

    
});

function ValidateForm(){


    try{

    if(document.getElementById('oGameData.nickNamePlayerOne').value.length < 5 || document.getElementById('oGameData.nickNamePlayerTwo') < 5){
        throw "namnen måste uppfylla minst 5 symboler/bokstav";
    }
    
        else if (document.getElementById('oGameData.nickNamePlayerOne').value === document.getElementById('oGameData.nickNamePlayerTwo').value){
            throw "namnen måste vara olika!"
        }
        
        else if (document.getElementById('oGameData.colorPlayerOne').value === document.getElementById('oGameData.colorPlayerTwo').value || document.getElementById('oGameData.colorPlayerOne').value === "#FFFFFF" || document.getElementById('oGameData.colorPlayerOne').value === "#000000" || document.getElementById('oGameData.colorPlayerTwo').value === "#FFFFFF" || document.getElementById('oGameData.colorPlayerTwo').value === "#000000"){
            throw "färgerna skall inte va lika samt inte svart/vit"
        }

        initiateGame();
    
} catch (error) {
    document.getElementById('errorMsg').textContent = error;
}

}





const boxValue  = document.querySelectorAll('#game-area td')
console.log(boxValue);


//De vinnande kominationerna gjort som 2d array vilket täcker horizontel,Vertical och båda diagonalerna
const vinnandeKombinationer = [
    ['X', 'X', 'X', '', '', '', '', '', ''],
    ['X', '', '', 'X', '', '', 'X', '', ''],
    ['X', '', '', '', 'X', '', '', '', 'X'],
    ['', '', 'X', '', 'X', '', 'X', '', ''],
    ['X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O']
];


initiateGame();

function initiateGame(){
    boxValue.forEach(cell => cell.addEventListener("click", boxClick));
}

function boxClick(event) {
    // nedan för att bestämma spelare, ifall currentPlayer är playerOne retunera playerTwo annars ifall currentPlayer är tom retunera playerOne annars PlayerOne
    oGameData.currentPlayer = oGameData.currentPlayer === oGameData.playerOne ? oGameData.playerTwo : oGameData.currentPlayer === "" ? oGameData.playerOne : oGameData.playerOne
// deklarerar konstanten boxTarget som är event.target dvs att den riktar sig mot elementet som skapade händelsen
    const boxTarget = event.target;
    if (boxTarget.innerText === ""){

        
        boxValue[boxTarget.id] = oGameData.currentPlayer;
        oGameData.gameField[parseInt(boxTarget.getAttribute('data-id'))] = oGameData.currentPlayer;
        boxTarget.innerText = oGameData.currentPlayer;

        //else ifall boxen bär på värde redan
    } else {
        console.log("boxen bär redan värde!.")
    }


    //deklarerar konstanten vinnare som refererar till funktionen Spelarevann
    const vinnare = oGameData.checkForGameOver();
        
    if(vinnare === 1 || vinnare === 2) { //ifall checkForGameOver retunerar 1 eller 2 (spelare 1 eller spelare 2) så console loggas respektiv siffra
        console.log(vinnare);
    }

    else if (vinnare === 3){  //ifall ingen vinnare retuneras från checkForGameOver så console loggas siffran 3
        console.log(vinnare)
    }
    

    console.log("TEST:", boxValue)
    console.log("TID:", boxTarget.getAttribute('data-id'))
    console.log("ARRAY:", oGameData.gameField)
    console.log(boxTarget);

}





//function gameField(check){

    
//}

/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */


//oGameData.checkForGameOver = function(gameField) {

//}


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
  

    
    
//   oGameData.initGlobalObject = function() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
   // oGameData.gameField = Array('', '', '', '', '', '', '', '', '');
    
    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
    //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    //oGameData.gameField = Array('X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O');

    // Indikerar tecknet som skall användas för spelare ett.
    // oGameData.playerOne = "X";

    // Indikerar tecknet som skall användas för spelare två.
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
