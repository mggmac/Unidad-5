require([
    "dojo/parser",
  "esri/map",
  "esri/dijit/editing/Editor",
  "esri/layers/FeatureLayer",
  "esri/Color",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/dijit/editing/TemplatePicker",
  "dojo/_base/array",
  "esri/tasks/GeometryService",


  "dojo/domReady!",
],function(parser,Map,Editor,FeatureLayer,Color,SimpleMarkerSymbol,SimpleLineSymbol, TemplatePicker,arrayUtils,GeometryService){
    parser.parse()
    var mapa = new Map('divMap',{
        
            basemap: "streets-navigation-vector",
            center: [-117.19, 34.05],
            zoom: 8,
          
    })
    

    var capaPuntos = new FeatureLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/0');
    

    var capaLineas = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/1", {
     outFields: ['*']
    });

    var capaPoligonos = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/2", {
       outFields: ['*']
    });

    mapa.addLayers([capaPuntos, capaLineas,capaPoligonos])

    mapa.on("layers-add-result",iniciarEditor)

    function iniciarEditor(evento){
        var templateLayers = evento.layers.map( function(capa){
            return capa.layer});
          var templatePicker = new TemplatePicker({
            featureLayers: templateLayers,
            columns:2,
            
           
          }, "divLeft");
          templatePicker.startup()




        var layers = evento.layers.map(function(capa) {
            return { featureLayer: capa.layer }})
        var settings = {
            map:mapa,
            geometryService: new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer"),
            layerInfos:layers,
            templatePicker:templatePicker,
            toolbarVisible:true,
            createOptions: {
                polylineDrawTools:[ Editor.CREATE_TOOL_FREEHAND_POLYLINE ],
                polygonDrawTools: [ Editor.CREATE_TOOL_FREEHAND_POLYGON,
                  Editor.CREATE_TOOL_CIRCLE,
                  Editor.CREATE_TOOL_TRIANGLE,
                  Editor.CREATE_TOOL_RECTANGLE
                ]
              },
              toolbarOptions: {
                reshapeVisible: true
              },
        }
        var params = {settings:settings}
        var miEditor = new Editor(params,'divTop')
        miEditor.startup()

    

}
})