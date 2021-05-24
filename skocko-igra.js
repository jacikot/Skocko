let curRow=0;
let curCol=0;
let curContent=[];
let curEnter=[];
let combination=[];


function check(row){
    let indCorrect=0;
    let validated=[false,false,false,false];
    for(let i=0;i<4;i++){
        if(combination[i]==curEnter[i]){
            let corr=document.getElementsByName("c"+row+""+indCorrect);
            corr[0].setAttribute("style","background-color: red;");
            indCorrect++;
            curEnter[i]=-1;
            validated[i]=true;
        }
    }
    if(indCorrect==4)return true;
    for(let i=0;i<4;i++){
        if(!validated[i]){
            for(let j=0;j<4;j++){
                if(combination[i]==curEnter[j]){
                    let corr=document.getElementsByName("c"+row+""+indCorrect);
                    corr[0].setAttribute("style","background-color: yellow;");
                    indCorrect++;
                    curEnter[j]=-1;
                    validated[i]=true;
                    break;
                }
            }
        }
    }
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
            slika.setAttribute("src","skocko_dodatno/prazno.png");
            slika.style.cursor="pointer";
            kol.appendChild(slika);
            red.appendChild(kol);
        }

        let kol=document.createElement("td");
        let dugme=document.createElement("button");
        dugme.innerText="=>";
        dugme.classList.add("btn");
        dugme.classList.add("btn-light");
        dugme.addEventListener("click",function(){

            if(curCol<4||stop==true||started==false)return;
            curContent.push(curEnter);
            if(check(i)){
                finish("pobeda");
            }
            curEnter=[];
            curCol=0;
            if(curRow<6)curRow++;
            else if(stop==false){
                finish("pokusaji");
            }

        });
        kol.appendChild(dugme);
        red.appendChild(kol);

        for(let j=0;j<4;j++){
            let kol=document.createElement("td");
            let div=document.createElement("div");
            div.setAttribute("name","c"+i+""+j);
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
        if(j==0){
            slika.classList.add("razmak");
        }
        slika.addEventListener("click",function(){
            if(curCol>=4||stop==true||started==false) return;
            curEnter.push(j);
            let polje=document.getElementsByName(curRow+""+curCol);
            
            polje[0].innerText="";
            let img=document.createElement("img");
            img.setAttribute("src","skocko_dodatno/i"+j+".png");
            polje[0].appendChild(img);
            curCol++;

        });
        kol.appendChild(slika);
        red.appendChild(kol);
    }
    tabela.appendChild(red);
}
function popuniTabelu(){
    popuniTabelu1();
    popuniTabelu2();
    curRow=0;
    curCol=0;
    curContent=[];
    curEnter=[];
    counter=0;
    document.getElementById("brojac").innerText=0;
    generate();
}

function generate(){
    combination=[];
    for(let i=0;i<4;i++){
        combination.push(Math.floor(Math.random()*6));
    }
}

function finish(ishod){
    started=false;
    stop=true;
    if(ishod=="pobeda"){
        alert("Pobedili ste!");
    }
    if(ishod=="vreme"){
        alert("Vreme je isteklo!");

    }
    if(ishod=="pokusaji"){
        alert("Nemate vise pokusaja!");
    }
    let polje=document.getElementsByName("res");

    for(let i=0;i<4;i++){
        polje[i].innerText="";
        let img=document.createElement("img");
        img.setAttribute("src","skocko_dodatno/i"+combination[i]+".png");
        polje[i].appendChild(img);
    }
}

let counter=0;
let stop=false;
let started=false;
$(document).ready(function(){

    $("#start").click(function(){
        if(started==true) return;
        started=true;
        setInterval(function(){
            if(stop==true)return;
            counter++;
            $("#brojac").empty().append(""+counter);
            if(counter==60){
                finish("vreme");
            }
        },1000);
    });

    $("#new").click(function(){
        location.reload();
        
    });

});

