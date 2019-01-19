import { getTableList, doCorrect, doVector, doDelete, doUpload } from '@/api/table'

const serData = {
  state: {
    tableList: [],
    imageTreeList: [],
    vectorTreeList: []
  },
  getters: {
    tableData: (state) => {
      return state.tableList
    },
    imageTreeData: (state) => {
      let imageTable = state.tableList
      let imageTreeArr =[]
      for(var i in imageTable){
        if(imageTable[i].Status == "已校准" || imageTable[i].Status == "已矢量化"){
          let imageTreeNode={
            imageId: imageTable[i].Id,
            label: imageTable[i].UploadArea
          }
          imageTreeArr.push(imageTreeNode)
        }
      }
      state.imageTreeList = imageTreeArr

      return state.imageTreeList
    },
    vectorTreeData: (state) => {
      let imageTable = state.tableList
      let vectorTreeArr =[]
      for(var i in imageTable){
        if(imageTable[i].Status == "已矢量化"){
          let vectorTreeNode={
            vectorId: imageTable[i].Id,
            label: imageTable[i].UploadArea
          }
          vectorTreeArr.push(vectorTreeNode)
        }
      }
      state.vectorTreeList = vectorTreeArr

      return state.vectorTreeList
    }
  },
  mutations: {
    SET_TABLELIST: (state, tableList) => {
      state.tableList = tableList
    },
    SET_IMAGETREELIST: (state, imageTreeList) => {
      state.imageTreeList = imageTreeList
    },
    SET_VECTORTREELIST: (state, vectorTreeList) => {
      state.vectorTreeList = vectorTreeList
    },
    DO_CORRECT: (state, {index, response}) =>{
      //debugger

      state.tableList[index].Backup = response.Backup
      state.tableList[index].CalibrationUrl = response.CalibrationUrl
      state.tableList[index].Status = response.Status
    },
    DO_VECTOR: (state, {index, response}) =>{
      //debugger

      state.tableList[index].Backup = response.Backup
      state.tableList[index].VectorUrl = response.VectorUrl
      state.tableList[index].Status = response.Status

    },
    DO_DELETE: (state, index) =>{
      //debugger
      state.tableList.splice(index,1)
    },
    DO_UPLOAD: (state, data) =>{
      state.tableList.push(data)
    }
  },
  actions: {
    //数据管理(填充表格)
    GetImageTable({commit}) {
      return new Promise((resolve, reject) => {
        getTableList().then(response => {
          //const data = response.data
          commit('SET_TABLELIST', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Set_ImageTree({commit}) {
      return commit('SET_TABLELIST')
    },
    Set_VectorTree({commit}) {
      return commit('SET_VECTORTREELIST')
    },
    Set_Table({commit}) {
      return commit('SET_IMAGETREELIST')
    },
    DoCorrect({commit,state}, index) {

      let rowData = state.tableList[index]

      let params = {
        Id: rowData.Id,
        Status: '已校准',
        UploadArea: rowData.UploadArea,
        UploadPerson: rowData.UploadPerson,
        Time: rowData.Time,
        ImageUrl: rowData.ImageUrl,
        CalibrationUrl: rowData.CalibrationUrl,
        VectorUrl: rowData.VectorUrl,
        Backup: '已上传，已校准，未矢量化'
      }

      return new Promise((resolve, reject) => {
        doCorrect(params).then(response => {
          //const data = response.data
          commit('DO_CORRECT', {index, response})
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    DoVector({commit,state}, index) {
      let rowData = state.tableList[index]

      let params = {
        Id: rowData.Id,
        Status: '已矢量化',
        UploadArea: rowData.UploadArea,
        UploadPerson: rowData.UploadPerson,
        Time: rowData.Time,
        ImageUrl: rowData.ImageUrl,
        CalibrationUrl: rowData.CalibrationUrl,
        VectorUrl: rowData.VectorUrl,
        Backup: '已上传，已校准，已矢量化'
      }

      return new Promise((resolve, reject) => {
        doVector(params).then(response => {
          //const data = response.data
          commit('DO_VECTOR', {index, response})
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    DoDelete({commit,state}, index) {
      let rowData = state.tableList[index]
      let params = {
        Id: rowData.Id
      }
      return new Promise((resolve, reject) => {
        doDelete(params).then(response => {
          //const data = response.data
          commit('DO_DELETE', index)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    DoUpload({commit}, params) {

      return new Promise((resolve, reject) => {
        doUpload(params).then(response => {
          //const data = response.data
          commit('DO_UPLOAD', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default serData