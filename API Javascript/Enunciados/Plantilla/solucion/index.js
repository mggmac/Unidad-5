var map;
var tb;
require([
  "esri/map",
  "dojo/on",

  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/layers/FeatureLayer",

  "esri/geometry/Extent",
  "esri/tasks/query",
  "esri/graphicsUtils",

  "esri/toolbars/draw",
  "esri/graphic",

  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/Color",

  "esri/dijit/Legend",
  "esri/dijit/Search",
  "esri/dijit/PopupTemplate",

  "dijit/TitlePane",
  "dijit/layout/TabContainer",
  "dijit/layout/ContentPane",
  "dijit/layout/BorderContainer",
  "dojo/domReady!",
], function (
  Map,
  on,

  ArcGISDynamicMapServiceLayer,
  FeatureLayer,

  Extent,
  Query,
  graphicsUtils,

  Draw,
  Graphic,

  SimpleMarkerSymbol,
  SimpleFillSymbol,
  SimpleLineSymbol,
  Color,

  Legend,
  Search,
  PopupTemplate
) {
  on(dojo.byId("pintaYQuery"), "click", fPintaYQuery);
  on(dojo.byId("progButtonNode"), "click", fQueryEstados);

  function fPintaYQuery() {
    tb = new Draw(map);
    tb.activate(Draw.POLYGON);

    tb.on("draw-complete", function (event) {
      // Añadir el polígono de seleccion al mapa
      var line = new SimpleLineSymbol();
      line.setColor(new Color([230, 0, 169, 1]));
      var fill = new SimpleFillSymbol();
      fill.setOutline(line);
      fill.setColor(new Color([255, 255, 0, 0.25]));

      var poligono = new Graphic(event.geometry, fill);
      map.graphics.add(poligono);

      // Seleccionar ciudades
      var marker = new SimpleMarkerSymbol();
      marker.setColor(new Color([230, 0, 0, 0.25]));
      marker.setStyle(SimpleMarkerSymbol.STYLE_DIAMOND);

      layerCities.setSelectionSymbol(marker);

      var query = new Query();
      query.geometry = event.geometry;
      layerCities.selectFeatures(query, FeatureLayer.SELECTION_NEW);
    });
  }

  function fQueryEstados() {
    var line = new SimpleLineSymbol();
    line.setColor(new Color([230, 0, 169, 1]));
    var fill = new SimpleFillSymbol();
    fill.setOutline(line);
    fill.setColor(new Color([255, 255, 0, 0.25]));

    layerStates.setSelectionSymbol(fill);

    var state = dojo.byId("dtb").value;

    var query = new Query();
    query.where = "state_name = ' " + state + " ' "; // "state_name = 'California' "
    layerStates.selectFeatures(query, FeatureLayer.SELECTION_NEW, goToState);

    // layerStates.on('selection-complete', goToState)
  }

  function goToState(result) {
    var centerState = graphicsUtils.graphicsExtent(result).getCenter();

    map.centerAt(centerState);
  }

  map = new Map("map", {
    basemap: "topo",
    //   center: [-122.45, 37.75], // long, lat
    //   zoom: 13,
    extent: new Extent({
      xmin: -20486358.990939766,
      ymin: 970584.725861311,
      xmax: -6446405.635522326,
      ymax: 11742702.248031767,
      spatialReference: { wkid: 102100, latestWkid: 3857 },
    }),
    sliderStyle: "small",
  });

  // Cargamos capa MapServer
  var layerUSA = new ArcGISDynamicMapServiceLayer(
    "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/",
    {
      opacity: 0.6,
    }
  );
  layerUSA.setVisibleLayers([1, 3]);

  // Carga Estados FeatureLayer
  var popup = new PopupTemplate({
    title: "{state_name}",
    fieldInfos: [
      {
        fieldName: "pop2000",
        label: "Población:",
        visible: true,
      },
      {
        fieldName: "pop00_sqmi",
        label: "Población por sqmi:",
        visible: true,
      },
      {
        fieldName: "ss6.gdb.States.area",
        label: "Area en sqmi:",
        visible: true,
        format: { places: 0 },
      },
    ],
  });
  var layerStates = new FeatureLayer(
    "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2",
    {
      infoTemplate: popup,
      outFields: ["*"],
    }
  );

  // Carga Ciudades FeatureLayer
  var layerCities = new FeatureLayer(
    "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0"
  );

  map.addLayers([layerUSA, layerStates, layerCities]);

  // map.on("load", function (evt) {
  //   map.resize();
  //   map.reposition();
  // });

  // Widgets

  // Leyenda
  var leyenda = new Legend(
    {
      map: map,
    },
    "legendDiv"
  );
  leyenda.startup();

  // Búsqueda
  var busqueda = new Search(
    {
      map: map,
    },
    "containerSearch"
  );
  busqueda.startup();
});
