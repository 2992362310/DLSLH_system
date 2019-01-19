
import esriLoader from 'esri-loader'

//卷帘控制
export function setSwipeWidget(layer, self){
  const options = {
    //url:'https://js.arcgis.com/3.26/'
    url:'http://localhost/arcgis_js_api_326/3.26/init.js'
    //url:'http://202.114.148.160/arcgis_js_api_01/3.26/3.26/init.js'
  };

  esriLoader.loadModules(
    [
        "esri/dijit/LayerSwipe"
    ],options).then(
      ([LayerSwipe])=>{

        //self.swipeWidget.destroy();

        var stackedLayerSwipe = dijit.byId("swipeDiv");
        if (stackedLayerSwipe) {
          stackedLayerSwipe.destroyRecursive(true);
        }

        // let id = self.vectorValue + '_vector'
        // var layer = self.map.getLayer(id)

        self.swipeWidget = new LayerSwipe({
          type: "horizontal",  //Try switching to "scope" or "horizontal" or "vertical"
          map: self.map,
          layers: [layer]
        }, "swipeDiv");
        self.swipeWidget.startup();
        //self.swipeWidget.disable();

        //self.$emit('swipeWidgetOn', self.swipeWidget)

      }
    )
}