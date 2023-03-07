
      var map;
      require([
        "esri/map", 
        "esri/layers/FeatureLayer",
        "esri/tasks/query",
        "esri/symbols/SimpleMarkerSymbol",
        'esri/Color',
        "esri/symbols/SimpleLineSymbol",
        
        "dojo/domReady!"
      ], function(
        Map, FeatureLayer,Query,SimpleMarkerSymbol,Color,SimpleLineSymbol
      ) {
        map = new Map("map", {
          basemap: "streets-vector",
          center: [-3, 40],
          zoom: 5,
        })
        var hospitales = new FeatureLayer('https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Hospitales/FeatureServer/0');
        map.addLayers([hospitales])
        document.getElementById('selectProv').addEventListener('change',selectHospitales)
        function selectHospitales(){
            var select = document.getElementById('selectProv').value
            console.log('ha cambiado', select)
            // definir consulta
            var consulta = new Query()
            consulta.where = "CODPROV= " + select
            // otra forma de ponerlo seria `CODPROV= ${select}
            hospitales.selectFeatures(consulta)

            // defino simbologia para aplicar cuando cambie
            var line = new SimpleLineSymbol();
            line.setColor(new Color([255, 0, 0, 1]));
            var marker = new SimpleMarkerSymbol();
            marker.setStyle(SimpleMarkerSymbol.STYLE_CROSS);
            marker.setOutline(line);
            // aplico simbologia
            hospitales.setSelectionSymbol(marker)

        }
        
        
        
        
            
        

         
      });