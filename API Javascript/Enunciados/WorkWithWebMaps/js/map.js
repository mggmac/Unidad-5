var mapMain;
var legendLayers ;
var webmapId = '7d987ba67f4640f0869acb82ba064228';

require([
  'esri/arcgis/utils',
  
  "dojo/parser",
  
  "esri/dijit/Legend",
  'esri/dijit/BasemapGallery',
  "dojo/domReady!",
], function (arcgisutils, parser, Legend, BasemapGallery) {
  parser.parse();/*esto sirve para que los elementos se coloquen automaticamente*/
  // crear mapa
  var webmap = arcgisutils
  .createMap(webmapId,'cpCenter')
  // esto para que reaccione automaticamente al cargar un mapa web y ponga el titulo acorde con él
  .then(function(response){
    document.getElementById('title').innerHTML=response.itemInfo.item.title
    
    // meter leyenda
    var legend = new Legend({
      map: response.map,
      
    },'divLegend')
    legend.startup()

    // meter basemapgallery
  var basemapGallery = new BasemapGallery({
    showArcGISBasemaps: true,
    map:response.map
  },'basemapGallery')
  basemapGallery.startup()
  
  })




  

});
