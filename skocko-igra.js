


let curEnter=[];

let interval=null;

let users=[
    {
        curRow:0,
        curCol:0,
        curContent:[],
        curVal:[],
        combination:[],
        counter:0,
        stop:false,
        started:false,
    },
    {
        curRow:0,
        curCol:0,
        curContent:[],
        curVal:[],
        combination:[],
        counter:0,
        stop:false,
        started:false,
    }
]
let turn=0;

function getFromStorage(){
    let t=localStorage.getItem('turn');
    if(t==null){
        localStorage.setItem("turn",JSON.stringify(0));
    }
    else turn=parseInt(JSON.parse(t));

    let u=localStorage.getItem('users');
    if(u==null){
        localStorage.setItem("users",JSON.stringify(users));
    }
    else users=JSON.parse(u);
}


function check(row){
    let indCorrect=0;
    let validated=[false,false,false,false];
    let connected=[false,false,false,false];
    let colors=[];
    for(let i=0;i<4;i++){
        if(users[turn]["combination"][i]==curEnter[i]){
            let corr=document.getElementsByName("c"+row+""+indCorrect);
            corr[0].setAttribute("style","background-color: red;");
            colors.push("red");
            indCorrect++;
            validated[i]=true;
            connected[i]=true;
        }
    }
    if(indCorrect==4)return true;
    for(let i=0;i<4;i++){
        if(!validated[i]){
            for(let j=0;j<4;j++){
                if(users[turn]["combination"][i]==curEnter[j]&&!connected[j]){
                    let corr=document.getElementsByName("c"+row+""+indCorrect);
                    corr[0].setAttribute("style","background-color: yellow;");
                    colors.push("yellow");
                    indCorrect++;
                    connected[j]=true;
                    validated[i]=true;
                    break;
                }
            }
        }
    }
    users[turn]["curVal"].push(colors);
    return false;

}
function popuniTabelu1(){
    let tabela=document.getElementById("pokusaji");
    for(let i=0;i<7;i++){
        let red=document.createElement("tr");
        red.setAttribute("name",i);
        for(let j=0;j<4;j++){
            let kol=document.createElement("td");
            kol.setAttribute("name",i+""+j);
            let slika=document.createElement("img");

            if(parseInt(users[turn]["curRow"])<=i)slika.setAttribute("src","skocko_dodatno/prazno.png");
            else slika.setAttribute("src","skocko_dodatno/i"+users[turn]["curContent"][i][j]+".png");
            
            
            kol.appendChild(slika);
            red.appendChild(kol);
        }

        let kol=document.createElement("td");
        let dugme=document.createElement("button");
        dugme.innerText="=>";
        dugme.classList.add("btn");
        dugme.classList.add("btn-light");
        dugme.addEventListener("click",function(){
            if(users[turn]["curCol"]<4||users[turn]["stop"]==true||users[turn]["started"]==false)return;
            if(interval!=null)clearInterval(interval);
            interval=null;
            users[turn]["curContent"].push(curEnter);
            if(check(i)){
                finish("pobeda");
            }
            curEnter=[];
            users[turn]["curCol"]=0;
            if(users[turn]["curRow"]<6)users[turn]["curRow"]++;
            else if(users[turn]["stop"]==false){
                finish("pokusaji");
            }
            changeTurn();
            
            
        });
        kol.appendChild(dugme);
        red.appendChild(kol);

        for(let j=0;j<4;j++){
            let kol=document.createElement("td");
            let div=document.createElement("div");
            div.setAttribute("name","c"+i+""+j);
            if(parseInt(users[turn]["curRow"])>i){
                div.setAttribute("style","background-color:"+users[turn]["curVal"][i][j]);
            }
            kol.appendChild(div);
            red.appendChild(kol);
        }


        tabela.appendChild(red);
    }
}

function popuniTabelu2(){
    let tabela=document.getElementById("tekuci");
    let red=document.createElement("tr");
    for(let j=0;j<4;j++){
        let kol=document.createElement("td");
        let slika=document.createElement("img");
        kol.setAttribute("name","res");
        slika.setAttribute("src","skocko_dodatno/prazno.png");

        kol.appendChild(slika);
        red.appendChild(kol);
    }
    for(let j=0;j<6;j++){
        let kol=document.createElement("td");
        let slika=document.createElement("img");
        slika.setAttribute("src","skocko_dodatno/i"+j+".png");
        slika.style.cursor="pointer";
        if(j==0){
            slika.classList.add("razmak");
        }
        slika.addEventListener("click",function(){
            if(users[turn]["curCol"]>=4||users[turn]["stop"]==true||users[turn]["started"]==false) return;
            curEnter.push(j);
            let polje=document.getElementsByName(users[turn]["curRow"]+""+users[turn]["curCol"]);
            
            polje[0].innerText="";
            let img=document.createElement("img");
            img.setAttribute("src","skocko_dodatno/i"+j+".png");
            polje[0].appendChild(img);
            users[turn]["curCol"]++;

        });
        kol.appendChild(slika);
        red.appendChild(kol);
    }
    tabela.appendChild(red);
}
function popuniTabelu(){
    getFromStorage();
    popuniTabelu1();
    popuniTabelu2();
    document.getElementById("brojac").innerText=users[turn]["counter"];
    curEnter=[];
    if(parseInt(users[turn]["curRow"])>0){
        interval=setInterval(function(){
            if(users[turn]["stop"]==true)return;
            users[turn]["counter"]++;
            $("#brojac").empty().append(""+users[turn]["counter"]);
            if(users[turn]["counter"]==60){
                finish("vreme");
            }
            
        },1000);
        $("#start").prop("disabled",true);
    }

    document.getElementById("igrac").innerText="Igrac "+(turn+1);
    
   
}
let gameOver=false;

function finish(ishod){
    users[turn]["started"]=false;
    users[turn]["stop"]=true;
    if(interval!=null)clearInterval(interval);
    interval=null;
    if(ishod=="pobeda"){
        alert("POBEDNIK JE IGRAC "+(turn+1)+"!");
        gameOver=true;
    }
    if(ishod=="vreme"){
        alert("Vreme je isteklo! POBEDNIK JE IGRAC "+((1-turn)+1)+"!");
        gameOver=true;

    }
    if(ishod=="pokusaji"){
        alert("Nemate vise pokusaja!");
        if(users[1-turn]["stop"]){
            alert("NERESENO JE!");
        }
    }
    let polje=document.getElementsByName("res");

    for(let i=0;i<4;i++){
        polje[i].innerText="";
        let img=document.createElement("img");
        img.setAttribute("src","skocko_dodatno/i"+users[turn]["combination"][i]+".png");
        polje[i].appendChild(img);
    }

    

}
function changeTurn(){
    if(!users[1-turn]["stop"]&&!gameOver){
        turn=1-turn;
        localStorage.setItem("turn",JSON.stringify(turn));
        localStorage.setItem("users",JSON.stringify(users));
        setTimeout(function f(){
            location.reload();
        },2000);
    }
}

$(document).ready(function(){

    $("#start").click(function(){
        if(users[turn]["started"]==true) return;
        $("#start").prop("disabled",true);
        users[turn]["started"]=true;
        interval=setInterval(function(){
            if(users[turn]["stop"]==true)return;
            users[turn]["counter"]++;
            $("#brojac").empty().append(""+users[turn]["counter"]);
            if(users[turn]["counter"]==60){
                finish("vreme");
            }
            
        },1000);
    });

    $("#new").click(function(){
       
        users[0]={
            curRow:0,
            curCol:0,
            curContent:[],
            curVal:[],
            combination:[],
            counter:0,
            stop:false,
            started:false,
        };
        users[1]={
            curRow:0,
            curCol:0,
            curContent:[],
            curVal:[],
            combination:[],
            counter:0,
            stop:false,
            started:false,
        };
        localStorage.setItem("users",JSON.stringify(users));
        localStorage.setItem("turn",JSON.stringify(0));
        location.href="skocko-uputstvo.html";
        
    });

    

});



