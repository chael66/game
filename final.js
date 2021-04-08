var canvas;
var ctx;
var w=1700;
var h=1000;
var circles= [];


var score=0;


var o1 ={
    "x":50,
    "changex":rand(10),
    "y":50,
    "changey":rand(10),
    "w":100,
    "h":100,
    "c":50,
    "a":1,
    "r":30,
    "d":10,
    "angle":0,
    "changle":15
}

var t1={
    "x":100+rand(w),
    "y":rand(h),
    "w":50,
    "h":50,
    "c":0,
    "a":1,
    "r":25,
 

}

var t2={
    "x":100+rand(w),
    "y":rand(h),
    "w":50,
    "h":50,
    "c":0,
    "a":1,
    "r":25,
}

var t3={
    "x":100+rand(w),
    "y":rand(h),
    "w":50,
    "h":50,
    "c":0,
    "a":1,
    "r":25
}

 
document.onkeydown = spacebar;
document.querySelector('#myCanvas').onclick=click;
document.querySelector('#start').onclick=animationLoop;
document.querySelector('#restart').onclick=restart;


setUpCanvas();

circleData(10);  
click  
// animationLoop();



function restart(){
    clear();
   document.location.reload();
}


function animationLoop(){
    clear();
    
    rect(t1);
    rect(t2);
    rect(t3);
    circle(o1);

    for (var i=0;i<circles.length; i++){
        circle(circles[i]);
        collisionRemove(o1,circles[i])
    }

    forward(o1,10);  
    turn(o1,randn(2));
    bounce(o1);
    collision1();
    collision2();
    collision3();
    drawScore();
     requestAnimationFrame(animationLoop);

}





function drawScore(){
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+score, 10, 40);
}



function click(event){
   turn(o1,90)
}
function spacebar(event){
    if (event.keyCode==32){
     addcircle(circles);
     console.log("new circle!")
    }
   
 }
 function addcircle(a){
    a.push ( {
        "x":rand(w),
        "y":rand(h),
        "r":10,
    });
}


// 



function collisionRemove(o1,o2){
    var differencex =Math.abs(o1.x-o2.x)
    var differencey =Math.abs(o1.y-o2.y)
    var hdif =Math.sqrt(differencex*differencex+differencey*differencey);
    var index =0;
    if(hdif<o1.r+o2.r){ 
        index= circles.indexOf(o2);
        circles.splice(index,1); 
        score+=100;
    }
  
}



function collision1(){
    var differencex = Math. abs(o1.x-t1.x);
    var differencey= Math.abs(o1.y-t1.y);
    var hdist = Math.sqrt (differencex*differencex +differencey*differencey); 
 
    if(hdist < o1.r+t1.r){
        if (differencex<differencey){
            o1.changey*=-1
  
        }else{
            o1.changex*=-1
        }
        turn (o1,180);
        
        confirm(" Your score is " +score +". "+" Do you want to put your name on the player list ? ")
        if(confirm){
        
                document.location.href = "ranking.html";
        }

    }
}
function collision2(){
    var differencex = Math. abs(o1.x-t2.x);
    var differencey= Math.abs(o1.y-t2.y);
    var hdist = Math.sqrt (differencex*differencex +differencey*differencey);  
    if(hdist < o1.r+t2.r){
        if (differencex<differencey){
            o1.changey*=-1
        }else{
            o1.changex*=-1
         
        }
        turn (o1,180);
        confirm(" Your score is " +score +". "+" Do you want to put your name on the player list ? ")
        if(confirm){
        
                document.location.href = "ranking.html";
        }

    }
}
function collision3(){
    var differencex = Math. abs(o1.x-t3.x);
    var differencey= Math.abs(o1.y-t3.y);
    var hdist = Math.sqrt (differencex*differencex +differencey*differencey);
    if(hdist < o1.r+t3.r){
        if (differencex<differencey){
            o1.changey*=-1
        }else{
            o1.changex*=-1
         
        }
        turn (o1,180);
        confirm(" Your score is " +score +". "+" Do you want to put your name on the player list ? ")
        if(confirm){
        
                document.location.href = "ranking.html";
        }
    }
}


function circleData(num){
    for(var i=0; i<num; i++){
        circles.push({
                "x":rand(w),
                "y":rand(h),
                "c":50,
                "a":1,
                "r":10
        })
    }
}




function rect(o){
    var x = o.x;
    var y = o.y;
    o.x-=o.w/2;
    o.y-=o.h/2;
    ctx.beginPath();
    ctx.rect(o.x,o.y,o.w,o.h);
    ctx.fillStyle ="hsla("+o.c+",100%, 50%,"+o.a+")"
    ctx.fill();

    o.x = x;
    o.y = y;
}

function circle(o){

    ctx.beginPath();
    ctx.arc(o.x,o.y,o.r,0,2*Math.PI);
    ctx.fillStyle="hsla("+o.c+",100%,50%,"+o.a+")";
    ctx.fill();
}




function turn(o,angle){
    if(angle!=undefined){
        o.changle=angle;
    };
    o.angle+=o.changle;
}

function forward(o,d){
    var changeX;
    var changeY;
    var oneDegree = Math.PI/180; 
    if(d!=undefined){
        o.d = d;
    };
    changeX=o.d*Math.cos(o.angle*oneDegree)
    changeY=o.d*Math.sin(o.angle*oneDegree);
    o.x+=changeX;
    o.y+=changeY;
}

function bounce(o){
 
    if (o.x>w||o.x<0){

        turn(o,180-2*o.angle); 
        confirm(" Your score is " +score +". "+" Do you want to put your name on the player list? :")
        if(confirm){
        
                document.location.href = "ranking.html";
        }
    };
       


    if (o.y>h||o.y<0){
        turn(o,360-2*o.angle);
        confirm(" Your Score is " +score+". "+" Do you want to put your name on the player list?  ")
        if(confirm){
          
                document.location.href = "ranking.html";
    
        }
    }; 
       
    
};



function clear(){
    ctx.clearRect(0,0,w,h);
}

function rand(r){
    var result =Math.random()*r;
    return result
}

function randn(r){
    var result= Math.random()*r- r/2; 
    return result 
}


function setUpCanvas(){
    canvas=document.querySelector("#myCanvas");
    ctx=canvas.getContext("2d");
    canvas.width=w;
    canvas.height=h;
    canvas.style.background= "black";
    
}



////////Ranking system in side of the web but it disappear when user refresh the page ////////////////////////////////////////


// var nameAndScoreArray=[];

// function ranking(score, name) {
//     var nameAndScore = {
//         name: name,
//         score: score
//     };
//     nameAndScoreArray.push(nameAndScore);
//     nameAndScoreArray.sort(NumberCompare);
//     var rankingElem = document.getElementById("ranking");
//     var printArray = [];
//     for (var i = 0; i < nameAndScoreArray.length; i++) {
//         if (i >= 5) {
//             break;
//         }
//         printArray.push((i + 1)+':' + nameAndScoreArray[i].name + " " + nameAndScoreArray[i].score + 'points');
//         // printArray.push((i + 1) + '등 : ' + + nameAndScoreArray[i].name + " " + nameAndScoreArray[i].score);
//     }
//     rankingElem.innerHTML = printArray.join("<br/>");
// }
// function NumberCompare(a, b) {
//     return a.score - b.score;
// }




console.log("GAME")



