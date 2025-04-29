'use strict'

let field = Array(10)

for (var i = 0; i < 10; i ++) {
    field[i] = Array(10)
}

for (var i = 0; i < 100; i++) {
    document.getElementById("button" + i).onclick = create_button_func(i);
    };


let sb_bt = document.getElementById("sb_bt")
sb_bt.onclick = submission_button

function submission_button(){
    var data = ""
    for (var i  = 0; i < 10; i ++){
        for (var j = 0; j < 10; j ++){
            if(field[i][j]){
                data += "1 "
            }
            else{
                data += "0 "
            }
        }
        data += "\n"
    }
    tg.sendData(data); 
}

let tg = window.Telegram.WebApp;

function create_button_func(number){
    function button_func(){
        if(field[Math.floor(number/10)][number % 10]){
            document.getElementById("button" + number).style.backgroundColor='white';
            field[Math.floor(number/10)][number % 10] = false;
        }
        else{
            document.getElementById("button" + number).style.backgroundColor='#bde0ff';
            field[Math.floor(number/10)][number % 10] = true;
        }
        check_field();
    }
    return button_func;
}

function check_field(){
    //пока не ясно, но нужно чот написать корректность введёного говна
}
