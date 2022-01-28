"use strict";

//
let flag = "pen-flag";

//
let counter = 9;

//
const squares = document.getElementsByClassName("square");

//
//
const squaresArray = Array.from(squares);

//
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

//NewGame button get
const newgamebtn_display=document.getElementById("newgame-btn");
const newgamebtn=document.getElementById("btn90");

//win or lose judgment line
const line1 = JudgLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4,line5, line5, line6, line7,line8];

let winningLine = null;
//
const msgtxt1 = '<p class = "image"><img src = "img/penguins.jpg" width = 61px height = 61px></p><p class = "text">Penguins Attack!(Your Turn)</p>';
const msgtxt2 = '<p class = "image"><img src = "img/whitebear.jpg" width = 61px height = 61px></p><p class = "text">WhiteBear Attack!(Computer Turn)</p>';
const msgtxt3 = '<p class = "image"><img src = "img/penguins.jpg" width = 61px height = 61px></p><p class = "text animate__animated animate__lightSpeedInRight">Penguins Wins!!</p>';
const msgtxt4 = '<p class = "image"><img src = "img/whitebear.jpg" width = 61px height = 61px></p><p class = "text animate__animated animate__lightSpeedInLeft">WhiteBear Wins!!</p>';
const msgtxt5 = '<p class = "image"><img src = "img/penguins.jpg" width = 61px height = 61px><img src = "img/whitebear.jpg" width=61px height=61px></p><p class = "text animate__bounceIn">Draw!!</p>';
//
//
//sound
let gameSound = ["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/penwin_sound.mp3","sound/bearwin_sound.mp3","sound/draw_sound.mp3"]

window.addEventListener("DOMContentLoaded",
    function(){
        //
        setMessage("pen-turn");

        //judge square click
        squaresArray.forEach(function(square){
            square.classList.add("js-clickable");
        });
    },false
);

//
//
//


//
function JudgLine(targetArray, idArray){
    return targetArray.filter(function(e){
        return(e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}
//
//
//

a_1.addEventListener("click",() =>{
    isSelect(a_1);
});


//
squaresArray.forEach(function(square){
    square.addEventListener('click',()=>{
        let gameOverFlg = isSelect(square);//return gameStatus

        //is not gameover, bear
        if (gameOverFlg ==="0"){
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");
            setTimeout(
                function(){
                    bearTurn();
                },
                "2000"
            );
        }
    });
});


//
//
//
//
//
//
//
function isSelect(selectSquare){
    let gameOverFlg ="0";
    if(flag === "pen-flag"){
        //click sound
        let music = new Audio(gameSound[0]);
        music.curretnTime = 0;
        music.play();

        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");
        //penguins wins
        if(isWinner("penguins") === true){
            setMessage("pen-win");
            gameOver("penguins");
            return gameOverFlg = "1";
        }

        setMessage("bear-turn");
        flag = "bear-flag";

    }else{
        //
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();//

        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable")
        //white-bear win
        if(isWinner("whitebear") === true){
            setMessage("bear-win");
            gameOver("whitebear");
            return gameOverFlg = "1";
        }

        setMessage("pen-turn");
        flag = "pen-flag";
    }

    //
    counter--;

    
    if(counter === 0){
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg = "1";
    }
    return gameOverFlg = "0";
}
//
//
//
//
function isWinner(symbol){
    //
    const result = lineArray.some(function(line) {
        //
        const subResult  = line.every(function(square) {
            if(symbol === "penguins"){
                return square.classList.contains("js-pen-checked");
            }
            if(symbol === "whitebear"){
                return square.classList.contains("js-bear-checked");
                }
            });
            //
            if(subResult){winningLine = line}

            return subResult;
        });
        return result; 
}
//
//
//

function setMessage(id){
    switch (id){
        case "pen-turn":
            document.getElementById("msgtext").innerHTML=msgtxt1;
            break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML=msgtxt2;
            break;
        case "pen-win":
            document.getElementById("msgtext").innerHTML=msgtxt3;
            break;
        case "bear-win":
            document.getElementById("msgtext").innerHTML=msgtxt4;
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML=msgtxt5;
            break;
        default:
            document.getElementById("msgtext").innerHTML=msgtxt1;
    }
}

//
//
//


function gameOver(status){
    //GameOver sound
    let w_sound//wk sound define
    switch(status){
        case"penguins":
        w_sound = gameSound[2];
        break;
        case"whitebear":
        w_sound = gameSound[3];
        break;
        case"draw":
        w_sound = gameSound[4];
        break;
    }

    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();

    //all square unclickable
    //squaresArray.forEach(function(square){
    //    square.classList.add("js-unclickable");
    //});
    squaresBox.classList.add("js-unclickable");
    //display New Game button : display
    newgamebtn_display.classList.remove("js-hidden");

    //winEffect
    if(status==="penguins"){
        //winner-line penguins high-light
        if(winningLine){
            winningLine.forEach(function(square){
                return square.classList.add("js-pen_highLight");
            });
        }
        //penguins win!!==>snow color is pink
        $(document).snowfall({
            flakeColor:"rgb(255,240,245)",
            maxSpeed:3,
            minSpeed:1,
            maxSize:10,
            round:true
        });
    }else if(status==="whitebear"){
        //winner-line bear high-light
        if(winningLine){
            winningLine.forEach(function(square){
                return square.classList.add("js-bear_highLight");
            });
        }
        //whitebear win!!==>snow color is blue
        $(document).snowfall({
            flakeColor:"rgb(175,238,238)",
            maxSpeed:3,
            minSpeed:1,
            maxSize:20,
            minSize:10,
            round:true
        });
    }
}

//NewGame button click then initialize
//******************** */
//classList use methods
newgamebtn.addEventListener("click",
    function(){
        //flag initialize
        flag = "pen-flag";

        //initialize counter
        counter = 9;

        //initialize winningLine
        winningLine = null;

        //initialize squaresArray
        squaresArray.forEach(function(square){
            //delete 5 class
            //show mass in penguins
            square.classList.remove("js-pen-checked");

            //show mass in bear
            square.classList.remove("js-bear-checked");

            //show mass in protect
            square.classList.remove("js-unclickable");

            //redline 
            square.classList.remove("js-pen_highLight");

            //blueline
            square.classList.remove("js-bear_highLight");
            
            //judge line
            square.classList.add("js-clickable");
        });

        //enable click squares-box
        squaresBox.classList.remove("js-unclickable");
        //set message
        setMessage("pen-turn");

        //hide new game button
        newgamebtn_display.classList.add("js-hidden");

        //stop jQuery plugin
        $(document).snowfall("clear");
    },false
);

//bear turn
function bearTurn(){
    let gameOverFlg = "0";

    //clickable bear randomly select
    const bearSquare  = squaresArray.filter(function(square){
        return square.classList.contains("js-clickable");
    });

    let n = Math.floor(Math.random()*bearSquare.length);
    gameOverFlg  =isSelect(bearSquare[n]);

    //is not gameover
    if(gameOverFlg ==="0"){
        squaresBox.classList.remove("js-unclickable");
    }
}