const jogoAdivinha = {
  semente: 100,
  tentativa: 0,
  numeroSorteado: function () {
     return Math.round(Math.random() * this.semente);
  },
};

const btnVerifica = document.getElementById("btnVerifica");
const status = document.getElementById("status");
const tentativa = document.getElementById("tentativa");
const chute = document.getElementById("chute");
const divGanhadores = document.getElementById("ganhadores")
let name = document.getElementById("name");
let jogadores = [];
let ganhadores = [];




let numeroSorteado = jogoAdivinha.numeroSorteado();



function atualizarTentativa(tentativa, valor) {
  if (valor > 1) {
     tentativa.innerHTML = 'Tentativas : <span style="color: black">' + valor + "</span>";
  } else {
     tentativa.innerHTML = 'Tentativa : <span style="color: black">' + valor + "</span>";
  }
}

function reiniciar() {
  status.innerHTML = '<span style="color:#000">Digite algum valor</span>';
  btnVerifica.innerText = "Verificar";
  atualizarTentativa(tentativa, 0); 
  name.disabled = false;
  chute.disabled = false;
  chute.value = "";
  jogoAdivinha.tentativa = 0;
  numeroSorteado = jogoAdivinha.numeroSorteado();
  btnVerifica.removeEventListener("click", reiniciar);

  while(divGanhadores.lastChild){
      divGanhadores.removeChild(divGanhadores.lastChild);
  }

  for(let i = 0; i < jogadores.length; i++){
      if(ganhadores[i] == 1){
         const paragrafo = document.createElement("p");
         paragrafo.innerText = '-' + jogadores[i];
         divGanhadores.appendChild(paragrafo);
      }
   }


}

const formAdivinha = document.getElementById("form");

formAdivinha.addEventListener("submit", function (event) {
  event.preventDefault();

  console.log(jogadores);
  console.log(ganhadores);

  jogadores.push[name.value];
   if(jogoAdivinha.tentativa == 0){
      name.disabled = true;
      jogadores.push(name.value);
   }

   console.log(numeroSorteado);

   

  if (!!chute.value == false) {
     status.innerHTML = '<span style="color:#000">Digite algum valor</span>';
     return;
  }

  if (chute.value <= 100 && chute.value >= 0) {
     atualizarTentativa(tentativa, ++jogoAdivinha.tentativa);

     if (numeroSorteado == chute.value) {
        status.innerHTML = '<span style="color:#00C853">Parabéns, você acertou!!</span>';
        chute.disabled = true;
        ganhadores.push("1");
        btnVerifica.innerText = "Tentar novamente?";
        btnVerifica.addEventListener("click", reiniciar);
     } else if (numeroSorteado > chute.value) {
        status.innerText = "O número sorteado é maior";
        if (jogoAdivinha.tentativa > 4) {
           status.innerHTML = '<span style="color:#FF3D00">Que pena, você perdeu!!</span>' + '<br><span style="color:#FF3D00">O numero era: </span>' + numeroSorteado;
           chute.disabled = true;
           ganhadores.push("0");
           btnVerifica.innerText = "Tentar novamente?";
           btnVerifica.addEventListener("click", reiniciar);
        }
     } else if (numeroSorteado < chute.value) {
        status.innerText = "O número sorteado é menor";
        if (jogoAdivinha.tentativa > 4) {
           status.innerHTML = '<span style="color:#FF3D00">Que pena, você perdeu!!</span>' + '<br><span style="color:#FF3D00">O numero era: </span>' + numeroSorteado;
           chute.disabled = true;
           ganhadores.push("0");
           btnVerifica.innerText = "Tentar novamente?";
           btnVerifica.addEventListener("click", reiniciar);
        }
     }
  } else if (chute.value < 0) {
     status.innerHTML = '<span style="color:#FF3D00">O valor deve ser maior ou igual a 0!</span>';
  } else if (chute.value > 100) {
     status.innerHTML = '<span style="color:#FF3D00">O valor deve ser menor ou igual a 100!</span>';
  }

});

