require(["dojo/parser",
        'esri/map',
        "esri/dijit/Directions",

        "dojo/domReady!"], function (parser, Map ,Directions) {
  // Parse DOM nodes decorated with the data-dojo-type attribute
  parser.parse();

  var mapa = new Map ('cpCenter',{
    basemap:'satellite',
    center: [-3,40],
    zoom:8
  })
  var direcciones = new Directions({
    map: mapa,
    routeTaskUrl:'http://utility.arcgis.com/usrsvcs/appservices/OM1GNiiACNJceMRn/rest/services/World/Route/NAServer/Route_World'
  },'divDirections')
  direcciones.startup()
});
