var numero = prompt('Pon un número y te calculo su factorial')
var resultado = 1
for ( var i = numero; i>1;i--){
resultado*=i
    }
alert(resultado)

// este script coge un numero que el usuario introduce, resta 1 unidad y lo multiplica por ese número, y así continua hasta
// llegar al limite indicado, en este caso 1