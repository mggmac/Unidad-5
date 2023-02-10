var lista=[1,2,3,4,5,6]
var max = lista[0]
// opcion 1
for (let i=0; i<lista.length;i++){
    console.log(lista[i]);
    var valorActual=lista[i];
    
    if(valorActual>max){
        max=valorActual
    }
}
console.log('Opción 1: El valor máximo es', max)

// opcion 2
for (let j of lista){
    if(j>max){
        max=j
    }
}
console.log('Opción 2: El valor máximo es', max)