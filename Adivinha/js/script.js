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
  chute.disabled = false;
  chute.value = "";
  jogoAdivinha.tentativa = 0;
  numeroSorteado = jogoAdivinha.numeroSorteado();
  btnVerifica.removeEventListener("click", reiniciar);
}

const formAdivinha = document.getElementById("form");

formAdivinha.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!!chute.value == false) {
     status.innerHTML = '<span style="color:#000">Digite algum valor</span>';
     return;
  }

  if (chute.value <= 100 && chute.value >= 0) {
     atualizarTentativa(tentativa, ++jogoAdivinha.tentativa);
     console.log(jogoAdivinha.tentativa)

     if (numeroSorteado == chute.value) {
        status.innerHTML = '<span style="color:#00C853">Parabéns, você acertou!!</span>';
        chute.disabled = true;
        btnVerifica.innerText = "Tentar novamente?";
        btnVerifica.addEventListener("click", reiniciar);
     } else if (numeroSorteado > chute.value) {
        status.innerText = "O número sorteado é maior";
        if (jogoAdivinha.tentativa > 4) {
           status.innerHTML = '<span style="color:#FF3D00">Que pena, você perdeu!!</span>' + '<br><span style="color:#FF3D00">O numero era: </span>' + numeroSorteado;
           chute.disabled = true;
           btnVerifica.innerText = "Tentar novamente?";
           btnVerifica.addEventListener("click", reiniciar);
        }
     } else if (numeroSorteado < chute.value) {
        status.innerText = "O número sorteado é menor";
        if (jogoAdivinha.tentativa > 4) {
           status.innerHTML = '<span style="color:#FF3D00">Que pena, você perdeu!!</span>' + '<br><span style="color:#FF3D00">O numero era: </span>' + numeroSorteado;
           chute.disabled = true;
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