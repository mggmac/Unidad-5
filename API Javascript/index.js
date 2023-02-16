require(
    ['esri/map', 
    'dojo/dom', 
    "esri/geometry/Point",
    'dojo/on',
    'dojo/domReady!'],/*dojo/domReady DEBE ESTAR AL FINAL SIEMPRE*/
    function(Map,dom,Point,showZoom){
        var myMap= new Map('divMap',{
            basemap: 'satellite',/*importante poner la coma para separar los objetos*/
            center: [-3,40],
            // zoom: 15
            scale: 10000
        });
    // seleccionar el boton del html
    var boton=dom.byId('boton')
    // agregar el evento al que debe reaccionar, otra opcion seria on(boton, 'click',goTo), es decir usando dojo, el evento de debajo es JS
    boton.addEventListener('click', goTo);
    // se define la funcionar con la que debe reaccionar
    function goTo(){
     var point = new Point(-4.46,36.70);
     myMap.centerAt(point);   
    }

    // cuando cambio el zoom del mapa -> buscar lista eventos
    // se ejecuta la funcion showLevel
    // showlevel: consulta en el mapa el nivel de zoom con getZoom()
    // pintar en pantalla el numero que devuelve getZoom()
    myMap.on('zoom-end', showZoom);

    function showZoom(){
        dom.byId('nivelZoom').innerHTML=(`El nivel de zoom actual es ${myMap.getZoom()}`)
    }

    },
)

