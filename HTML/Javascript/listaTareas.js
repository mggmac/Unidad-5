




function capturarTexto(){
    var texto = document.getElementById('input').value
    var listaVacia=document.createElement('li')
    var check= document.createElement('input')
    check.type='checkbox';/*otra alternativa seria check.setAttribute*/
    document.body.append(listaVacia)
    listaVacia.appendChild(check)
    listaVacia.append(texto)
 
    
}
/*otra opcion sería crear una ul en el html primero, luego crear aquí los elementos li y rellenarlo con la variable texto, una vez hecho esto metemos la li con un appenChild*/
