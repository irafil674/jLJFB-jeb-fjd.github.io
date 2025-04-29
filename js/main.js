'use strict'

// window.onkeydown = jump_event;
let tg = window.Telegram.WebApp;
tg.expand();

for (var i = 1; i < 11; i++) {
    document.getElementById("button" + i).onclick = MyFunc("button" + i);
    };

// button1.onclick = MyFunc("button1"); 
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

Telegram.WebApp.onEvent('mainButtonClicked', function(){
	tg.sendData("some string that we need to send"); 
	//при клике на основную кнопку отправляем данные в строковом виде
});
