const button = document.querySelector("button");

button.addEventListener("click", () => {
    const number = Number(document.getElementById("valor").value);

    if (number >= 1 && number <= 1000) {
        let divResultado = document.getElementById("divResultado");

        
        if (!divResultado) {
            divResultado = document.createElement("div");
            divResultado.id = "divResultado";
            document.body.appendChild(divResultado);
        }

        
        divResultado.innerHTML = "";

        for (let numero = 2; numero <= number; numero++) {
            let primo = true;

            for (let divisor = 2; divisor < numero; divisor++) {
                if (numero % divisor === 0) {
                    primo = false;
                    break;
                }
            }

            if (primo) {
                let paragraph = document.createElement("p");
                let text = document.createTextNode(numero + ',' );
                
                paragraph.appendChild(text);
                
                document.querySelector('#main').appendChild(divResultado).appendChild(paragraph);
            }
        }
    } else {
        alert("O valor deve estar entre 1 e 1000");
    }
});