const res = document.getElementById('result')
function colocarRes(value){
    res.value += value;
}

function limpar(){
    res.value = ""
}

function calcular(){
    let expressao = res.value
    let result = eval(expressao)
    res.value = result
}