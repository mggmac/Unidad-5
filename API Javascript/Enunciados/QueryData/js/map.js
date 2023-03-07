 // URL variables
  // http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer
  // https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer

require(["esri/map",
         "dojo/parser",
         'esri/layers/ArcGISDynamicMapServiceLayer',
         "esri/layers/FeatureLayer",
         'esri/toolbars/draw',
         'esri/graphic',
         "esri/symbols/SimpleFillSymbol",
         'esri/geometry/Polygon',
         "esri/tasks/query",
         "esri/symbols/SimpleMarkerSymbol",
         
         
         "dojo/domReady!"], 
         
         

function (Map, parser, ArcGISDynamicMapServiceLayer, FeatureLayer, Draw, Graphic, SimpleFillSymbol, Polygon, Query, SimpleMarkerSymbol) {
  // Parse DOM nodes decorated with the data-dojo-type attribute
  parser.parse();
 var mapa = new Map('divMap',{
  basemap: 'hybrid',
  center: [-122.68,45.53,-122.45,45.60,],
  zoom:8
 })

// Construct the USA layer - Ocultar capa de estados
var USA = new ArcGISDynamicMapServiceLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer', {
  opacity:0.5
})
var visibles = [1,3]
USA.setVisibleLayers(visibles)

// Construct the Quakes layer - Mostrar solo los de magnitud mayor de 2
var terremotos = new FeatureLayer('https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0',{outFields: ['FID','MAGNITUDE', 'PLACE']})
terremotos.setDefinitionExpression('MAGNITUDE>2')
mapa.addLayers([USA, terremotos])

//  Wire the draw tool initialization function
mapa.on("load", activate)
var toolbar = new Draw(mapa)
function activate(){
toolbar.activate(Draw.POLYGON)
toolbar.on('draw-end',addToMap) /*cuando acabas de dibujar el poligono se activa addtomap*/
}
function addToMap(evt){ /*cuando terminas de dibujar el poligono se activa esta funcion que recibe como parametro evt, pero lo puedes llamar como quiers; que captura lo que has dibujado con evt, te lo pinta y lo mete a la capa grafica*/
  var symbol
  
  switch(evt.geometry.type){
    default:
    symbol = new SimpleFillSymbol()
    
  }
  var grafico = new Graphic(evt.geometry, symbol)
  mapa.graphics.clear()/*esto para que se borre la seleccion anterior al hacer una nueva*/
  mapa.graphics.add(grafico)
  selectEarthquakes(evt.geometry)
  // toolbar.deactivate()
  
}

// Filtro con geometría
function selectEarthquakes (geoInput) {
  console.log('geo', geoInput);
  var consulta = new Query();
  consulta.geometry = geoInput;

  terremotos.selectFeatures(consulta);

  var marker = new SimpleMarkerSymbol();
  marker.setStyle(SimpleMarkerSymbol.STYLE_X);

  terremotos.setSelectionSymbol(marker) 

}
terremotos.on('selection-complete',listaTerremotos) /*se activa cuando se termina una seleccion nueva*/
function listaTerremotos(results){
console.log(results)
 var terremotos = results.features
 document.getElementById('listaVacia').innerHTML=''
 for (feature of terremotos){
 console.log(feature.attributes)
 
 var elementosLista = document.createElement('li')
var contenido = document.createTextNode(`Terremoto de magnitud ${feature.attributes.MAGNITUDE} producido en ${feature.attributes.PLACE}`)
elementosLista.appendChild(contenido)
document.getElementById('listaVacia').appendChild(elementosLista)
}


}
}
)


