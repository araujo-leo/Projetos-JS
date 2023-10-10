let jogarNovamente = true; // Uma variável para controlar se o jogo será reiniciado.
let tentativas = 6; // Número de tentativas disponíveis para o jogador.
let lista = []; // Uma lista para armazenar as letras corretas adivinhadas pelo jogador.
let palavraSecretaCategoria; // A categoria da palavra secreta.
let palavraSecretaSorteada; // A palavra secreta sorteada para o jogo.
let palavras = []; // Uma lista de palavras disponíveis para o jogo.

// Função que carrega a lista de palavras automaticamente.
carregaListaAutomatica();

// Função que cria a palavra secreta para o jogo.
criarPalavraSecreta();

// Função que inicializa a representação da palavra na tela.
montarPalavraNaTela();

// Função que sorteia uma palavra secreta a partir da lista de palavras.
function criarPalavraSecreta() {
    const indexPalavra = Math.floor(Math.random() * palavras.length);
    const { nome, categoria } = palavras[indexPalavra];
    palavraSecretaSorteada = nome;
    palavraSecretaCategoria = categoria;
    console.log(indexPalavra);
}

// Função que atualiza a representação da palavra na tela.
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

// Função que verifica se a letra escolhida pelo jogador está correta.
function verificaLetraEscolhida(letra) {
    if (tentativas <= 0) return;
    document.getElementById(`tecla-${letra}`).disabled = true;
    mudarStyleLetra(`tecla-${letra}`, false);
    comparalistas(letra);
    montarPalavraNaTela();
}

// Função que muda o estilo de uma letra na tela (cores).
function mudarStyleLetra(tecla, condicao) {
    const corFundo = condicao ? "#0000ff" : "#e61919";
    document.getElementById(tecla).style.background = corFundo;
    document.getElementById(tecla).style.color = "#ffffff";
}

// Função que compara a letra escolhida com a palavra secreta e atualiza a lista.
function comparalistas(letra) {
    const pos = palavraSecretaSorteada.indexOf(letra);
    if (pos < 0) {
        tentativas--;
        carregaImagemForca();
        if (tentativas === 0) {
            abreModal("OPS!", `Não foi dessa vez... A palavra secreta era <br>${palavraSecretaSorteada}`, '0');
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

// Função que carrega a imagem da forca de acordo com o número de tentativas restantes.
function carregaImagemForca() {
    const numImagem = 6 - tentativas;
    document.getElementById("imagem").style.background = numImagem === 0 ? "url('./img/forca.png')" : `url('./img/forca0${numImagem}.png')`;
}

// Função que abre um modal com um título e uma mensagem.
function abreModal(titulo, mensagem, status) {
    let icon = 'info'; // Define um valor padrão para o ícone

    if (status !== '0') {
        icon = 'success'; // Altera o ícone se o status não for igual a '0'
    }

    Swal.fire({
        title: titulo,
        html: mensagem,
        icon: icon, // Use o ícone determinado pela condição
        confirmButtonText: 'OK'
    }).then((result) => {
        jogarNovamente = false;
        sortear();
    });
}

// Evento para reiniciar o jogo quando o botão "Reiniciar" é clicado.
let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function () {
    jogarNovamente = false;
    location.reload();
});



const modal = document.getElementById("modal-alerta");



// Função para sortear uma nova palavra para o jogo.
function sortear() {
    if (palavras.length > 0) {
        lista = [];
        criarPalavraSecreta();
        montarPalavraNaTela();
        resetaTeclas();
        tentativas = 6;
        console.log(palavraSecretaSorteada);
        carregaImagemForca();
    }
}

// Função que reseta as teclas no jogo.
function resetaTeclas() {
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) => {
        x.style.background = "#FFFFFF";
        x.style.color = "#333";
        x.disabled = false;
    });
}

// Função que carrega uma lista automática de palavras e categorias.
console.log(palavraSecretaSorteada);

function carregaListaAutomatica() {
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



