var enlaces = document.getElementsByTagName('a')
console.log(enlaces.length)


console.log(enlaces[enlaces.length-2].href)

var tercerP= document.getElementsByTagName('p')
var enlacesTercerP= tercerP[2].getElementsByTagName('a')
console.log(enlacesTercerP.length)

const pNuevo= document.createElement('p')
const contenidoPNuevo= document.createTextNode(enlaces.length + enlaces[4].href + enlacesTercerP.length)

pNuevo.appendChild(contenidoPNuevo)

document.body.appendChild(pNuevo)

// otra forma de meter los resultados es ir haciendo lo mismo varias veces las lineas 11-16 con cada cosa que queremos imprimir en la pag


var element = document.getElementById('clase')

element.classList.remove('clase')




