var mapMain;

require([
        "esri/map",
        "dojo/parser",
        "esri/tasks/Geoprocessor",
        "esri/toolbars/draw",
        "esri/graphic",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        'esri/Color',
        "esri/tasks/FeatureSet",
        'esri/symbols/SimpleFillSymbol',
        "esri/graphicsUtils",
        "esri/tasks/LinearUnit",
        


        "dojo/domReady!"],
function (Map,  parser, Geoprocessor, Draw, Graphic, SimpleMarkerSymbol, SimpleLineSymbol,
    Color, FeatureSet,SimpleFillSymbol, graphicsUtils,LinearUnit) {
            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();


            // Create the map
            mapMain = new Map("divMap", {
                basemap: "topo",
                center: [-122.45, 37.75],
                zoom: 12
            });
    
            // Activar geoprocesador

            var geoproceso = new Geoprocessor('http://sampleserver6.arcgisonline.com/arcgis/rest/services/Elevation/ESRI_Elevation_World/GPServer/Viewshed')

            
            
            // activar la herramienta Draw para indicarle dónde está el punto que debe tomar como imput
            var toolbar = new Draw(mapMain)
            toolbar.activate(Draw.POINT)
             var line = new SimpleLineSymbol();
	         line.setColor(new Color([255, 0, 0, 1]));
	     var marker = new SimpleMarkerSymbol();
	        marker.setStyle(SimpleMarkerSymbol.STYLE_CROSS);
	         marker.setColor(new Color([255, 0, 0, 0.25]));
            toolbar.on('draw-end', dibujarPunto)
            function dibujarPunto(evt){
                var geometria = evt.geometry
                var grafico = new Graphic(geometria,marker)
                mapMain.graphics.add(grafico)
                var features= [];
            features.push(grafico);
            var featureSet = new FeatureSet();
            featureSet.features = features;
            var unidadDistancia = new LinearUnit()
            unidadDistancia.distance = 5
            unidadDistancia.units= "esriMiles"
             
            geoproceso.outSpatialReference = mapMain.spatialReference
                var params = {"Input_Observation_Point": featureSet, "Viewshed_Distance": unidadDistancia }
             geoproceso.execute(params)

            geoproceso.on('execute-complete', dibujar)

            }
           function dibujar(results){
                var viewShedSymbol = new SimpleFillSymbol()
                viewShedSymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0, 0.5]), 1))
                viewShedSymbol.setColor(new Color([230,152,0,0.54]))
                console.log('results',results)
                var resultados = results.results[0].value
                console.log('resultados',resultados)
                var features=resultados.features
                console.log('features',features)
                for (i = 0; i < features.length; i++){
                    var feature = features[i]
                    console.log('feature',feature)
                    feature.setSymbol(viewShedSymbol)
                    mapMain.graphics.add(feature)
                     
                }

                

                };

                // update the map extent
                //      var extentViewshed = graphicsUtils.graphicsExtent(mapMain.graphics.graphics);
                //    mapMain.setExtent(extentViewshed, true)
           }
            
            
            
            
           


    );