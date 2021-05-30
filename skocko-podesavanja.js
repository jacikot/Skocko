let turn=0;
let cursor=0;
let comb=[];
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
function initialize(){
    let t=localStorage.getItem("turn");
    if(t==null){
        localStorage.setItem("turn",0);
    }
    else{
        turn=parseInt(t);
    }

    let u=localStorage.getItem('users');
    if(u==null){
        localStorage.setItem("users",JSON.stringify(users));
    }
    else users=JSON.parse(u);


    document.getElementById("igrac").innerText="Igrac "+(turn+1);
    let ikonice=document.getElementsByName("ikonice");
    for(let i=0;i<ikonice.length;i++){
        ikonice[i].addEventListener("click",function(){
            setChild(i);
        });
    }
    
}

function setChild(el){
    if(cursor==4)return;
    comb.push(el);
    let parent=document.getElementById("polja");
    let newchild=document.createElement("img");
    newchild.id="p"+cursor;
    let oldchild=document.getElementById("p"+cursor);
    newchild.setAttribute("src","skocko_dodatno/i"+el+".png");
    parent.replaceChild(newchild,oldchild);
    cursor++;
    if(cursor==4){
        document.getElementById("confirm").disabled=false;
    }
}

function generate(){
    
    if(cursor>=4)return;
    let el=Math.floor(Math.random()*6);
    setChild(el);
}

function setCombination(){
    users[1-turn]["combination"]=comb;
    localStorage.setItem("users",JSON.stringify(users));
    localStorage.setItem("turn",JSON.stringify(1-turn));
    if(turn==0) location.reload();
    else location.href="skocko-igra.html";
}

function resetCombination(){
    comb=[];
    cursor=0;
    let parent=document.getElementById("polja");
    for(let i=0;i<4;i++){
        let newchild=document.createElement("img");
        let oldchild=document.getElementById("p"+i);
        newchild.id="p"+i;
        newchild.setAttribute("src","skocko_dodatno/prazno.png");
        parent.replaceChild(newchild,oldchild);
    }
    document.getElementById("confirm").disabled=true;
   
}

function zapocni(){
    localStorage.setItem("turn",JSON.stringify(0));
    location.href="file:///D:/3.godina/6.semestar/web/projekat/skocko-podesavanja.html"
}
