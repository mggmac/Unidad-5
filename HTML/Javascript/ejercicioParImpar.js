
var boton = document.getElementById('boton');

boton.addEventListener('click',comprobarNumero)

function comprobarNumero(){
var valor = document.getElementsByTagName('input')[0].value;
var resultadoPantalla= document.getElementById('resultado')
if (valor%2===0){
    resultadoPantalla.innerHTML = 'El número' + valor + ' es un numero par'
} else{
    resultadoPantalla.innerHTML = `El número ${valor} es un número impar`
}
}
