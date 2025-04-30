'use strict'

let field = Array(10);

for (var i = 0; i < 10; i ++) {
    field[i] = Array(10);
}

for (var i = 0; i < 100; i++) {
    document.getElementById("button" + i).onclick = create_button_func(i);
    };


let sb_bt = document.getElementById("sb_bt");
let condition = document.getElementById("condition");
let count1 = document.getElementById("1"), count2 =document.getElementById("2"), count3 = document.getElementById("3"), count4 = document.getElementById("4");
var cond_cond = false;
let c1 = document.getElementById("1c"), c2 = document.getElementById("2c"), c3 = document.getElementById("3c"), c4 = document.getElementById("4c");

sb_bt.onclick = submission_button;

let clear_but = document.getElementById("clear");
clear_but.onclick = clear_button;

function submission_button(){
    var res = check_field();
    if(res[0]){
        var data = "";
        for (var i  = 0; i < 10; i ++){
            for (var j = 0; j < 10; j ++){
                if(field[i][j]){
                    data += "1 ";
                }
                else{
                    data += "0 ";
                }
            }
            data += "\n";
        }
        tg.sendData(data); 
    }
}

let tg = window.Telegram.WebApp;
let prev_res = true;

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
        if(cond_cond){
        condition.textContent = "";
        sb_bt.style.backgroundColor='white';
        }
        var res = check_field();
        if(! res[0]){
            sb_bt.style.backgroundColor='red';
            condition.textContent = res[1];
            condition.style.color = 'red';
            cond_cond = true;
        }

    }
    return button_func;
}

function check_field(){
    c1.textContent = "";
    c2.textContent = "";
    c3.textContent = "";
    c4.textContent = "";
    count1.textContent = "";
    count2.textContent = "";
    count3.textContent = "";
    count4.textContent = "";
    let visited = Array(100);
    var count = [0, 0, 0, 0];
    for (var i =0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            if(visited[i * 10 + j]){
                continue;
            }
            if(field[i][j]){
                var right = j, down = i;
                while(field[i][right]){
                    visited[i * 10 + right] = true;
                    right++;
                    if(right == 10){
                        break;
                    }
                }
                while(field[down][j]){
                    visited[down * 10 + j] = true;
                    down++;
                    if(down == 10){
                        break;
                    }
                }
                right--;
                down--;
                if(Math.max(right-j, down - i) > 3){
                    return [false, "Корабль слишком большой"]; 
                }
                count[Math.max(right-j, down - i)]++;
                if(right > j & down > i){
                    return [false, "Слишком близко"];
                }
                if(down == i){
                    for(var k = j-1; k <= right + 1; k ++){
                        if(field_cell(i+1, k)){
                            return [false, "Слишком близко"];
                        }
                        if(field_cell(i-1, k)){
                            return [false, "Слишком близко"];
                        }   
                    }
                    if(field_cell(i, right + 1)){
                        return [false, "Слишком близко"];
                    }
                    if(field_cell(i, j-1)){
                        return [false, "Слишком близко"];
                    }
                }
                if(right == j){
                    for(var k = i-1; k <= down + 1; k ++){
                        if(field_cell(k, j + 1)){
                            return [false, "Слишком близко"];
                        }
                        if(field_cell(k, j - 1)){
                            return [false, "Слишком близко"];
                        }
                    }
                    if(field_cell(down + 1, j)){
                        return [false, "Слишком близко"];
                    }
                    if(field_cell(i-1, j)){
                        return [false, "Слишком близко"];
                    }
                }
            }
            else{
                visited[i * 10 + j] = true;
            }
        }
    }
    c1.textContent = count[0];
    c2.textContent = count[1];
    c3.textContent = count[2];
    c4.textContent = count[3];
    if(count[0] == 4){
        c1.style.color = 'green';
    }
    else{
        c1.style.color = 'red';
    }
    if(count[1] == 3){
        c2.style.color = 'green';
    }
    else{
        c2.style.color = 'red';
    }
    if(count[2] == 2){
        c3.style.color = 'green';
    }
    else{
        c3.style.color = 'red';
    }
    if(count[3] == 1){
        c4.style.color = 'green';
    }
    else{
        c4.style.color = 'red';
    }
    count1.textContent = " из 4 однопалубных кораблей";
    count2.textContent = " из 3 двупалубных кораблей";
    count3.textContent = " из 2 трёхпалубных кораблей";
    count4.textContent = " из 1 четырёхпалубных кораблей";
    if(count[3] == 1 & count[2] == 2 & count[1] == 3 & count[0] == 4){
        return [true]
    }
    var message = "Не то количество кораблей"
    return [false, message];
}

function field_cell(x, y){
    if(x > 9 | y > 10 | x < 0 | y < 0 ){
        return false;
    }
    return field[x][y]
}

function make_red(x, y){
    document.getElementById("button" + (x * 10 + y)).style.backgroundColor='red';
}

function clear_button(){
    for(var i = 0; i < 10; i++){
        for(var j =0; j < 10; j++){
            field[i][j] = false;
            document.getElementById("button" + (i * 10 + j)).style.backgroundColor='white';
        }
    }
    check_field();
}
