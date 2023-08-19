let divResultado = null; 

document.querySelector('#enviar').addEventListener("click", () => {
    
    if (divResultado) {
        document.querySelector(".main").removeChild(divResultado);
        divResultado = null; 
    }
    
    let select = document.getElementById("select").value;
    let temp = Number(document.getElementById("temp").value);
    let F = (9 * temp + 160) / 5;
    var img = document.createElement("img");
    img.setAttribute('id', 'foto');
    
    switch (select) {
        case "a":
            if (0 <= temp && temp <= 18) {
                divResultado = document.createElement("div");
                divResultado.innerHTML = "<h3>O resultado é: " + F + " °F</h3>";
                img.setAttribute('src', 'imagens/carne-saudavel.jfif');
                document.querySelector(".main").appendChild(divResultado).appendChild(img);
            }
            if (temp < 0) {
                divResultado = document.createElement("div");
                divResultado.innerHTML = "<h3>O resultado é: " + F + " °F</h3>";
                img.setAttribute('src', 'imagens/carne-congelada.jpg');
                document.querySelector(".main").appendChild(divResultado).appendChild(img);
            }
            if (18 < temp) {
                divResultado = document.createElement("div");
                divResultado.innerHTML = "<h3>O resultado é: " + F + " °F</h3>";
                img.setAttribute('src', 'imagens/carne-estragada.jpg');
                document.querySelector(".main").appendChild(divResultado).appendChild(img);
            }
            break;
        case "b":
            console.log("b")
            if(25<=temp && temp<=32){
                divResultado = document.createElement("div");
                divResultado.innerHTML = "<h3>O resultado é: " + F + " °F</h3>";
                img.setAttribute('src','imagens/pessoas-praia.jpg')
                document.querySelector(".main").appendChild(divResultado).appendChild(img);
            }
            if(temp<25){
                divResultado = document.createElement("div");
                divResultado.innerHTML = "<h3>O resultado é: " + F + " °F</h3>";
                img.setAttribute('src','imagens/lugar-frio.jpg')
                document.querySelector(".main").appendChild(divResultado).appendChild(img);
            }
            if(temp>32){
                divResultado = document.createElement("div");
                divResultado.innerHTML = "<h3>O resultado é: " + F + " °F</h3>";
                img.setAttribute('src','imagens/lugar-quente.jpg')
                document.querySelector(".main").appendChild(divResultado).appendChild(img);
            }
            break
        case "c":
            console.log("c")
            if(180<=temp && temp<=200){
                divResultado = document.createElement("div");
                divResultado.innerHTML = "<h3>O resultado é: " + F + " °F</h3>";
                img.setAttribute('src','imagens/salgados-fritando.jpg')
                document.querySelector(".main").appendChild(divResultado).appendChild(img);
            }
            if(180>temp){
                divResultado = document.createElement("div");
                divResultado.innerHTML = "<h3>O resultado é: " + F + " °F</h3>";
                img.setAttribute('src','imagens/espere.jfif')
                document.querySelector(".main").appendChild(divResultado).appendChild(img);
            }
            if(200<temp){
                divResultado = document.createElement("div");
                divResultado.innerHTML = "<h3>O resultado é: " + F + " °F</h3>";
                img.setAttribute('src','imagens/fogo-off.jpg')
                document.querySelector(".main").appendChild(divResultado).appendChild(img);
            }
            break

        }


});
