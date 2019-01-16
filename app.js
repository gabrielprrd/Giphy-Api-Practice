document.getElementById("button").addEventListener('click', getGifs);
var loadMore = document.getElementById("loadbutton");

//------------- Barrinha sobre os termos de privacidade -----------------
window.onload = setTimeout(youAgree, 1500);

function youAgree() {
    document.getElementById("you-agree").style.height = 70+"px";    
}

//------------- Fecha a barrinha dos termos de privacidade com click -----------------
document.getElementById('xbtn').addEventListener('click', function(){
    document.getElementById("you-agree").style.height = 0;
});

//---------------- Mostra e esconde o loading --------------------------
function openModal() {
    document.getElementById("modal").style.display = "flex";
}
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

//------------------ Função pra chegar se o input tá vazio ----------------------
function isEmpty(str){
    return !str.replace(/\s+/, '').length;
}

//-------------------- Função que exclui o resultado anterior quando começa outra pesquisa -------------------------//
var statusgifs = false;

    function cleareverything(){
        const main = document.getElementById('main');
    while (main.firstChild) {
        main.removeChild(main.firstChild);
      }
    }

var offset = 0; // precisa ser declarada fora pra getGifs() e getMoreGifs() reconhecerem

function getGifs(event) {
    event.preventDefault();

    var inputvalue = document.getElementById("myinput").value;
        
        if (isEmpty(inputvalue)) {
            swal('You must type something')
        }else{
        var xhr = new XMLHttpRequest; 

        if (statusgifs == true) {
            cleareverything();
        } 

    var e = document.getElementById("myselect");
    var value = e.options[e.selectedIndex].value;

    openModal();

        if (value === "gif") {
            var api = 'https://api.giphy.com/v1/gifs/search?';
        }else if (value === "sticker"){
            var api = 'https://api.giphy.com/v1/stickers/search?';
        }
    var apiKey = '&api_key=wn5MJ9xGyh5vLC5S0gM0w5u09XSoaYt9&q=';
    var inputvalue = document.getElementById("myinput").value;
        
    var rest = '&limit=18&offset='+offset+'&rating=G&lang=en';

    var url = api + apiKey + inputvalue + rest;
    xhr.open('GET', url, true);
    xhr.onload = function() {
        
        if (this.status == 200) {
            
            var gifs = JSON.parse(this.responseText);

            if (gifs.data.length == 0) {
                swal({
                    type: 'error',
                    title: 'Sorry, no results found',
                    text: 'Try another thing :)',
                })
                closeModal();
            }else{
            var output = '';
            for (i in gifs.data){

                if (value === "gif") {
                    var cadagif = '<img src="'+gifs.data[i].images.fixed_height.url+'">'
                }else if (value === "sticker"){
                    var cadagif = '<img src="'+gifs.data[i].images.fixed_width.url+'">'
                }
                output+= `<div class="gifdiv">${cadagif}</div>`
            }
            
            var gifsContainer = document.createElement('div');
            gifsContainer.className = 'gifs-container';
            document.getElementById("main").appendChild(gifsContainer);
            gifsContainer.innerHTML = output;

            closeModal();
            loadMore.className = 'showloadbtn';
            loadMore.addEventListener('click', getMoreGifs);
        }  
        }   
    }
    xhr.send();
    statusgifs = true
}
}
    //------------------ Quando clica no loadmore -------------------//
     
    function getMoreGifs() {
        
        var inputvalue = document.getElementById("myinput").value;
        var e = document.getElementById("myselect");
        var value = e.options[e.selectedIndex].value;

        var xhr = new XMLHttpRequest; 

            if (value === "gif") {
                var api = 'https://api.giphy.com/v1/gifs/search?';
            }else if (value === "sticker"){
                var api = 'https://api.giphy.com/v1/stickers/search?';
            }
            openModal(); 
        offset = offset + 18;
        var newrest = '&limit=18&offset='+offset+'&rating=G&lang=en';
        var apiKey = '&api_key=wn5MJ9xGyh5vLC5S0gM0w5u09XSoaYt9&q=';
        var url = api + apiKey + inputvalue + newrest;

        xhr.open('GET', url, true);

        xhr.onload = function() {
            var gifs = JSON.parse(this.responseText);  
            var newoutput = '';
            for (i in gifs.data){

                if (value === "gif") {
                    var cadagif = '<img src="'+gifs.data[i].images.fixed_height.url+'">'
                }else if (value === "sticker"){
                    var cadagif = '<img src="'+gifs.data[i].images.fixed_width.url+'">'
                }
                newoutput += `<div class="gifdiv">${cadagif}</div>`
            }
            var newoutputContainer = document.createElement('div');
            newoutputContainer.className = "newOutputClass";
            document.getElementById("main" ).appendChild(newoutputContainer);
            newoutputContainer.innerHTML = newoutput;
            
            statusgifs = true;
        }
        xhr.send();
        closeModal();      
}

//-------------------- Botão que leva pro topo da página -----------------//
var goTopBtn = document.getElementById("gotop-btn");

function showGoTopBtn() {
    if (document.body.scrollTop > 140 || document.documentElement.scrollTop > 140) {
        goTopBtn.style.visibility = 'visible';
        goTopBtn.style.opacity = '1';

    }else {
        goTopBtn.style.visibility = 'hidden';
        goTopBtn.style.opacity = '0';  
    }
}

window.onscroll = function(){
    showGoTopBtn()
};

goTopBtn.addEventListener('click', GoTopBtnFunction);

function GoTopBtnFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Próximas melhorias: 
// - Tornar responsivo
// - Abrir gif ampliado em nova página?