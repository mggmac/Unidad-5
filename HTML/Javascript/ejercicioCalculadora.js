


var botonCargar=document.getElementById('botonCargar')
var botonCalcular=document.getElementById('botonCalcular')
var botonReinicio= document.getElementById('botonReinicio')

function cargarEjemplo(){
    document.getElementById('inputNumeros').value='50,54,87'

}

function reiniciar(){
    document.getElementById('inputNumeros').value=" "
    document.getElementById('pSuma').innerHTML=" "
    document.getElementById('pMedia').innerHTML=" "
    document.getElementById('vMax').innerHTML=" "
    document.getElementById('vMin').innerHTML=" "
    
}

function calcular(){
    // Suma

    var numeros=document.getElementById('inputNumeros').value /* aquí consigo el valor que metamos, que aunque sean números será una cadena de texto*/
    const arrayNumeros=numeros.split(',') /* aquí convierto la cadena en una array pero sigue siendo texto*/
    const listaNumeros= arrayNumeros.map(function(numero){return parseInt(numero)}) /*aquí recorro la array y convierto cada cadena de texto a número*/
    console.log(listaNumeros)
    suma=0
    for (let i of listaNumeros){suma+=i}
    document.getElementById('pSuma').innerHTML=`La suma de los número es ${suma}`

    // Media

    const media = (suma/listaNumeros.length).toFixed(2)
    document.getElementById('pMedia').innerHTML=`La media de los número es ${media}`

    // Máximo y mínimo

    const max = Math.max(...listaNumeros)/*Importante poner los tres puntos antes de la array*/
    document.getElementById('vMax').innerHTML=`El valor máximo es ${max}`
    const min = Math.min(...listaNumeros)
    document.getElementById('vMin').innerHTML=`El valor mínimo es ${min}`
    
}

function ocultar(){
    document.getElementById('cuerpo').style.display = 'none';
    document.getElementById('mostrar').style.display='block'
}

function mostrar(){
    document.getElementById('cuerpo').style.display = '';
    document.getElementById('mostrar').style.display='none'
}