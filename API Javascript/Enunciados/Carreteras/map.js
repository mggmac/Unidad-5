require (['esri/map',
"esri/layers/FeatureLayer",
"esri/InfoTemplate",
"esri/symbols/SimpleLineSymbol",
"esri/symbols/SimpleFillSymbol",
"esri/renderers/UniqueValueRenderer",
"esri/Color",
"esri/dijit/Legend",




"dojo/domReady!"],

function( Map,FeatureLayer, InfoTemplate, SimpleLineSymbol,SimpleFillSymbol, UniqueValueRenderer,Color, Legend){
var mapa = new Map('mapa',{
    basemap:'dark-gray',
    center: [-3,40],
    zoom:8,
    
})
// 1 Preparar el mapa para que reaccione al cargarse
mapa.on("load", addFeatureLayer)
function addFeatureLayer(){
    var defaultSymbol = new SimpleFillSymbol().setStyle(SimpleFillSymbol.STYLE_NULL);
          defaultSymbol.outline.setStyle(SimpleLineSymbol.STYLE_NULL)
// 2 Crear renderizador
var renderer = new UniqueValueRenderer(defaultSymbol, 'claseD')

// 3 Añadir simbolo para cada tipo de vía
renderer.addValue("Carretera convencional", new SimpleLineSymbol().setColor(new Color([255, 0, 0, 0.5])))
renderer.addValue("Autovía", new SimpleLineSymbol().setColor(new Color([0, 255, 0, 0.5])));
renderer.addValue("Autopista", new SimpleLineSymbol().setColor(new Color([0, 0, 255, 0.5])));
renderer.addValue("Carretera multicarril", new SimpleLineSymbol().setColor(new Color([255, 0, 255, 0.5])));
renderer.addValue("Urbano", new SimpleLineSymbol().setColor(new Color([255, 255, 255, 0.75])));
renderer.addValue("Camino", new SimpleLineSymbol().setColor(new Color([0, 255, 255, 0.5])));
renderer.addValue("Carril bici", new SimpleLineSymbol().setColor(new Color([255, 255, 0, 0.5])));
renderer.addValue("Senda", new SimpleLineSymbol().setColor(new Color([127, 127, 127, 0.5])));
renderer.addValue("Other", new SimpleLineSymbol().setColor(new Color([0, 0, 0, 0.5])));


// 4 Cargar la capa en cuestion
var carreteras = new FeatureLayer('https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Red_de_carreteras_en_Espa%c3%b1a/FeatureServer/0')
// 5 Introducir una leyenda
var legend = new Legend({
    map:mapa,
    layerInfos:[{title:'Tipos de carretera',layer:carreteras}]
},'leyenda')
legend.startup()
carreteras.setRenderer(renderer)
mapa.addLayer(carreteras)
}



})