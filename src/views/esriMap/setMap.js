import esriLoader from 'esri-loader'

export const setMap = function (self) {

  const options = {
    //url:'https://js.arcgis.com/3.26/'
    //url:'http://localhost/arcgis_js_api_326/3.26/init.js'
    url:'http://202.114.148.160/arcgis_js_api_01/3.26/3.26/init.js'
  };

  esriLoader.loadModules(
    [
      "esri/map",
      "esri/layers/FeatureLayer",
      "esri/layers/MapImage",
      "esri/layers/MapImageLayer",
      "esri/geometry/Extent",
      "esri/dijit/HomeButton",
      "esri/dijit/LayerSwipe",
      "esri/dijit/BasemapGallery"
    ],options).then(
      ([Map,FeatureLayer,MapImage,MapImageLayer,Extent,HomeButton,LayerSwipe,BasemapGallery])=>{
          
        //parser.parse();

        self.map = new Map("map", {
          //basemap: "streets",
          //basemap: "satellite",
          basemap: "osm",
          center: [115.9918900000, 36.4626820000],
          zoom: 10
        });

        //self.featureLayer = new FeatureLayer("http://202.114.148.160:8000/arcgis/rest/services/%E8%81%8A%E5%9F%8E%E5%B8%82/LCS02MapService/MapServer/0");

        //self.map.addLayer(self.featureLayer);


        // self.swipeWidget = new LayerSwipe({
        //   type: "horizontal",  //Try switching to "scope" or "horizontal" or "vertical"
        //   map: self.map,
        //   layers: [self.jsonFeaturelayer]
        // }, "swipeDiv");
        // self.swipeWidget.startup();
        
        //4326
        self.extent = new Extent({'spatialReference': { 'wkid': 4326 }});

        self.mapImage = new MapImage();

        self.picLayer = new MapImageLayer();
        self.picLayer.opacity = 0.5;

        var stackedBasemapGallery = dijit.byId("basemapGallery");
        if (stackedBasemapGallery) {
          stackedBasemapGallery.destroyRecursive(true);
        }
        //self.basemapGallery.destroy();
        var basemapGallery = new BasemapGallery({
          showArcGISBasemaps: true,
          map: self.map
        }, "basemapGallery");
        basemapGallery.startup();

        // basemapGallery.on("error", function(msg) {
        //   console.log("basemap gallery error:  ", msg);
        // });

        var stackedHomeButton = dijit.byId("HomeButton");
        if (stackedHomeButton) {
          stackedHomeButton.destroyRecursive(true);
        }
        //self.homeButton.destroy();
        var homeButton = new HomeButton({
          map: self.map
        }, "HomeButton");
        homeButton.startup();

      }).catch(err => {
        console.error(err);
    });
}