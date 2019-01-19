<template>
  <el-tabs type="border-card">
    <el-tab-pane label="影像设置">
      影像：
      <el-select v-model="imageValue" placeholder="请选择影像">
        <el-option
          v-for="item in imageOptions"
          :key="item.imageId"
          :label="item.label"
          :value="item.imageId">
        </el-option>
      </el-select><br><br>
      透明度：
      <el-slider v-model="opacityValue" :min="0" :max="1" :step="0.01" @change="setOpacity"/>
    </el-tab-pane>
    <el-tab-pane label="矢量设置">
      矢量：
      <el-select v-model="vectorValue" placeholder="请选择矢量">
        <el-option
          v-for="item in vectorOptions"
          :key="item.vectorId"
          :label="item.label"
          :value="item.vectorId">
        </el-option>
      </el-select><br><br>
      卷帘：
      <el-switch
        v-model="swithSwipeValue"
        active-text="打开"
        inactive-text="关闭"
        @change="swithSwipe">
      </el-switch>
    </el-tab-pane>
  </el-tabs>
</template>

<script>

import eventBus from './eventBus.js'

import {setSwipeWidget} from './layerOptions.js'

import { mapGetters } from 'vuex'

export default {
  props:{
    map: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // imageOptions: [],
      // vectorOptions: [],
      imageValue: '',
      vectorValue: '',
      opacityValue: 1,
      swithSwipeValue: false,
      swipeWidget: {}
    }
  },
  mounted() {
    //this.getImageData()

    this.$store.dispatch('Set_ImageTree')
    this.$store.dispatch('Set_VectorTree')
  },
  computed: mapGetters({
    imageOptions: 'imageTreeData',
    vectorOptions: 'vectorTreeData'
  }),
  methods: {
    // getImageData() {
    //   const that = this
    //   eventBus.$on('imageTreeData', function(val){
    //     that.imageOptions = val
    //   })
    //   eventBus.$on('vectorTreeData', function(val){
    //     that.vectorOptions = val
    //   })
    //   //debugger
    // },
    setOpacity(){
      // debugger;
      // this.map.removeLayer(this.picLayer);
      // this.picLayer.opacity = this.opacityValue
      // this.map.addLayer(this.picLayer);

      let id = this.imageValue + '_image'
      var layer = this.map.getLayer(id)
      if(layer == undefined){
        alert('请先加载影像！')
      }else{
        this.map.removeLayer(layer);
        layer.opacity = this.opacityValue
        this.map.addLayer(layer);
      }
     
    },
    swithSwipe(){
      if(this.swithSwipeValue) {
        //this.swipeWidget.enable();

        let self = this

        const id = self.vectorValue + '_vector'
        const layer = self.map.getLayer(id)

        if(layer == undefined){
          alert('请先加载矢量！')
          this.swithSwipeValue = false
        }else{
          setSwipeWidget(layer, self)
        }
      }
      else
      {
        this.swipeWidget.disable();
      }
    }
  }
}
</script>
