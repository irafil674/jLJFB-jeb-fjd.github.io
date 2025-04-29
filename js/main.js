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

tg.expand(); //расширяем на все окно  

tg.MainButton.text = "Changed Text"; //изменяем текст кнопки 
tg.MainButton.textColor = "#F55353"; //изменяем цвет текста кнопки
tg.MainButton.color = "#143F6B"; //изменяем цвет бэкграунда кнопки

Telegram.WebApp.onEvent('mainButtonClicked', function(){
	tg.sendData("some string that we need to send"); 
	//при клике на основную кнопку отправляем данные в строковом виде
});
