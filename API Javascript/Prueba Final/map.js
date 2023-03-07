require([
  "esri/map",
  "esri/layers/FeatureLayer",
  "esri/tasks/ServiceAreaTask",
  "esri/tasks/ServiceAreaParameters",
  "esri/tasks/FeatureSet",
  "esri/tasks/query",

  "dojo/domReady!",
], function (
  Map,
  FeatureLayer,
  ServiceAreaTask,
  ServiceAreaParameters,
  FeatureSet,
  Query
) {
  var mapa = new Map("mapa", {
    basemap: "topo",
    center: [-3.70256, 40.4165],
    zoom: 8,
  });

  var hospitales = new FeatureLayer(
    "https://services8.arcgis.com/BtkRLT3YBKaVGV3g/ArcGIS/rest/services/Centros_de_salud_PruebaAPI/FeatureServer/0"
  );

  mapa.addLayer(hospitales);

  var servicioArea = new ServiceAreaTask(
    "https://formacion.esri.es/server/rest/services/RedMadrid/NAServer/Service%20Area"
  );

  mapa.on("click", () => {
    var consulta = new Query();
    consulta.where = "1=1";
    var instalaciones = [];
    hospitales.queryFeatures(consulta, function (resultado) {
      instalaciones.push(resultado);
    });

    var params = new ServiceAreaParameters();
    var facilities = new FeatureSet();
    facilities.features = instalaciones;

    params.facilities = facilities;
    params.defaultBreaks = [1];
    params.outSpatialReference = mapa.spatialReference;
    params.returnFacilities = false;
    console.log('param',params);
    servicioArea.solve(params);
  });
});
