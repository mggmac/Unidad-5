

function mostrarExperiencia(){
    if(document.getElementById('experienciaLaboral').style.display==='none')/*aquí se debe poner === para que compare, un = establece el valor del display*/
    return document.getElementById('experienciaLaboral').style.display='block'
    else
    return document.getElementById('experienciaLaboral').style.display='none'
    
}

function mostrarFormacion(){
    if(document.getElementById('formacion').style.display==='none')
    return document.getElementById('formacion').style.display='block'
    else
    return document.getElementById('formacion').style.display='none'
}

