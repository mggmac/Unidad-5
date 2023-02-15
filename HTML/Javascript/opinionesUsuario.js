function capturarTexto(){
    var texto = document.getElementById('opinion').value
    
    document.getElementById('rellenar').innerHTML=(texto)
}

// ahora vamos a hacer lo mismo pero controlando cuando el usuario de al enter

// paso 1 controlar lo que escribe el usuario usando keydown, keyup, keypress

var textarea =document.getElementById('opinion')
textarea.addEventListener('keyup', checkEnter)

// controlar cuando el usuario usa el enter keycode = enter(13) y cuando lo haga llamar a la funcion capturarTexto

function checkEnter(evt){
    if (evt.keyCode===13){
    capturarTexto()
    }
}





