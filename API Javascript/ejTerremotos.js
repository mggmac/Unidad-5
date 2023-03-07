require(
    ['esri/map',
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/FeatureLayer",
    "esri/geometry/Extent",
    "esri/SpatialReference",
    'esri/dijit/HomeButton',
    "esri/dijit/BasemapToggle",
    "esri/dijit/Legend",
    "esri/dijit/OverviewMap",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleMarkerSymbol",
    'esri/symbols/SimpleLineSymbol',
    "esri/Color",
    "esri/dijit/PopupTemplate",

    'dojo/domReady!'],

    function(Map, 
        ArcGISDynamicMapServiceLayer, 
        FeatureLayer, 
        Extent, 
        SpatialReference,
        HomeButton,
        BasemapToggle,
        Legend,
        OverviewMap,
        SimpleRenderer,
        SimpleMarkerSymbol,
        SimpleLineSymbol,
        Color,
        PopupTemplate
        ){
        var myMap = new Map('viewDiv', {
            basemap: 'satellite',
            zoom: 5,
            extent: new Extent(
            extent = new Extent(
                    -122.68,45.53,-122.45,45.60, 
                new SpatialReference({ wkid:4326 }))
            )
            
            });
    /*var estados = new FeatureLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2')
    var terremotos = new FeatureLayer('http://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/Earthquakes/FeatureServer/0')
    myMap.addLayers([estados, terremotos])
    myMap.setDefinitionExpression('MAGNITUDE'>2)*/
    var USA = new ArcGISDynamicMapServiceLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer',{
        opacity: 0.5
    })
    /*myMap.addLayer(USA) /*esto sirve para añadir todas las capas de un servicio como este caso que tiene 4, antes he añadido una sola, aquí añado las 4*/

    /*para meter Popup de informacion adicional*/
    var template = new PopupTemplate({
        title: 'Terremoto de magnitud {MAGNITUDE}',
        description:'{PLACE}'
        
    })

    var terremotos = new FeatureLayer('http://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/Earthquakes/FeatureServer/0',{
        infoTemplate: template,
        outFields:['FID','MAGNITUDE','PLACE']
    })
    terremotos.setDefinitionExpression('MAGNITUDE>2')
    

    /*para el boton llevar a casa*/
    var casa = new HomeButton({
        map: myMap,
    },'homeDiv')
    casa.startup()
    /*para el boton cambiar mapa base*/
    var cambioMapa = new BasemapToggle({
        map: myMap,
        basemap: 'dark-gray',
    },'basemapTog')
    cambioMapa.startup()
    
    /*para la leyenda*/
    
    myMap.on('layers-add-result', displayLegend)
    function displayLegend(){
        var legend = new Legend({
            map:myMap,
            layerInfos:[{title:'Terremotos',layer:terremotos}]
        },'legend')
        legend.startup()
    }
    

    /*para el overview*/
    var overview = new OverviewMap({
        map:myMap,
        attachTo: 'bottom-right',
        visible: true
    })
    overview.startup()

    /*para visualizar los terremotos según su magnitud*/
    var line = new SimpleLineSymbol();
    line.setColor(new Color([255, 0, 0, 1]));
    var marker = new SimpleMarkerSymbol();
    marker.setOutline(line);
    var renderer =  new SimpleRenderer(marker)
    
    var tamaño = {
        type:'sizeInfo',
        field:'MAGNITUDE',
        minDataValue:1,
        maxDataValue:10,
        minSize: 6,
        maxSize: 100
    }

    





    renderer.setVisualVariables([tamaño])
    terremotos.setRenderer(renderer)
    
    myMap.addLayers([USA,terremotos])

    })        
