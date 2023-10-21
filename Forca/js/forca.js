document.addEventListener("DOMContentLoaded", function () {
    const telaInicial = document.getElementById("tela-inicial");
    const jogo = document.getElementById("jogo");
    const nomeForm = document.getElementById("nome-form");
    const nomeInput = document.getElementById("nome");
    const botaoReiniciar = document.getElementById("btnReiniciar");
    const divNome = document.getElementById("nomeJogador");
    const divRelogio = document.getElementById("relogio");
    const divGanhadores = document.getElementById("ganhadores");

    const h3 = document.createElement('h3');
    let relogioInterval;
    let listaJogadores = [];
    let listaGanhadores = [];
    let listaTempo = [];
    let tentativas = 6;
    let lista = [];
    let palavraSecretaCategoria;
    let palavraSecretaSorteada;
    let palavras = [];

    if (localStorage.getItem('listaJogadores')) {
        listaJogadores = JSON.parse(localStorage.getItem('listaJogadores'));
    }
    if (localStorage.getItem('listaGanhadores')) {
        listaGanhadores = JSON.parse(localStorage.getItem('listaGanhadores'));
    }
    if (localStorage.getItem('listaTempo')) {
        listaTempo = JSON.parse(localStorage.getItem('listaTempo'));
    }

    function salvarDadosNoLocalStorage() {
        localStorage.setItem('listaJogadores', JSON.stringify(listaJogadores));
        localStorage.setItem('listaGanhadores', JSON.stringify(listaGanhadores));
        localStorage.setItem('listaTempo', JSON.stringify(listaTempo));
    }

    function exibirGanhadores() {
        const tbody = document.querySelector("#ganhadores tbody");
        tbody.innerHTML = ''; 

        const ganhadoresPorTempo = listaGanhadores.map((ganhador, index) => {
            return { index, ganhador, jogador: listaJogadores[index], tempo: listaTempo[index] };
        });

        ganhadoresPorTempo.sort((a, b) => a.tempo - b.tempo);

        const ganhadoresVitoria = ganhadoresPorTempo.filter(ganhador => ganhador.ganhador === 1);

        if (ganhadoresVitoria.length === 0) {
            const mensagemSemGanhadores = document.createElement("p");
            mensagemSemGanhadores.textContent = "Ainda não há ganhadores.";
            divGanhadores.appendChild(mensagemSemGanhadores);
        } else {
            ganhadoresVitoria.forEach((ganhador, i) => {
                const row = document.createElement("tr");
                const nomeCell = document.createElement("td");
                nomeCell.textContent = ganhador.jogador.charAt(0).toUpperCase() + ganhador.jogador.slice(1);
                const tempoCell = document.createElement("td");
                tempoCell.textContent = formatarTempo(ganhador.tempo); 

                row.appendChild(nomeCell);
                row.appendChild(tempoCell);
                tbody.appendChild(row);
            });
        }
    }

   
    function formatarTempo(tempoEmMilissegundos) {
        const minutos = Math.floor(tempoEmMilissegundos / 60000);
        const segundos = Math.floor((tempoEmMilissegundos % 60000) / 1000);
        const milissegundos = tempoEmMilissegundos % 1000;
        return `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}:${milissegundos}`;
    }

    function iniciarRelogio() {
        let milissegundos = 0;
        relogioInterval = setInterval(function () {
            milissegundos++;
            divRelogio.innerText = formatarTempo(milissegundos);
        }, 1);
    }

    function pararRelogio() {
        clearInterval(relogioInterval);
    }

    const botoesLetras = document.querySelectorAll(".teclas > button");
    botoesLetras.forEach(function (botao) {
        botao.addEventListener("click", function () {
            const letra = botao.textContent;
            verificaLetraEscolhida(letra);
        });
    });

    botaoReiniciar.addEventListener("click", function () {
        location.reload(); 
    });

    function criarPalavraSecreta() {
        const indexPalavra = Math.floor(Math.random() * palavras.length);
        const { nome, categoria } = palavras[indexPalavra];
        palavraSecretaSorteada = nome;
        palavraSecretaCategoria = categoria;
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
                listaJogadores.push(nomeInput.value);
                listaGanhadores.push(0);
                const tempoEmMilissegundos = formatarTempoParaMilissegundos(divRelogio.innerText);
                listaTempo.push(tempoEmMilissegundos);
                salvarDadosNoLocalStorage();
                pararRelogio();
                Swal.fire({
                    title: "OPS!",
                    html: `Não foi dessa vez... A palavra secreta era <br>${palavraSecretaSorteada}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then(() => {
                    jogarNovamente = false;
                    location.reload();
                });
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
            listaJogadores.push(nomeInput.value);
            listaGanhadores.push(1);
            const tempoEmMilissegundos = formatarTempoParaMilissegundos(divRelogio.innerText);
            listaTempo.push(tempoEmMilissegundos);
            salvarDadosNoLocalStorage();
            pararRelogio();
            Swal.fire({
                title: "PARABÉNS!",
                text: "Seu tempo foi de " + divRelogio.innerText,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                jogarNovamente = false;
                location.reload();
            });
        }
    }

    function carregaImagemForca() {
        const numImagem = 6 - tentativas;
        document.getElementById("imagem").style.background = numImagem === 0 ? "url('./img/forca.png')" : `url('./img/forca0${numImagem}.png')`;
    }

    function carregaListaAutomatica() {
        palavras = [
            
            {
                nome: "MACACO",
                categoria: "ANIMAIS SELVAGENS"
            },
            {
                nome: "PAPAGAIO",
                categoria: "ANIMAIS SELVAGENS"
            },
            {
                nome: "JASMIM",
                categoria: "FLORES"
            },
            {
                nome: "TROMPETE",
                categoria: "INSTRUMENTOS MUSICAIS"
            },
            {
                nome: "IATE",
                categoria: "MEIOS DE TRANSPORTE"
            },
            {
                nome: "LASANHA",
                categoria: "ALIMENTOS"
            },
            {
                nome: "BRIGADEIRO",
                categoria: "ALIMENTOS"
            },
            {
                nome: "CINEMA",
                categoria: "ENTRETENIMENTO"
            },
            {
                nome: "CELULAR",
                categoria: "ELETRÔNICOS"
            },
            {
                nome: "TABLET",
                categoria: "ELETRÔNICOS"
            },
            {
                nome: "BIBLIOTECA",
                categoria: "LOCAIS"
            },
            {
                nome: "HOSPITAL",
                categoria: "LOCAIS"
            },
            {
                nome: "PINTURA",
                categoria: "ARTE"
            },
            {
                nome: "ESCULTURA",
                categoria: "ARTE"
            },
            {
                nome: "FUTEBOL",
                categoria: "ESPORTES"
            },
            {
                nome: "BALEIA",
                categoria: "ANIMAIS MARINHOS"
            },
            {
                nome: "GOLFINHO",
                categoria: "ANIMAIS MARINHOS"
            },
            {
                nome: "BRASIL",
                categoria: "PAÍSES"
            },
            {
                nome: "ALEMANHA",
                categoria: "PAÍSES"
            },
            {
                nome: "ROBOTICA",
                categoria: "CIÊNCIA E TECNOLOGIA"
            },
            {
                nome: "ASTRONOMIA",
                categoria: "CIÊNCIA E TECNOLOGIA"
            },
            {
                nome: "BICICLETA",
                categoria: "TRANSPORTE"
            },
            {
                nome: "TREM",
                categoria: "TRANSPORTE"
            },
            {
                nome: "COMPUTADOR",
                categoria: "TECNOLOGIA"
            },
            {
                nome: "SMARTPHONE",
                categoria: "TECNOLOGIA"
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
                nome: "MONTANHA",
                categoria: "GEOGRAFIA"
            },
            {
                nome: "PRAIA",
                categoria: "GEOGRAFIA"
            },
            {
                nome: "RELEVO",
                categoria: "GEOGRAFIA"
            },
            {
                nome: "TERREMOTO",
                categoria: "DESASTRES NATURAIS"
            },
            {
                nome: "TSUNAMI",
                categoria: "DESASTRES NATURAIS"
            },
            {
                nome: "SALARIO",
                categoria: "TRABALHO"
            },
            {
                nome: "DESEMPREGO",
                categoria: "TRABALHO"
            },
            {
                nome: "UNIVERSO",
                categoria: "ASTRONOMIA"
            },
            {
                nome: "ESTRELA",
                categoria: "ASTRONOMIA"
            },
            {
                nome: "BASEBOL",
                categoria: "ESPORTES"
            },
            {
                nome: "FUTEBOL",
                categoria: "ESPORTES"
            },
            {
                nome: "BORBOLETA",
                categoria: "INSETOS"
            },
            {
                nome: "JOANINHA",
                categoria: "INSETOS"
            },
            {
                nome: "CARNAVAL",
                categoria: "COMEMORAÇÕES"
            },
            {
                nome: "HALLOWEEN",
                categoria: "COMEMORAÇÕES"
            },
            {
                nome: "ESCOLA",
                categoria: "EDUCAÇÃO"
            },
            {
                nome: "UNIVERSIDADE",
                categoria: "EDUCAÇÃO"
            },
            {
                nome: "CONCERTO",
                categoria: "MÚSICA"
            },
            {
                nome: "SINFONIA",
                categoria: "MÚSICA"
            },
            {
                nome: "BOTO",
                categoria: "MITOLOGIA"
            },
            {
                nome: "CURUPIRA",
                categoria: "MITOLOGIA"
            },
            {
                nome: "VAMPIRO",
                categoria: "MITOLOGIA"
            },
            {
                nome: "LOBISOMEM",
                categoria: "MITOLOGIA"
            },
            {
                nome: "MODA",
                categoria: "VESTUÁRIO"
            },
            {
                nome: "CACHECOL",
                categoria: "VESTUÁRIO"
            },
            {
                nome: "DIAMANTE",
                categoria: "PEDRAS PRECIOSAS"
            },
            {
                nome: "ESMERALDA",
                categoria: "PEDRAS PRECIOSAS"
            },
            {
                nome: "COLAR",
                categoria: "ACESSÓRIOS"
            },
            {
                nome: "PULSEIRA",
                categoria: "ACESSÓRIOS"
            }
        ];
    }

    function formatarTempoParaMilissegundos(tempoFormatado) {
        const partesTempo = tempoFormatado.split(":");
        const minutos = parseInt(partesTempo[0], 10);
        const segundos = parseInt(partesTempo[1], 10);
        const milissegundos = parseInt(partesTempo[2], 10);
        return (minutos * 60 * 1000) + (segundos * 1000) + milissegundos;
    }

    exibirGanhadores();

    nomeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let nomeCompleto = nomeInput.value;
        nomeCompleto = nomeCompleto.trim();  
        console.log(nomeCompleto);
    
        if (nomeCompleto.includes(' ')) {
            const espacoIndex = nomeCompleto.indexOf(' '); 
            const nome = nomeCompleto.slice(0, espacoIndex); 
            const sobrenome = nomeCompleto.slice(espacoIndex + 1); 
    
            if (nome && sobrenome && nome.length >= 3 && sobrenome.length >= 2) {
                telaInicial.style.display = "none";
                jogo.style.display = "block";
                h3.innerText = nome.charAt(0).toUpperCase() + nome.slice(1) + ' ' + sobrenome.charAt(0).toUpperCase() + sobrenome.slice(1);
                divNome.appendChild(h3);
                iniciarRelogio();
            } else {
                alert("Por favor, insira um nome e um sobrenome válidos.");
            }
        } else {
            alert("Por favor, insira um nome e um sobrenome separados por um espaço.");
        }
    });
    carregaListaAutomatica();
    criarPalavraSecreta();
    montarPalavraNaTela();
    console.log(palavraSecretaSorteada);
});
