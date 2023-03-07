require ([
        'esri/arcgis/utils',

          'dojo/domReady!'],

function(arcgisutils){
    
    var webmap = arcgisutils.createMap('b4579dfba7044e6981db27908275f8f0','mapa').then(function(response){console.log(response)})
/*el .then y responde es para obtener la informacion del item, en este caso el mapa web*/
}
)