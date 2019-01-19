import axios from "axios"
import esriLoader from 'esri-loader'

//根据影像名称从服务器加载影像
export function addImageToMap(imageInfo,self){
  const options = {
    //url:'https://js.arcgis.com/3.26/'
    //url:'http://localhost/arcgis_js_api_326/3.26/init.js'
    url:'http://202.114.148.160/arcgis_js_api_01/3.26/3.26/init.js'
  };

  esriLoader.loadModules(
    [
      "esri/layers/MapImage",
      "esri/layers/MapImageLayer",
      "esri/geometry/Extent",
    ],options).then(
      ([MapImage,MapImageLayer,Extent])=>{

        //http://202.114.148.160/HJProject/ShangDong/imagesConfig/聊城市.json
        let jsonUrl = 'http://202.114.148.160/HJProject/ShangDong/imagesConfig/' + imageInfo.label +'.json'

        //http://localhost/HJProject/ShangDong/imagesConfig/聊城市.json
        //let jsonUrl = 'http://localhost/HJProject/ShangDong/imagesConfig/' + imageInfo.label +'.json'

        //console.log(jsonUrl)

        axios.get(jsonUrl,{headers: {}, emulateJSON: true }).then((res) => {
          
          var extent = new Extent({'spatialReference': { 'wkid': 4326 }});

          var imgConfig = res.data
          extent.xmin = imgConfig.xmin;
          extent.ymin = imgConfig.ymin;
          extent.xmax = imgConfig.xmax;
          extent.ymax = imgConfig.ymax;

          //http://202.114.148.160/HJProject/ShangDong/images/聊城市.jpg
          let imageUrl = 'http://202.114.148.160/HJProject/ShangDong/correct/' + imageInfo.label + '.jpg'
          
          //http://localhost/HJProject/ShangDong/correct/聊城市.jpg
          //let imageUrl = 'http://localhost/HJProject/ShangDong/correct/' + imageInfo.label +'.jpg'
          //console.log(imageUrl)

          var mapImage = new MapImage();
          mapImage.extent = extent;
          mapImage.href = imageUrl;

          var mapImageLayer = new MapImageLayer();
          mapImageLayer.id = imageInfo.imageId.toString() + '_image';
          mapImageLayer.addImage(mapImage);

          self.map.addLayer(mapImageLayer);
          self.map.setExtent(extent);
        })
      }
    ).catch(err => {
      console.error(err)
    }
  );
}

//根据矢量名称从服务器加载矢量
export function addVectorToMap(vectorInfo,self){
  const options = {
    //url:'https://js.arcgis.com/3.26/'
    //url:'http://localhost/arcgis_js_api_326/3.26/init.js'
    url:'http://202.114.148.160/arcgis_js_api_01/3.26/3.26/init.js'
  };

  esriLoader.loadModules(
    [
        "esri/tasks/FeatureSet",
        "esri/layers/FeatureLayer",
        "esri/dijit/PopupTemplate",
        "esri/dijit/LayerSwipe"
    ],options).then(
      ([FeatureSet,FeatureLayer,PopupTemplate,LayerSwipe])=>{
       
        //http://202.114.148.160/HJProject/ShangDong/vector/聊城市.json
        let jsonUrl = 'http://202.114.148.160/HJProject/ShangDong/vector/' + vectorInfo.label +'.json'

        //http://localhost/HJProject/ShangDong/vector/聊城市.json
        //let jsonUrl = 'http://localhost/HJProject/ShangDong/vector/' + vectorInfo.label +'.json'

        axios.get(jsonUrl,{headers: {}, emulateJSON: true }).then((res) => {
          
          let layerJson = res.data

          let layerDefinition = {
            "geometryType": layerJson.geometryType,
            "fields": layerJson.fields
          };
  
          var featureSet = new FeatureSet(layerJson);  
          var featureCollection = {  
              "layerDefinition": layerDefinition,  
              "featureSet": featureSet
          };  
          var jsonFeaturelayer= new FeatureLayer(featureCollection);
          jsonFeaturelayer.id = vectorInfo.vectorId.toString() + '_vector'
  
          self.map.addLayer(jsonFeaturelayer);
  
          //define a popup template
          var popupTemplate = new PopupTemplate({
            title: "{县区}",
            description: "{代码}"
          });
          jsonFeaturelayer.infoTemplate = popupTemplate;
  
          // //self.swipeWidget.destroy();
  
          // var stackedLayerSwipe = dijit.byId("swipeDiv");
          // if (stackedLayerSwipe) {
          //   stackedLayerSwipe.destroyRecursive(true);
          // }
  
          // self.swipeWidget = new LayerSwipe({
          //   type: "horizontal",  //Try switching to "scope" or "horizontal" or "vertical"
          //   map: self.map,
          //   layers: [jsonFeaturelayer]
          // }, "swipeDiv");
          // self.swipeWidget.startup();
          // //self.swipeWidget.disable();
  
          // //self.$emit('swipeWidgetOn', self.swipeWidget)
        })
      }
    ).catch(err => {
      console.error(err)
    }
  );
}