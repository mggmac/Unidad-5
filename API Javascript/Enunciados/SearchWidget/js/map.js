require(["dojo/parser",
        'esri/dijit/Search',
        'esri/arcgis/utils',
        'esri/map',
         "dojo/domReady!"], 
    function (parser, Search, arcgisutils, Map) {
        // Parse DOM nodes decorated with the data-dojo-type attribute
        parser.parse();
        var myMap = new Map('cpCenter', {
            basemap: 'satellite',
            center: [-3.86496,40.32234 ],
            zoom:10
        })
        // insertar widget de busqueda
        var busqueda = new Search({
            map: myMap,
            
            maxSuggestions:4,
            minCharacters:4

        }, 'divSearch')
    
    
    
    
    
    }
);
