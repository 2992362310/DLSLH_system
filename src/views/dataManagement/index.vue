<template>
  <div class="app-container">

    <UploadImage/>

    <el-table
      :data="tableList"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="序号" width="120">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="影像名称" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.UploadArea }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传人员" width="160" align="center">
        <template slot-scope="scope">
          {{ scope.row.UploadPerson }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="160" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Status | statusFilter">{{ scope.row.Status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="上传时间" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.Time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
        <el-button :disabled="scope.row.Status | statusCorrect" type="text" size="small" @click="handleCorrect(scope.$index, scope.row)">影像矫正</el-button>
        <el-button :disabled="scope.row.Status | statusVector" type="text" size="small" @click="handleVector(scope.$index, scope.row)">矢量化处理</el-button>
        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Backup }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import axios from "axios"
import { UploadImage } from './components'

import { mapGetters, mapActions } from 'vuex'


export default {
  //name: '',
  components: {
    UploadImage
  },
  data() {
    return {
      
    }
  },
  //inject: ['reload'],
  filters: {
    statusFilter(status) {
      const statusMap = {
        已上传: 'warning',
        已校准: 'success',
        已矢量化: 'gray'
      }
      return statusMap[status]
    },
    statusCorrect(status) {
      const statusMap = {
        已上传: false,
        已校准: true,
        已矢量化: true
      }
      return statusMap[status]
    },
    statusVector(status) {
      const statusMap = {
        已上传: false,
        已校准: false,
        已矢量化: true
      }
      return statusMap[status]
    }
  },
  // created() {
  //   //this.fetchData()
  //   //debugger
  //   this.$store.dispatch('SetTable')
  // },
  mounted() {
    this.$store.dispatch('Set_Table')
  },
  computed: mapGetters({
    tableList: 'tableData'
  }),
  methods: mapActions({
    handleCorrect(row,index) {

      this.$store.dispatch('DoCorrect',index)

      //console.log(dispatch, index)

      
      // var params = {
      //   Id: row.Id,
      //   Status: '已校准',
      //   UploadArea: row.UploadArea,
      //   UploadPerson: row.UploadPerson,
      //   Time: row.Time,
      //   ImageUrl: row.ImageUrl,
      //   CalibrationUrl: row.CalibrationUrl,
      //   VectorUrl: row.VectorUrl,
      //   Backup: '已上传，已校准，未矢量化'
      // }
      //this.$store.dispatch('DoCorrect',params)
    },
    handleVector(row,index) {
      this.$store.dispatch('DoVector',index)
    },
    handleDelete(row,index) {
      this.$store.dispatch('DoDelete',index)
    }
  }),
  // methods: {
  //   // fetchData() {
  //   //   this.listLoading = true
  //   //   getImageTable(this)
  //   // },
  //   handleCalibrate (index, row){
  //     //axios.put('http://localhost:50222/api/ImageTables/' + row.Id,{
  //     axios.put('http://202.114.148.160/qctest/website/api/ImageTables/' + row.Id,{
  //       Id: row.Id,
  //       Status: '已校准',
  //       UploadArea: row.UploadArea,
  //       UploadPerson: row.UploadPerson,
  //       Time: row.Time,
  //       ImageUrl: row.ImageUrl,
  //       CalibrationUrl: row.CalibrationUrl,
  //       VectorUrl: row.VectorUrl,
  //       Backup: '已上传，已校准，未矢量化'
  //     }).then(() => {
  //        getImageTable(this)
  //        //this.reload()
  //        location.reload()
  //        //console.log(row.Id)
  //     })
  //   },
  //   handleVector(index, row){
  //     //axios.put('http://localhost:50222/api/ImageTables/' + row.Id,{
  //     axios.put('http://202.114.148.160/qctest/website/api/ImageTables/' + row.Id,{
  //       Id: row.Id,
  //       Status: '已矢量化',
  //       UploadArea: row.UploadArea,
  //       UploadPerson: row.UploadPerson,
  //       Time: row.Time,
  //       ImageUrl: row.ImageUrl,
  //       CalibrationUrl: row.CalibrationUrl,
  //       VectorUrl: row.VectorUrl,
  //       Backup: '已上传，已校准，已矢量化'
  //     }).then(() => {
  //        getImageTable(this)
  //        //this.reload()
  //        location.reload()
  //        //console.log(row.Id)
  //     })
  //   },
  //   handleDelete(index, row) {

  //     //axios.delete('http://localhost:50222/api/ImageTables/' + row.Id).then(() => {
  //     axios.delete('http://202.114.148.160/qctest/website/api/ImageTables/' + row.Id).then(() => {
  //        getImageTable(this)
  //        //this.reload()
  //        location.reload()
  //        //console.log(row.Id)
  //     })

  //   }
  // }
}
</script>

