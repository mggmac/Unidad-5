

require([
        "esri/map",
        "dojo/parser",
        "esri/tasks/GeometryService",
        "esri/toolbars/draw",
        "esri/graphic",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        'esri/Color',
        
        'esri/symbols/SimpleFillSymbol',
        "esri/tasks/BufferParameters",
        "esri/SpatialReference",
        


        "dojo/domReady!"],
function (Map,  parser, GeometryService, Draw, Graphic, SimpleMarkerSymbol, SimpleLineSymbol,
    Color, SimpleFillSymbol, BufferParameters, SpatialReference) {
            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();


            // Create the map
            mapMain = new Map("divMap", {
                basemap: "topo",
                center: [-122.45, 37.75],
                zoom: 12
            });
    
            // Activar geoprocesador

            var geoservicio = new GeometryService('https://utility.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer')
            
       
             var toolbar = new Draw(mapMain)
            mapMain.on('load',activarToolbar)
            function activarToolbar(){
                 toolbar.activate(Draw.LINE)}
            var line = new SimpleLineSymbol();
            line.setColor(new Color([255, 0, 0, 1]));
                
            toolbar.on('draw-end', dibujarLinea)
            function dibujarLinea(evt){
                console.log(evt)
                var grafico = new Graphic(evt.geometry,line)
                mapMain.graphics.add(grafico)
	        var params = new BufferParameters()
            params.geometries=[evt.geometry]
            params.distances=[1]
            params.outSpatialReference=mapMain.spatialReference
            params.unit = GeometryService.UNIT_KILOMETER
            geoservicio.buffer(params, mostrarBuffer)
            function mostrarBuffer(evt){
                var line = new SimpleLineSymbol()
                var relleno = new SimpleFillSymbol()
                line.setWidth(params.distances)
                line.setColor(new Color([255, 0, 0, 1]))
                relleno.setColor(new Color([255, 0, 0, 1]))
                var graficoBuffer = new Graphic(evt[0],line)
                mapMain.graphics.add(graficoBuffer)
            }

            
    }
            }
        );   