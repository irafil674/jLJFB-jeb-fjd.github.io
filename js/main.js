'use strict'

// window.onkeydown = jump_event;


for (var i = 1; i < 11; i++) {
    document.getElementById("button" + i).onclick = MyFunc("button" + i);
    };

// button1.onclick = MyFunc("button1"); 

let tg = window.Telegram.WebApp;

function MyFunc(name){
    function myFunction(){
        if(document.getElementById(name).style.backgroundColor !='white'){
            document.getElementById(name).style.backgroundColor='white';}
        else{
            document.getElementById(name).style.backgroundColor='#bde0ff';
        }
        tg.sendData("some string that we need to send"); 
    }
    return myFunction;
}
