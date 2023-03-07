require(["esri/map",
      "dojo/on",
      "esri/dijit/Search",
      "esri/layers/ArcGISDynamicMapServiceLayer",
      "esri/geometry/Extent",
      "esri/toolbars/draw",
      "esri/graphic",
      "esri/symbols/SimpleLineSymbol",
      "esri/Color",
      "esri/symbols/SimpleFillSymbol",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/layers/FeatureLayer",
      "esri/tasks/query",
      "esri/dijit/PopupTemplate",
      "esri/graphicsUtils",
      "esri/dijit/Legend",
       "esri/dijit/Search",
       "esri/dijit/BasemapGallery",
       "esri/dijit/OverviewMap",
       "esri/dijit/Scalebar",
      

      "dijit/TitlePane",
      "dijit/layout/TabContainer",
      "dijit/layout/ContentPane",
      "dijit/layout/BorderContainer",
      "dojo/domReady!"],
      function (
        Map,
        on,
        Search,
        ArcGISDynamicMapServiceLayer,
        Extent,
        Draw,
        Graphic,
        SimpleLineSymbol,
        Color,
        SimpleFillSymbol,
        SimpleMarkerSymbol,
        FeatureLayer,
        Query,
        PopupTemplate,
        graphicsUtils,
        Legend,
        BasemapGallery,
        PopupTemplate,
        OverviewMap,
        Scalebar,
        
        
        

      ) {
        on(dojo.byId("pintaYQuery"), "click", fPintaYQuery);
        on(dojo.byId("progButtonNode"), "click", fQueryEstados);

        function fPintaYQuery() {
          // alert("Evento del botón Seleccionar ciudades");
          
          var toolbar = new Draw(map) 
          toolbar.activate(Draw.POLYGON) /*dibujar poligono*/
          toolbar.on('draw-complete', function(event){ /*capturar poligono al terminar de clickar, pintarlo en el mapa y cambiar simbologia de lo capturado por ese poligono*/
          map.graphics.clear()
          var line = new SimpleLineSymbol();
          line.setColor(new Color([230, 0, 169, 1]));
          var relleno = new SimpleFillSymbol();
          relleno.setOutline(line);
          relleno.setColor(new Color([255, 255, 0, 0.25]))
          var poligono = new Graphic(event.geometry,relleno)
          map.graphics.add(poligono)
          // Ahora seleccionar las ciudades recogidas por el poligono y cambiar su simbologia
          var marcador = new SimpleMarkerSymbol()
          marcador.setColor(new Color([255, 0, 0, 0.99]));
          marcador.setStyle(SimpleMarkerSymbol.STYLE_SQUARE);
          capaCiudades.setSelectionSymbol(marcador)
          // Una vez definida la simbologia creo la query para poder hacer la seleccion
          var consulta = new Query()
          consulta.geometry=event.geometry
          capaCiudades.selectFeatures(consulta, FeatureLayer.SELECTION_NEW)

          })
        }

        function fQueryEstados() {
          // Mismos pasos, primero definir simbología a aplicar con la consulta, luego definir la consulta que este caso es de localizacion
          // alert("Evento del botón Ir a estado");
          
          var relleno = new SimpleFillSymbol();
          
	        relleno.setColor(new Color([255, 255, 0, 0.26]))
          capaEstados.setSelectionSymbol(relleno)

          var estado = document.getElementById('dtb').value
          console.log(estado)

          var query = new Query()
          query.where = "state_name: ' " +  estado  + " ' ";
          capaEstados.selectFeatures(query, FeatureLayer.SELECTION_NEW)
          capaEstados.on('selection-complete', irEstado)
          
          function irEstado(resultado){
            console.log(resultado)
          var centrarEstado = graphicsUtils.graphicsExtent(resultado).getCenter();
  
           map.centerAt(centrarEstado)
          }
  
        }

        
        var map = new Map("map", {
          basemap: "topo",
          extent: new Extent({
            xmin: -20486358.990939766,
            ymin: 970584.725861311,
            xmax: -6446405.635522326,
            ymax: 11742702.248031767,
            spatialReference: { wkid: 102100, latestWkid: 3857 },
          }),
          // zoom: 13,
          sliderStyle: "small"
        });
        var servicioMapa = new ArcGISDynamicMapServiceLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/',{
          opacity: 0.4
        }) /*esto no acepta popup, hay que cagar a parte la capa que queremos mostrar informacion y quitar la visibilidad de esa capa en el map server*/
        servicioMapa.setVisibleLayers([1, 3])
       
        
        // Para los estados nos piden un pop-up, se configura antes de meterlo en las opciones de la capa
        var popup = new PopupTemplate({
          // titulo de la ventana del popup, en este caso se nos indica el nombre del estado
          title:"{state_name}",
      //     // cada uno de los campos que queremos que se vea en el popup, junto con una etiqueta para que sea más fácil saber lo que tiene ese campo y que sea visible
          fieldInfos:[
            {
            fieldName: 'pop2000',
            label: 'Población',
            visible:true
          },
        {
            fieldName: 'pop00_sqmi',
            label: 'Población por sqmi',
            visible:true
        },
      {
            fieldName: 'ss6.gdb.States.area',
            label: 'Area en sqmi',
            visible:true,
            format: {places : 0} /*esto es para quitarle los decimales*/
          }
       ]
         })
        var capaEstados = new FeatureLayer(
          'http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2',{
            infoTemplate:popup,
            outFields: ["state_name",'pop2000','pop00_sqmi', 'ss6.gdb.States.area']
          })
        
          var capaCiudades = new FeatureLayer(
            'http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0')

        map.addLayers([capaCiudades,capaEstados,servicioMapa])
        
      // Leyenda

      var leyenda = new Legend({
        map:map

      },'legendDiv')
      leyenda.startup()

      // Búsqueda

      var busqueda = new Search({
         map:map
       },'containerSearch')
       busqueda.startup()

      // Galería Mapas Base

      // var basemap = new BasemapGallery({
      //   showArcGISBasemaps: true,
      //   map:map

      // },'containerGallery')
      // basemap.startup()

      // Overview

      var vista = new OverviewMap({
        map:map,
        
        opacity:0.4})
      vista.startup()

      // Escala
      var escala = new Scalebar({
        map:map,
        
      })
      escala.startup()
      });
