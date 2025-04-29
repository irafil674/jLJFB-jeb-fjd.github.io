'use strict'

let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d');
let score_ = document.getElementById("score");
let best_ = document.getElementById("best_score");

window.onkeydown = jump_event;


class Move_obj{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = color;
        context.lineWidth = 0;
        context.fill();
    }
    Move(speed){
        context.clearRect(this.x, this.y, this.width + speed, this.height);
        this.x -= speed;
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.lineWidth = 0;
        context.fill();
        if(this.x + this.width <= 0) {
            context.clearRect(this.x, this.y, this.width, this.height);
            return false;
        } 
        return true;
    }
}

class Cloud extends Move_obj{
    constructor(y){
        super(canvas.width, y, cloud_width, cloud_height, '#ededed');
    }
}   

class Barrier extends Move_obj{
    constructor(){
        super(canvas.width, Math.ceil(sky_height - canvas.height * (0.2) / 4), Math.ceil(canvas.width * 0.01), Math.ceil(canvas.height * 0.2 / 4), 'orange');
        this.done = false;
    }
}

let timer;
let sky_obj;
let ground_obj;
const cloud_speed = canvas.width/300;
const sky_height = Math.ceil(canvas.height *0.75), cloud_height = canvas.height * 0.1, cloud_width = canvas.width * 0.08;
let count_cloud_mod;
let count_cloud;
let barrier_mod;
let count_people;
let count_barrier;
const count_people_mod = 20;
const people_size025 = Math.ceil(cloud_height / 8);
const people_x = Math.floor(canvas.width / 8), people_y = Math.floor(sky_height - 12 * people_size025);
let jump_now = 0;
let is_jump;
let up = 1;
let kk = 0;
const barrier_speed = canvas.width/225; 
let timer_count;
let people_y_clear;
let game_over;
let score;
let best = 0;
let flowers;
const flowers_mod = 60; 

function start(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    sky_obj = new Array();
    ground_obj = new Array();
    timer = 30;
    count_cloud_mod = 1;
    count_cloud = -1;
    barrier_mod = 1;
    count_barrier = -1;
    count_people = -1;
    jump_now = 0;
    is_jump = false;
    up = 1;
    kk = 0;
    timer_count = 0;
    game_over = false;
    flowers = 0;
    setTimeout("Move_()", 20);
    score = 0;
}

window.onload = function(){
    start();
}

function Move_(){
    console.log(timer);
    flowers += barrier_speed;;
    draw_ground();
    if(!is_jump){
    timer_count++;
    timer_count = timer_count % (5 * (40 - timer));
    if(timer_count == 0 && timer > 5) timer--; }
    count_cloud = (count_cloud + 1) % count_cloud_mod;
    if(!count_cloud) {
        Cloud_appear();
        count_cloud_mod = Math.floor(Math.random() * 240) + 60;
    }
    let n = sky_obj.length;
    if(n != 0){
        //проверка лоховства вот тут
        


        for(let i = n - 1; i >= 0; --i){
            let cloud = sky_obj[i];
            if(!cloud.Move(cloud_speed)){
                sky_obj.shift();
            }
        }

    }
    clear_people(people_x, people_y_clear);
    clear_people(people_x, people_y);
    if(is_jump) jump();
    people_y_clear =  people_y - jump_now * Math.ceil(39 / (50 - timer)) *1.3;
    draw_people_move(people_x, people_y_clear);
    count_barrier = (count_barrier + 1) % barrier_mod;
    if(!count_barrier) {
        Barrier_appear();
        barrier_mod = Math.floor(Math.random() * 140) + 40;
    }
    let n_ = ground_obj.length;
    if(n_ != 0){
        for(let i = n_ - 1; i >= 0; --i){
            let barrier = ground_obj[i];

            if(barrier.x + barrier.width > people_x && barrier.x < people_x + people_size025 * 4 &&
                people_y_clear + 12 * people_size025 >= barrier.y){
                    fail();
                    return;
                }
                if(barrier.x + barrier.width <= people_x && !barrier.done){
                    score++;
                    barrier.done = true;
                }
            if(!barrier.Move(barrier_speed)){
                ground_obj.shift();
            }
        }
    }
    score_.textContent = score;
    setTimeout("Move_()", timer);
}

function fail(){
    best = Math.max(score, best);
    best_.textContent = best;
    game_over = true;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.fillStyle = 'black';
    context.font = "15pt cursive";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Game over :)) Press Enter to play again", canvas.width / 2, canvas.height / 2);

}

function draw_ground(){
    context.beginPath();
    context.rect(0, sky_height , canvas.width, canvas.height * 0.45);
    context.fillStyle = 'green';
    context.lineWidth = 0;
    context.fill();
    flowers = flowers % flowers_mod;
    context.beginPath();

    for(let i = flowers_mod- flowers; i < canvas.width - 4; i = i + flowers_mod){
        let size = Math.random() + 3;
    context.rect(i, sky_height + 0.05 * canvas.height, size, size);
    context.fillStyle = 'pink';
    context.lineWidth = 0;
    context.fill();
    }
    context.beginPath();
    for(let i = (flowers_mod - flowers + flowers_mod * 2 / 5) % flowers_mod; i < canvas.width - 4; i = i + flowers_mod){
        let size = Math.random() + 2;
    context.rect(i, sky_height + 0.1* canvas.height,size , size);
    context.fillStyle = 'yellow';
    context.lineWidth = 0;
    context.fill();
    }
    context.beginPath();
    for(let i = (flowers_mod - flowers + flowers_mod * 2 / 3) % flowers_mod; i < canvas.width - 4; i = i + flowers_mod){
    context.rect(i, sky_height + 0.15* canvas.height, 4, 4);
    context.fillStyle = 'purple';
    context.lineWidth = 0;
    context.fill();
    }
}

function Cloud_appear(){
    let cloud = new Cloud(Math.floor(Math.random() * (sky_height - 4 * cloud_height)));
    sky_obj.push(cloud);
}

function Barrier_appear(){
    let barrier = new Barrier();
    ground_obj.push(barrier);
}

function draw_people_move(people_x, people_y){
    draw_people(people_x, people_y);
    count_people = (count_people + 1) % count_people_mod;
    context.beginPath();
    context.rect(people_x, people_y + 10 * people_size025, people_size025, people_size025);
    context.fillStyle = 'black';
    context.lineWidth = 0;
    context.fill();
    context.beginPath();
    context.rect(people_x + 3 * people_size025, people_y + 10 * people_size025, people_size025, people_size025);
    context.fillStyle = 'black';
    context.lineWidth = 0;
    context.fill();
    if(count_people > count_people_mod / 2){
        context.clearRect(people_x, people_y + 11 * people_size025, 2  * people_size025, people_size025);
        context.clearRect(people_x + 4 * people_size025, people_y + 10 * people_size025, people_size025, people_size025);
        context.beginPath();
        context.rect(people_x + 4 * people_size025 - people_size025, people_y + 11 * people_size025, 2 * people_size025, people_size025);
        context.fillStyle = 'black';
        context.lineWidth = 0;
        context.fill();

        context.beginPath();
        context.rect(people_x + people_size025, people_y + 10 * people_size025, people_size025, people_size025);
        context.fillStyle = 'black';
        context.lineWidth = 0;
        context.fill();
    }
    else {
        context.clearRect(people_x + 4 * people_size025 - people_size025, people_y + 11 *people_size025, 2 * people_size025, people_size025);
        context.clearRect(people_x + people_size025, people_y + 10 * people_size025, people_size025, people_size025);
        console
        context.beginPath();
        context.rect(people_x, people_y + 11 * people_size025, 2 * people_size025, people_size025);
        context.fillStyle = 'black';
        context.lineWidth = 0;
        context.fill();

        context.beginPath();
        context.rect(people_x + 4 * people_size025, people_y + 10 * people_size025, people_size025, people_size025);
        context.fillStyle = 'black';
        context.lineWidth = 0;
        context.fill();
    }
}

function draw_people(people_x, people_y){
    context.beginPath();
    context.rect(people_x, people_y, 4 * people_size025, 10 * people_size025);
    context.fillStyle = 'black';
    context.lineWidth = 0;
    context.fill();
    context.clearRect(people_x + people_size025, people_y + 2 * 4 * people_size025, 4 * people_size025 - 2 * people_size025, 2 * people_size025);

    //причесочка
    context.beginPath();
    context.moveTo(people_x, people_y);
    context.lineTo(people_x, people_y + 4 * people_size025 / 2);
    context.lineTo(people_x - 4 * people_size025 / 2, people_y - 4 * people_size025 / 2);
    context.lineTo(people_x - 4 * people_size025 / 4, people_y - 4 * people_size025 / 2);
    context.lineTo(people_x, people_y - 4 * people_size025);
    context.lineTo(people_x + 4 * people_size025 / 4, people_y - 4 * people_size025 * 3 / 4);
    context.lineTo(people_x + 4 * people_size025 / 2, people_y - 4 * people_size025);
    context.lineTo(people_x + 4 * people_size025 * 3 / 4, people_y - 4 * people_size025 * 3 / 4);
    context.lineTo(people_x + 4 * people_size025, people_y - 4 * people_size025);
    context.lineTo(people_x + 4 * people_size025, people_y - 4 * people_size025 / 2);
    context.lineTo(people_x + 5 / 4 * 4 * people_size025, people_y - 4 * people_size025 / 2);
    context.lineTo(people_x + 4 * people_size025, people_y);
    context.fillStyle = 'red';
    context.lineWidth = 0;
    context.fill();
}

function jump_event(e){
    let key = e.code;
    if (key == 'KeyW' || key == 'ArrowUp')
    {
        if(!is_jump) jump();
    } 
    else if(key == 'Enter' && game_over){
        start();
    }
}

function jump(){
    if(jump_now == 0 && !is_jump) {
        jump_now = 1;
        is_jump = true;
    }
    if(is_jump && jump_now == 0) {
        is_jump = false;
        up = 1;
        kk = 0;
        return;
    }
    jump_now += up;
    if(jump_now >= 40 - timer && kk < 4) {
        up = 0;
        ++kk;
    }
    else if(jump_now >= 40 - timer){
        up = -1;
    }
}

function clear_people(people_x, people_y){
    context.clearRect(people_x - 2 * people_size025, people_y - 4 * people_size025, 7 * people_size025, 16 * people_size025);
}