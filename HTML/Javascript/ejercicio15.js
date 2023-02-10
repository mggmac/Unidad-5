// var boton = document.getElementById('boton');

// boton.addEventListener('click',alertar)

function alertar(){
    alert('Guardado')
}


const input = document.getElementById('input1')
input.addEventListener('focus', cambiarColor =>{
    input.style.background='green'
})

input.addEventListener('focusout', cambiarColor =>{
    input.style.background=''
})

var inputLetras= document.getElementById('input2')

inputLetras.addEventListener('keydown', vocales)

function vocales(event){
    console.log(event) /* para sacar el código identificativo de las vocales */
    const vocales=[65,69,79,73,85]
    if (vocales.includes(event.keyCode)===true){
        inputLetras.style.color='green'
        } else{
            inputLetras.style.color='red'
        }
}
