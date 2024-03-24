"use strict";




let oGameData;

initGlobalObject();

function initGlobalObject(){

    oGameData = {
    
        gameField : Array('', '', '', '', '', '', '', '', ''),
        nickNamePlayerOne : document.getElementById('nick1'),
        nickNamePlayerTwo : document.getElementById('nick2'),
        playerOne : "X",
        playerTwo : "O",
        currentPlayer : "",
        colorPlayerOne : document.getElementById('color1'),
        colorPlayerTwo : document.getElementById('color2'),
        boxValue  : document.querySelectorAll('#game-area td'),
       
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


        },


        ValidateForm: function(){

    
    
            try{
        
            if(document.getElementById('nick1').value.length < 5 || document.getElementById('nick2').value.length < 5){
                throw "namnen måste uppfylla minst 5 symboler/bokstav";
            }
            
                else if (document.getElementById('nick1').value === document.getElementById('nick2').value){
                    throw "namnen måste vara olika!"
                }
                
                else if (document.getElementById('color1').value === document.getElementById('color2').value || document.getElementById('color1').value === "#FFFFFF" || document.getElementById('color1').value === "#000000" || document.getElementById('color2').value === "#FFFFFF" || document.getElementById('color2').value === "#000000"){
                    throw "färgerna skall inte va lika samt inte svart/vit"
                }
            else{dang()}
        
            
        } catch (error) {
            document.getElementById('errorMsg').textContent = error;
            
         
            
        }
        
        }
    
         

  
   

    };

    console.log(oGameData.currentPlayer);
    console.log(oGameData.playerTwo);
    console.log(oGameData.playerOne);

} 

function initiateGame (){
    oGameData.boxValue;
    console.log(oGameData.boxValue);
    oGameData.boxValue.forEach(cell => cell.addEventListener("click", executeMove));
    
    //document.getElementById('game-area').addEventListener('click', executeMove);
}

function dang(){  // funktionen sker efter att "starta spelet!" knappen klickas och inga fel uppstår

    //för att vara säker på att nicknamsen följer med genom anropandet
    console.log(oGameData.nickNamePlayerOne);
    console.log(oGameData.nickNamePlayerTwo);


    //koden nedan gör det möjjligt att gömma listan/formen in i d-none
    document.getElementById('div-in-form').classList.add('d-none');

    document.getElementById('game-area').classList.remove('d-none');
    
    
    document.getElementById('errorMsg').textContent = ''; //tömer error fältet under/inom h1 där det kommer upp felmedelanden
    
    //här samlas textfälten och färgväljarens värden
    oGameData.nickNamePlayerOne = document.getElementById('nick1').value;
    oGameData.nickNamePlayerTwo = document.getElementById('nick2').value;
    oGameData.colorPlayerOne = document.getElementById('color1').value;
    oGameData.colorPlayerTwo = document.getElementById('color2').value;
    

    //väljer alla td element och itererar igenom dem och lägger bakgrunden av dem till vit
    document.querySelectorAll('#game-area td').forEach(function(td){
        td.textContent= '';
        td.style.backgroundColor = 'white';
    });
    //Här deklarerar en variabel
    let playerName;


    //koden under väljer vem som börjar genom att slumpa ett tal mellan 0-1, är den under 0,5 så börjar playerOne, över 0,5 så blir det playerTwo's tur
    //i if satsen är vilkoret att PlayerOne börjar om det är mindre än 0,5
    if (Math.random() < 0.5){
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData.playerOne;
    }
    //annars om det inte är mindre än 0,5 så börjar playerTwo
    else {
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData.playerTwo
    }
    
    
    document.querySelector('.jumbotron h1').textContent = "Aktuell spelare är" + playerName; //gör det möjligt för spelarna att se vems tur det är genom att kolla på h1
}






//De vinnande kominationerna gjort som 2d array vilket täcker horizontel,Vertical och båda diagonalerna
const vinnandeKombinationer = [
    ['X', 'X', 'X', '', '', '', '', '', ''],
    ['X', '', '', 'X', '', '', 'X', '', ''],
    ['X', '', '', '', 'X', '', '', '', 'X'],
    ['', '', 'X', '', 'X', '', 'X', '', ''],
    ['X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O']
];

/* Koden nedan (onload) gör det möjligt att på uppstartningen
av sidan så: Nickname1 redo att skrivas istället för att
behöva klicka själv,
*/


function executeMove (event) {
   
    // deklarerar konstanten boxTarget som är event.target dvs att den riktar sig mot elementet som skapade händelsen
    const klickadCell = event.target;
    if (klickadCell.tagName === 'TD' && !klickadCell.textContent) {
        const cellId = klickadCell.getAttribute('data-id');
        oGameData.gameField[cellId] = oGameData.currentPlayer;
        klickadCell.textContent = oGameData.currentPlayer;
        klickadCell.classList.add(`player-${oGameData.currentPlayer.toLowerCase()}`);
        oGameData.currentPlayer = oGameData.currentPlayer === oGameData.playerOne ? oGameData.playerTwo : oGameData.currentPlayer === "" ? oGameData.playerOne : oGameData.playerOne;
        document.getElementById('player-turn').textContent = `Spelare ${oGameData.currentPlayer} tur`;

        const spelSlut = oGameData.checkForGameOver();

        if (spelSlut) {
            oGameData.boxValue.forEach(cell => cell.removeEventListener('click', executeMove));
            const spelSlutsLista = document.getElementById('game-over');
            spelSlutsLista.classList.remove('d-none');
            const SpelResultat = document.getElementById('game-result');
            if (spelSlut === 1 || spelSlut === 2) {
                SpelResultat.textContent = `Spelare ${oGameData.currentPlayer} vinner!`
            
            }else if (spelSlut === 3){
                SpelResultat.textContent = `oavgjort!`;
            }
            document.getElementById('game-area').classList.add('d-none');
        }
    }

}

window.addEventListener('load', ()=>{

    oGameData.initGlobalObject();



    document.getElementById('game-area').classList.add('d-none'); //lägger game-area(spelplanen) i d-none så att den inte vissas förrän validateForm körs utan problem

    document.getElementById('newGame').addEventListener('click', (event)=> {  //event som gäller på klicket av "starta spelet!" så ska validateForm anropas
    
        event.preventDefault(); //den förhindrar formuläret från att skickas till servern antingen innan knappen tryckts eller när namn & färgvilkoren inte stämmer.

        oGameData.ValidateForm();
    
    
    
    });

    initiateGame();
    
});











/*function executeMove(event){
 
    const boxTarget = event.target;
const checkTd = parseInt(boxTarget.getAttribute('data-id'));

if(oGameData.gameField[checkTd] === ""){
    
    
    oGameData.gameField[checkTd] = oGameData.currentPlayer;

    boxTarget.style.backgroundColor = oGameData.currentPlayer === oGameData.playerOne ? oGameData.colorPlayerOne.value : oGameData.colorPlayerTwo.value;


    boxTarget.innerText = oGameData.currentPlayer;

    oGameData.currentPlayer = (oGameData.currentPlayer === oGameData.playerOne) ? oGameData.playerTwo : oGameData.playerOne;

}
else{
    
console.log("den här rutan är upptagen");

}


}*/









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









//const boxTarget = event.target;
//const cellvarde = parseInt(boxTarget.getAttribute('data-id'));
    
    
/*if (boxTarget.innerText === ""){

     // nedan för att bestämma spelare, ifall currentPlayer är playerOne retunera playerTwo annars ifall currentPlayer är tom retunera playerOne annars PlayerOne
    this.currentPlayer = this.currentPlayer === this.playerOne ? this.playerTwo : this.currentPlayer === "" ? this.playerOne : this.playerOne;
    this.boxValue[cellvarde].innerText = this.currentPlayer;
    this.gameField[cellvarde] = this.currentPlayer;
    boxTarget.style.backgroundColor = this.currentPlayer === this.playerOne ? this.colorPlayerOne.value : this.colorPlayerTwo.value;
    

    //else ifall boxen bär på värde redan
} else {
    console.log("boxen bär redan värde!.")
}


//deklarerar konstanten vinnare som refererar till funktionen Spelarevann
const vinnare = this.checkForGameOver();
    
if(vinnare === 1 || vinnare === 2) { //ifall checkForGameOver retunerar 1 eller 2 (spelare 1 eller spelare 2) så console loggas respektiv siffra
    console.log(vinnare);
}

else if (vinnare === 3){  //ifall ingen vinnare retuneras från checkForGameOver så console loggas siffran 3
    console.log(vinnare)
}


console.log("TEST:", this.boxValue)
console.log("TID:", boxTarget.getAttribute('data-id'))
console.log("ARRAY:", this.gameField)
console.log(boxTarget); */
