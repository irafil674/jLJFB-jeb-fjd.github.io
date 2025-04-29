'use strict'



for (var i = 1; i < 11; i++) {
    document.getElementById("button" + i).onclick = MyFunc("button" + i);
    };


let sb_bt = document.getElementById("sb_bt")
sb_bt.onclick = myFunction

function myFunction(){
    tg.sendData("some string that we need to send хы-хы, ха-ха"); 
}

let tg = window.Telegram.WebApp;

function MyFunc(name){
    function myFunction(){
        if(document.getElementById(name).style.backgroundColor !='white'){
            document.getElementById(name).style.backgroundColor='white';}
        else{
            document.getElementById(name).style.backgroundColor='#bde0ff';
        }
    }
    return myFunction;
}
