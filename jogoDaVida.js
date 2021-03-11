var check = false;
var tabela = document.querySelector("#game");
var btnPlay = document.querySelector("#btnPlay");
var btnStop = document.querySelector("#btnStop");
var id = 0;
var matriz = []
if(tabela){
    for(let i=0; i < 10; i++){
        let row = document.createElement("div");
        row.className="row";
        let linha=[]
        for(let x=0; x<10; x++){
            let col = document.createElement("div");
            col.id=id;
            col.className="col-sm bg alert-success";
            col.textContent="ﾠ";
            col.onclick = function ativar(){
                col.className = "col-sm bg alert-warning";
            }
            linha.push(col);
            row.appendChild(col);
            id++;
        }
        matriz.push(linha);
        tabela.appendChild(row);
    }
}
btnPlay.onclick = function start(){
    if(btnPlay.className=="btn btn-primary"){
        btnPlay.textContent="Pause ";
        btnPlay.className="btn btn-warning";
        let pause = document.createElement("i");
        pause.className="fas fa-pause";
        btnPlay.appendChild(pause);
        check=true;
        doSomething();
    }else{
        btnPlay.textContent="Play ";
        btnPlay.className="btn btn-primary";
        let play = document.createElement("i");
        play.className="fas fa-play";
        btnPlay.appendChild(play);
        
        check = false;
    }
}

async function doSomething() {
    while (check) {
        await new Promise(resolve => {
            console.log("T-T")
            verificar();
            setTimeout(resolve, 2000)
        })
    }
} 

btnStop.onclick = function stop(){
    check=false;
    btnPlay.textContent="Play ";
    btnPlay.className="btn btn-primary";
    let pause = document.createElement("i");
    pause.className="fas fa-play";
    btnPlay.appendChild(pause);
    for(let i=0;i<tabela.childNodes.length;i++){
        for(let x=0; x<tabela.childNodes[i].childNodes.length; x++){
            tabela.childNodes[i].childNodes[x].className="col-sm bg alert-success";
        }
    }
}

function verificar(){
    lista=[];
    for(let i=0;i<tabela.childNodes.length;i++){
        for(let x=0; x<tabela.childNodes[i].childNodes.length; x++){
            let item = tabela.childNodes[i].childNodes[x];
            let v = contarVizinhos(i,x);
            let novo =[];
            novo.push(item);
            novo.push(v);
            lista.push(novo);
        }
    }
    alterar(lista);
}
function alterar(lista){
    for(indice=0;indice<lista.length;indice++){
        if(lista[indice][0].className=="col-sm bg alert-warning"){
            if(lista[indice][1]<2){
                lista[indice][0].className="col-sm bg alert-success";
            }
            if(lista[indice][1]>3){
                lista[indice][0].className="col-sm bg alert-success";
            }
            if(lista[indice][1] == 2 || lista[indice][1] == 3){
                lista[indice][0].className="col-sm bg alert-warning";
            }
        }else{
            if(lista[indice][1] == 3){
                lista[indice][0].className="col-sm bg alert-warning";
            }
        }
    }
}
function contarVizinhos(linha,coluna){
    vizinhos=0;
    if(linha != 1){
        if(tabela.childNodes[linha-1].childNodes[coluna].className=="col-sm bg alert-warning"){
            vizinhos++;
        }
        if(coluna > 0 && coluna < 9){
            if(tabela.childNodes[linha].childNodes[coluna-1].className=="col-sm bg alert-warning"){
                vizinhos++;
            }
            if(tabela.childNodes[linha].childNodes[coluna+1].className=="col-sm bg alert-warning"){
                vizinhos++;
            }
        }
        if(linha < 9){
            if(tabela.childNodes[linha+1].childNodes[coluna].className=="col-sm bg alert-warning"){
                console.log(tabela.childNodes[linha+1].childNodes[coluna]);
                vizinhos++;
            }
        }
    }
    return vizinhos;
}


