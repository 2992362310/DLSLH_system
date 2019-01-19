<template>
    <div class="app-container">
      <el-button type="primary" @click="uploadDialogVisible = true">上传</el-button>

      <el-dialog
        title="上传影像"
        :visible.sync="uploadDialogVisible"
        :modal = "false"
        width="28%"
        center>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="影像名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="上传人员">
              <el-input v-model="form.region" :disabled="true"></el-input>
            </el-form-item>
            <!-- <el-form-item label="上传人员">
              <el-select v-model="form.region" placeholder="请选择上传人员">
                <el-option label="张三" value="admin"></el-option>
                <el-option label="李四" value="user"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item>
              <el-upload
                ref="upload"
                class="upload-img"
                drag
                action="000"
                :auto-upload="false"
                :limit="1"
                list-type="picture">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" style="margin-left: 20%">立即上传</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
      </el-dialog>
    </div>
</template>

<script>

//action="http://localhost/test/website/api/Help/SaveImage"

import axios from "axios"
//import { getImageTable } from '@/api/image'

import { getToken } from '@/utils/auth'

export default {
    name: '',
    //inject: ['reload'],
    data() {
      return {
        uploadDialogVisible: false,
        form: {
          name: '',
          region: getToken(),
          //backup: getToken()
        }
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      onSubmit() {

        let params = {
          Status: '已上传',
          UploadArea: this.form.name,
          UploadPerson: this.form.region,
          Backup: '已上传，未校准，未矢量化',
          ImageUrl: 'Image'
        } 

        this.$store.dispatch('DoUpload', params)

        // //axios.post('http://localhost:50222/api/ImageTables',{
        // axios.post('http://202.114.148.160/qctest/website/api/ImageTables',{
        //   Status: '已上传',
        //   UploadArea: this.form.name,
        //   UploadPerson: this.form.region,
        //   Backup: '已上传，未校准，未矢量化',
        //   ImageUrl: 'Image'
        // }).then((res) => {
        //   console.log(res);
          
        //   //getImageTable(this)
          
        //   //this.reload()
        //   location.reload()
          
        // })

        //上传图片
        //this.$refs.upload.submit();

        this.uploadDialogVisible = false;
      },
      onCancel(){
        this.uploadDialogVisible = false
      }
    }
}
</script>

<style>
.upload-img{
  margin: 0 auto; 
  text-align: center
}
</style>


