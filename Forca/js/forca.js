let jogarNovamente = true;
let tentativas = 6;
let lista = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];

carregaListaAutomatica();
criarPalavraSecreta();
montarPalavraNaTela();

function criarPalavraSecreta() {
    const indexPalavra = Math.floor(Math.random() * palavras.length);
    const { nome, categoria } = palavras[indexPalavra];
    palavraSecretaSorteada = nome;
    palavraSecretaCategoria = categoria;
    console.log(indexPalavra);
}

function montarPalavraNaTela() {
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";

    for (let i = 0; i < palavraSecretaSorteada.length; i++) {
        const letraLista = lista[i] || "&nbsp;";
        const classeCSS = "letras";
        palavraTela.innerHTML += `<div class="${classeCSS}">${letraLista}</div>`;
    }
}

function verificaLetraEscolhida(letra) {
    if (tentativas <= 0) return;
    document.getElementById(`tecla-${letra}`).disabled = true;
    mudarStyleLetra(`tecla-${letra}`, false);
    comparalistas(letra);
    montarPalavraNaTela();
}

function mudarStyleLetra(tecla, condicao) {
    const corFundo = condicao ? "#0000ff" : "#e61919";
    document.getElementById(tecla).style.background = corFundo;
    document.getElementById(tecla).style.color = "#ffffff";
}

function comparalistas(letra) {
    const pos = palavraSecretaSorteada.indexOf(letra);
    if (pos < 0) {
        tentativas--;
        carregaImagemForca();
        if (tentativas === 0) {
            abreModal("OPS!", `Não foi dessa vez... A palavra secreta era <br>${palavraSecretaSorteada}`);

        }
    } else {
        mudarStyleLetra(`tecla-${letra}`, true);
        for (let i = 0; i < palavraSecretaSorteada.length; i++) {
            if (palavraSecretaSorteada[i] === letra) {
                lista[i] = letra;
            }
        }
    }

    const vitoria = lista.join("") === palavraSecretaSorteada;
    if (vitoria) {
        abreModal("PARABÉNS!", "Você venceu...");
        tentativas = 0;
    }
}

function carregaImagemForca() {
    const numImagem = 6 - tentativas;
    document.getElementById("imagem").style.background = numImagem === 0 ? "url('./img/forca.png')" : `url('./img/forca0${numImagem}.png')`;
   
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

const modal = document.getElementById("modal-alerta");





window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica(){
    palavras = [
        {
            nome: "CACHORRO",
            categoria: "ANIMAIS DOMESTICOS"
        },
        {
            nome: "GATO",
            categoria: "ANIMAIS DOMESTICOS"
        },
        {
            nome: "PEIXE",
            categoria: "ANIMAIS DOMESTICOS"
        },
        {
            nome: "MESA",
            categoria: "MOVEIS"
        },
        {
            nome: "CADEIRA",
            categoria: "MOVEIS"
        },
        {
            nome: "ESTANTE",
            categoria: "MOVEIS"
        },
        {
            nome: "MACA",
            categoria: "FRUTAS"
        },
        {
            nome: "BANANA",
            categoria: "FRUTAS"
        },
        {
            nome: "UVA",
            categoria: "FRUTAS"
        },
        {
            nome: "CARRO",
            categoria: "VEICULOS"
        },
        {
            nome: "MOTO",
            categoria: "VEICULOS"
        },
        {
            nome: "ONIBUS",
            categoria: "VEICULOS"
        },
        {
            nome: "BICICLETA",
            categoria: "VEICULOS"
        },
        {
            nome: "LIVRO",
            categoria: "LITERATURA"
        },
        {
            nome: "POESIA",
            categoria: "LITERATURA"
        },
        {
            nome: "ROMANCE",
            categoria: "LITERATURA"
        },
        {
            nome: "PIZZA",
            categoria: "ALIMENTOS"
        },
        {
            nome: "HAMBURGUER",
            categoria: "ALIMENTOS"
        },
        {
            nome: "SALADA",
            categoria: "ALIMENTOS"
        },
        {
            nome: "SOPA",
            categoria: "ALIMENTOS"
        },
        {
            nome: "CINEMA",
            categoria: "ENTRETENIMENTO"
        },
        {
            nome: "MUSICA",
            categoria: "ENTRETENIMENTO"
        },
        {
            nome: "ESPORTE",
            categoria: "ENTRETENIMENTO"
        },
        {
            nome: "TELEVISAO",
            categoria: "ENTRETENIMENTO"
        },
        {
            nome: "CELULAR",
            categoria: "ELETRONICOS"
        },
        {
            nome: "LAPTOP",
            categoria: "ELETRONICOS"
        },
        {
            nome: "CAMERA",
            categoria: "ELETRONICOS"
        },
        {
            nome: "FONEDEOUVIDO",
            categoria: "ELETRONICOS"
        },
        {
            nome: "AEROPORTO",
            categoria: "LOCAIS PUBLICOS"
        },
        {
            nome: "PARQUE",
            categoria: "LOCAIS PUBLICOS"
        },
        {
            nome: "PRAIA",
            categoria: "LOCAIS PUBLICOS"
        },
        {
            nome: "MUSEU",
            categoria: "LOCAIS PUBLICOS"
        },
        {
            nome: "ESCOLA",
            categoria: "EDUCACAO"
        },
        {
            nome: "UNIVERSIDADE",
            categoria: "EDUCACAO"
        },
        {
            nome: "PROFESSOR",
            categoria: "EDUCACAO"
        },
        {
            nome: "ALUNO",
            categoria: "EDUCACAO"
        },
        {
            nome: "CELULAR",
            categoria: "TECNOLOGIA"
        },
        {
            nome: "COMPUTADOR",
            categoria: "TECNOLOGIA"
        },
        {
            nome: "INTERNET",
            categoria: "TECNOLOGIA"
        },
        {
            nome: "SOFTWARE",
            categoria: "TECNOLOGIA"
        },
        {
            nome: "VIAGEM",
            categoria: "ATIVIDADES"
        },
        {
            nome: "FOTOGRAFIA",
            categoria: "ATIVIDADES"
        },
        {
            nome: "PESCA",
            categoria: "ATIVIDADES"
        },
        {
            nome: "JOGO",
            categoria: "ATIVIDADES"
        },
        {
            nome: "AMIZADE",
            categoria: "RELACOES"
        },
        {
            nome: "AMOR",
            categoria: "RELACOES"
        },
        {
            nome: "FAMILIA",
            categoria: "RELACOES"
        },
        {
            nome: "TRABALHO",
            categoria: "RELACOES"
        },
        {
            nome: "ESPORTES",
            categoria: "HOBBIES"
        },
        {
            nome: "MUSICA",
            categoria: "HOBBIES"
        },
        {
            nome: "LEITURA",
            categoria: "HOBBIES"
        },
        {
            nome: "PINTURA",
            categoria: "HOBBIES"
        },
        {
            nome: "VIAGEM",
            categoria: "HOBBIES"
        }
    ];
}




function sortear(){
    if(palavras.length > 0){
        lista=[];
        criarPalavraSecreta();
        montarPalavraNaTela();
        resetaTeclas();
        tentativas = 6;
        console.log(palavraSecretaSorteada);
        carregaImagemForca();
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#333";
        x.disabled = false;
    });
}




console.log(palavraSecretaSorteada);