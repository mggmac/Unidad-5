var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T']
    dni=prompt('Introduce tu DNI sin letra')
    

    if (dni < 0 || dni > 99999999 ){
        alert("El numero indicado no es válido");
    
    }
    else{
        var letraDNI= letras[dni%23]
        alert(letraDNI)
    }
// otra manera de indicar la longitud del numero es poner || dni.length!=8 , es lo mismo que poner dni>99999999