<template>
  <el-tabs type="border-card">
    <el-tab-pane label="影像图层">
      <el-tree
        :data="imageTreeData"
        show-checkbox
        @check-change="handleImageCheckChange"
        node-key="imageId"
        ref="imageTree">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
    </el-tab-pane>
    <el-tab-pane label="矢量图层">
      <el-tree
        :data="vectorTreeData"
        show-checkbox
        @check-change="handleVectorCheckChange"
        node-key="vectorId"
        ref="vectirTree">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from 'axios'

import eventBus from './eventBus.js'
//import { getImageTable } from '@/api/image'

//import {addImageToMap} from './imgConfig'
import { addImageToMap } from './addLayerToMap.js'
import { addVectorToMap } from './addLayerToMap.js'

import { mapGetters } from 'vuex'

export default {
  props:{
    map: {
      type: Object,
      required: true
    }
  },
  // data() {
  //   return {
  //     imageTreeData:[],
  //     vectorTreeData:[]
  //   }
  // },
  // mounted() {
  //   this.getImageData()
  // },
  mounted() {
    //this.fetchData()
    //debugger
    this.$store.dispatch('Set_ImageTree')
    this.$store.dispatch('Set_VectorTree')
  },
  computed: mapGetters({
    imageTreeData: 'imageTreeData',
    vectorTreeData: 'vectorTreeData'
  }),
  methods: {
    // getImageData() {
    //   //axios.get('http://localhost:50222/api/ImageTables').then((res) => {
    //   axios.get('http://202.114.148.160/qctest/website/api/ImageTables').then((res) => {
        
    //     const imageTable = res.data

    //     for(var i in imageTable){

    //       if(imageTable[i].Status == "已校准" || imageTable[i].Status == "已矢量化"){
    //         let imageTreeNode={
    //           imageId: res.data[i].Id,
    //           label: res.data[i].UploadArea
    //         }
    //         this.imageTreeData.push(imageTreeNode)
    //       }

    //       if(imageTable[i].Status == "已矢量化"){
    //         let vectorTreeNode={
    //           vectorId: res.data[i].Id,
    //           label: res.data[i].UploadArea
    //         }
    //         this.vectorTreeData.push(vectorTreeNode)
    //       }
    //     }

    //     eventBus.$emit('imageTreeData', this.imageTreeData)
    //     eventBus.$emit('vectorTreeData', this.vectorTreeData)
    //   })
    // },
    handleImageCheckChange(data, checked, indeterminate) {
      //console.log(data, checked, indeterminate);
      //debugger

      let imageInfo = data

      if(checked){

        let self = this

        addImageToMap(imageInfo, self)
        
      }
      else{
        let id = imageInfo.imageId.toString() + '_image'
        var layer = this.map.getLayer(id)
        this.map.removeLayer(layer)
        //this.map.removeLayer(this.picLayer)
        //this.picLayer.visible = checked
        //console.log(this.picLayer.visible)
      }
    },
     handleVectorCheckChange(data, checked, indeterminate) {
      //console.log(data, checked, indeterminate);
      //debugger

      let vectorInfo = data

      if(checked){

        let self = this

        addVectorToMap(vectorInfo, self)
      }
      else{
        let id = vectorInfo.vectorId.toString() + '_vector'
        var layer = this.map.getLayer(id)
        this.map.removeLayer(layer)
      }
    }
  }
}
</script>
