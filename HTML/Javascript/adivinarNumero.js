var apuesta=Math.floor(Math.random() * 100)
console.log(apuesta)
var contadorInicial=0
var contadorVidas=4

var boton=document.getElementById('boton')

function comprobar(){
    var numeroIntroducido= document.getElementById('numero').value
    var numeroConvertido= parseInt(numeroIntroducido)
    document.getElementById('contadorIntentos').style.display='block'
    contadorInicial++
    document.getElementById('numeroIntentos').innerHTML=(contadorInicial)
    contadorVidas--
    console.log(contadorVidas)
       
    document.getElementById('vidas').innerHTML=(contadorVidas)

    if (numeroConvertido===apuesta){
        document.getElementById('contadorIntentos').style.display='none'
        document.getElementById('vidas').style.display='none'
        document.getElementById('resultadoApuesta').style.color='green'
        return document.getElementById('resultadoApuesta').innerHTML=(`¡Has acertado crack! &#128079`)}
    else if(numeroConvertido<apuesta){
        document.getElementById('contadorIntentos').style.color='red'
        return document.getElementById('resultadoApuesta').innerHTML=(`¡Fallaste! &#128541 Es más alto`)
    }
    else if (contadorVidas===0){                
        return document.getElementById('numero').style.display='none'
        }
    else return document.getElementById('resultadoApuesta').innerHTML=(`¡Fallaste! &#128541 Es más bajo`)
    
        
}



