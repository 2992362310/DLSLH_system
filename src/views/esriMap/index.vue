<template>
<div>
  <!-- <ImgAccount :map="map" :mapImage="mapImage" :extent="extent" :picLayer="picLayer" :jsonFeaturelayer="jsonFeaturelayer" v-on:swipeWidgetOn="swipeWidgetOn"/> -->

  <div id="map" class="map">
    <div id="HomeButton"></div>
    <div id="swipeDiv"></div>
    <el-popover
      id="popDiv"
      placement="left-start"
      width="400"
      trigger="click">
      <el-tabs >
        <el-tab-pane label="底图">
          <div id="basemapGallery"></div>
        </el-tab-pane>
        <el-tab-pane label="图层">
          <LayerManagement :map="map"/>
        </el-tab-pane>
        <el-tab-pane label="设置">
          <LayerSetting :map="map"/>
        </el-tab-pane>
      </el-tabs>
      <el-button slot="reference">图层管理</el-button>
    </el-popover>
  </div>
  
</div>
</template>
<script>

  import { LayerManagement } from './componets'
  import { LayerSetting } from './componets'

  import {setMap} from './setMap'

  export default  {
    name: 'ImgSticth',
    components: {

      LayerManagement,
      LayerSetting
    },
    data() {
      return {
        map:{}
      }
    },
    created() {
      this.$store.dispatch('GetImageTable')
    },
    mounted() {
      var self = this;
      this.initMap(self);
    },
    methods:{
      initMap(self){
        setMap(self);
      }
    }
  }
</script>
<style>

/* @import url('https://js.arcgis.com/3.26/esri/css/esri.css'); */
/* @import url('http://localhost/arcgis_js_api_326/3.26/esri/css/esri.css'); */
@import url('http://202.114.148.160/arcgis_js_api_01/3.26/3.26/esri/css/esri.css');

#map{
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
  padding:0;
  margin:0;
}
#HomeButton {
  position: absolute;
  top: 95px;
  left: 20px;
  z-index: 50;
}
#popDiv {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 50;
}
/* #collapseDiv {
  top: 20px;
  width: 240px;
  position: absolute;
  z-index: 50;
} */
/* #basemapGallery {
  overflow: scroll;
  height: 350px
} */
</style>
