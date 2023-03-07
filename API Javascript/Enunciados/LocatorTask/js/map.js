require([
  "dojo/parser",
  "esri/map",
  "dojo/dom",
  "dojo/on",
  "esri/tasks/locator",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/Color",
  "esri/graphic",
  "esri/symbols/Font",
  "esri/symbols/TextSymbol",

  "dojo/domReady!",
], function (
  parser,
  Map,
  dom,
  on,
  Locator,
  SimpleMarkerSymbol,
  Color,
  Graphic,
  Font,
  TextSymbol
) {
  // Parse DOM nodes decorated with the data-dojo-type attribute
  parser.parse();
  //  1. creamos el mapa sobre el que se va a dibujar todo.
  var mapa = new Map("cpCenter", {
    basemap: "streets-navigation-vector",
    center: [-117.19, 34.05],
    zoom: 8,
  });

  //  2. preparamos el boton para que reaccione cuando hacemos click
  var btn = dom.byId("btnLocate"); /*o document.getElementById */
  on(
    btn,
    "click",
    buscaDireccion
  ); /* o btn.addEventListener('click', buscaDireccion)*/

  var locator = new Locator(
    "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
  ); /*4.1 se pone antes de la funcion para poder usarlo luego en la funcion, se puede poner dentro de la funcion pero es mejor fuera para que se ejecute una vez y no cada vez que le damos a click, por cuestion de rendimiento de la aplicacion*/
  
  function buscaDireccion() {
    // 3. ahora se guarda lo que introduzca el usuario
    var inputUsuario = dom.byId("taAddress").value
    // 4. ahora se prepara el locator para acceder al servidor
    // 4.2 se configuran las variables del locator
    var params = {
      address: { SingleLine: inputUsuario },
      outFields: ["Loc_name"],
    };
    // 5 ejecutar la llamada al servicio de geocodificacion
    locator.addressToLocations(params);
  }
  // 6 cuando se ha completado la peticion al servicio(se pone fuera de la funcion del click para que se ejecute cuando el servidor responda, no tiene pq tener relacion con el boton) se ejecuta mostrarResultados, que te devuelve los resultados de la peticion al servidor
  locator.on("address-to-locations-complete", mostrarResultados);
  function mostrarResultados(results) {
    console.log("hecho", results);
    // coordenadas del punto devuelto(nos quedamos con el primero)
    var punto =
      results.addresses[0]
        .location; /*aqui obtengo la direccion que me ha devuelto el servidor*/
    // definir simbologia del punto que utilicemos al localizar el candidato
    var marker = new SimpleMarkerSymbol();

    marker.setColor(new Color([230, 0, 169, 1]));
    // montar el grafico: simbologia y localizacion
    var grafico = new Graphic(punto, marker);
    // añadirlo al mapa a traves de la capa graficos que trae el mapa usado por defecto
    mapa.graphics.add(grafico);
    // añadimos la direccion introducida al punto que se crea
    var texto = new TextSymbol(results.addresses[0].address);/*para coger la direccion y te la pinte junto al marcador*/
    texto.setOffset(0, 10);
    texto.setColor(new Color([255, 0, 0, 1]));
    var grafico2 = new Graphic(punto, texto);
    mapa.graphics.add(grafico2);
    // para centrar el mapa sobre ese punto
    mapa.centerAndZoom(punto,15)
  }
});
