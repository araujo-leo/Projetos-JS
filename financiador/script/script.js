document.querySelector('button').addEventListener("click", () => {
    let nomeVendedor = document.getElementById('nome-vendedor').value;
    let nomeComprador = document.getElementById('nome-comprador').value;
    let valorVeiculo = Number(document.getElementById('valor-veiculo').value);
    let entrada = Number(document.getElementById('entrada').value);

    if (entrada > valorVeiculo) {
        window.alert("A entrada deve ser menor que o valor do veículo")
    } else {

        let diferenca = valorVeiculo - entrada;
        console.log(diferenca);

        let juros = diferenca + diferenca * 0.1;
        console.log(juros);

        let tabela = document.querySelector('table tbody');
        tabela.innerHTML = ""; // Limpa o conteúdo da tabela antes de preenchê-la novamente

        // Remove os cards existentes
        let cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            card.parentNode.removeChild(card);
        });

        for (let parcela = 1; parcela <= 12; parcela++) {
            let valorParcela = juros / parcela;

            let row = tabela.insertRow();
            let celulaValorParcela = row.insertCell(0);
            let celulaQuantidadeParcelas = row.insertCell(1);
            let celulaAceitar = row.insertCell(2);

            celulaValorParcela.textContent = "R$ " + valorParcela.toFixed(2);
            celulaQuantidadeParcelas.textContent = parcela + "x";
            console.log(celulaQuantidadeParcelas);

            let button = document.createElement('button');
            button.textContent = 'Aceitar';
            celulaAceitar.appendChild(button);

            button.addEventListener("click", () => {

                // Remove os cards existentes
                let cards = document.querySelectorAll('.card');
                cards.forEach((card) => {
                    card.parentNode.removeChild(card);
                });
                for (let i = 1; i <= parcela; i++) {
                    let card = document.createElement('div');
                    card.classList.add('card');

                    let nomePagador = document.createElement('p');
                    nomePagador.textContent = "Nome do Pagador: " + nomeComprador;

                    let nomeRecebedor = document.createElement('p');
                    nomeRecebedor.textContent = "Nome do Recebedor: " + nomeVendedor;

                    let dataVencimento = document.createElement('p');
                    let today = new Date();
                    let vencimentoDate = new Date(today.getFullYear(), today.getMonth() + i, today.getDate());
                    dataVencimento.textContent = "Data de Vencimento: " + vencimentoDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

                    let numeroParcela = document.createElement('p');
                    numeroParcela.textContent = "Número de parcelas: " + i + "/" + parcela;


                    let valorParcelaCard = document.createElement('p');
                    valorParcelaCard.textContent = "Valor da parcela: R$ " + valorParcela.toFixed(2);

                    card.appendChild(nomePagador);
                    card.appendChild(nomeRecebedor);
                    card.appendChild(dataVencimento);
                    card.appendChild(numeroParcela);
                    card.appendChild(valorParcelaCard);

                    
                    
                   

                    document.getElementById('main').appendChild(card);
                }

            });
        }
    }


});
