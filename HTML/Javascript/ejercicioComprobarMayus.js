// primero se captura lo escrito por el usuario
// luego se comprueba si es mayuscula o minuscula

function comprobar() {


const fraseUsuario = document.getElementById('frase').value;
var fraseMinus = fraseUsuario.toLowerCase();
var fraseMayus= fraseUsuario.toUpperCase()

if (fraseUsuario===fraseMayus){
    document.getElementById('resultado').innerHTML = 'Está en mayúscula'
}else if (frase == fraseMinus) {
    document.getElementById('resultado').innerHTML === 'Está en minuscula'
}
else {
    document.getElementById('resultado').innerHTML = 'Está en minúscula y mayúscula'
}
};


