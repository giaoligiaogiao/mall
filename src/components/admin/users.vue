<template>
  <div>
    <div class="top-box">
      <el-upload
        class="upload-demo"
        action=""
        ref="upload"
        :auto-upload="false"
        :file-list="fileList"
        :show-file-list="false"
  
      >
        <el-button type="primary" icon="el-icon-edit">添加用户</el-button>
      </el-upload>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="margin-left: 20px"
      >
        <el-form-item label="楼栋">
          <el-input
            v-model="formInline.dormitory"
            placeholder="楼号"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="formInline.type" placeholder="类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="page.pageNum=1;search()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="dormitory"
      style="width: 100%"
      :default-sort="{ prop: 'dormitory', order: 'ascending' }"
      class="table"
    >
      <el-table-column prop="dormitory" label="楼栋" sortable>
      </el-table-column>

      <el-table-column prop="name" label="楼名"> </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <p v-if="scope.row.sex == 0">女寝</p>
          <p v-else>男寝</p>
        </template>
      </el-table-column>
      <el-table-column label="管理员" prop="account"> </el-table-column>
      <el-table-column prop="managerName" label="管理员名"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :page-count="page.pages"
        :hide-on-single-page="false"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="编辑楼栋"
      width="320px"
      :visible.sync="visible"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="form" :rules="rules" size="small">
        <el-form-item label="楼号" label-width="80px">
          <el-input v-model="form.dormitory" disabled></el-input>
        </el-form-item>

        <el-form-item label="楼栋类型" label-width="80px" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择类型" disabled>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼栋名" label-width="80px" prop="name">
          <el-input
            v-model="form.name"
            maxlength="15"
            show-word-limit
          ></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from "vuex";
// import {
//   ACTION_GETMANAGERLIST,
//   ACTION_GETDORMITORYLIST,
//   ACTION_EDITDORMITORY,
//   ACTION_ADDDORMITORYLIST,
// } from "@/store/action/action-types";
export default {
  data() {
    return {
      fileList: [],
      dormitory:[],
      searchLoading: false,
      list: [],
      visible: false,
      page: {
        pages: 5,
        pageSizes: [5, 7, 10],
        pageSize: 7,
        pageNum: 1,
        total: 0,
      },
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入楼栋名",
            trigger: "blur",
          },
        ],
        account: [
          {
            required: true,
            message: "请至少选择一个管理员",
            trigger: "blur",
          },
        ],
      },
      formInline: {
        dormitory: "",
        type: "",
      },
      managers: [],
      states: [],
      options: [
        {
          value: 0,
          label: "女寝",
        },
        {
          value: 1,
          label: "男寝",
        },
        {
          value: "",
          label: "全部",
        },
      ],
    };
  },
  computed: {
    // ...mapState(["dormitory"]),
  },
  created() {
    this.getData();
    // this.loadGoodsList()

  },
  mounted() {},
  methods: {
    // ...mapActions(['loadGoodsList']),
    getData() {
      let params = {
        pageSize: this.page.pageSize,
        pageNum: this.page.pageNum,
        keyword: this.formInline.dormitory,
        sex: this.formInline.type,
      };
    axios({
    method: 'get',
    url: 'http://localhost:8081/goods',
  })
    .then((res)=>{
      console.log(res)
      this.dormitory=res.data
      
      });

 
      // this.ACTION_GETDORMITORYLIST(params).then((res) => {
      //   this.page.total = res.total;
      //   console.log(res);
      // });
    },

    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getData();
    },

    search() {
      this.getData();
    },
    resetForm(formName) {
      this.visible = false;
      this.$refs[formName].resetFields();
    },
    edit(data) {
      this.visible = true;
      this.form = JSON.parse(JSON.stringify(data));
    },
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.account.label) {
            console.log(this.form.account);
            let params = {
              dormitory: this.form.dormitory,
              name: this.form.name,
              account: this.form.account.label,
              managerName: this.form.account.name,
            };
            // this.ACTION_EDITDORMITORY(params).then(() => {
            //   this.getData();
            //   this.visible = false;
            // });
          } else {
            let params = {
              dormitory: this.form.dormitory,
              name: this.form.name,
              account: this.form.account,
              managerName: this.form.managerName,
            };
            // this.ACTION_EDITDORMITORY(params).then(() => {
            //   this.getData();
            //   this.visible = false;
            // });
          }
        } else return false;
      });
    },
    // searchManager(query) {
    //   if (query !== "") {
    //     this.searchLoading = true;
    //     console.clear();
    //     console.log(query);

    //     this.ACTION_GETMANAGERLIST({ keyword: query }).then((res) => {
    //       this.states = res.data.list;
    //       this.list = this.states.map((item) => {
    //         return {
    //           value: `${item}`,
    //           label: `${item.account}`,
    //           name: `${item.name}`,
    //         };
    //       });
    //     });
    //     console.log(this.list);
    //     setTimeout(() => {
    //       this.searchLoading = false;
    //       this.managers = this.list.filter((item) => {
    //         return (
    //           item.label.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
    //           item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    //         );
    //       });
    //     }, 500);
    //     console.log(this.managers);
    //   } else {
    //     this.managers = [];
    //   }
    // },
    // addList(list) {
    //   let x = [];
    //   list.forEach((item) => {
    //     let obj = {};
    //     if (item) {
    //       obj.dormitory = item.楼号;
    //       obj.name = item.楼栋;
    //       obj.floor = item.楼层;
    //       if (item.男女寝 == "男") obj.sex = 1;
    //       else obj.sex = 0;
    //       x.push(obj);
    //     }
    //   });
    //   list = x;
    //   this.ACTION_ADDDORMITORYLIST(list).then(this.getData());
    // },
  //   handleChange(file, fileList) {
  //     console.log(file.raw.type);
  //     const isXLS =
  //       file.raw.type == "application/vnd.ms-excel" ||
  //       file.raw.type ==
  //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  //     if (!isXLS) {
  //       this.$message.error("上传文件只能是 XLS或XLSX 格式!");
  //       return;
  //     }
  //     this.fileList = [fileList[fileList.length - 1]]; // 只能上传一个Excel，重复上传会覆盖之前的
  //     let reader = new FileReader();
  //     let _this = this;
  //     reader.readAsArrayBuffer(file.raw);
  //     reader.onload = (e) => {
  //       let buffer = reader.result;
  //       let bytes = new Uint8Array(buffer);
  //       let length = bytes.byteLength;
  //       let binary = "";
  //       for (let i = 0; i < length; i++) {
  //         binary += String.fromCharCode(bytes[i]);
  //       }
  //       let XLSX = require("xlsx");
  //       let wb = XLSX.read(binary, {
  //         type: "binary",
  //       });
  //       let outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
  //       this.$confirm(`是否确定导入该${outdata.length}条数据?`, "提示", {
  //         confirmButtonText: "确定",
  //         cancelButtonText: "取消",
  //         type: "warning",
  //       })
  //         .then(() => {
  //           this.addList(outdata);
  //         })
  //         .catch(() => {
  //           this.$message({
  //             type: "info",
  //             message: "已取消操作",
  //           });
  //         });
  //     };
  //   },
  },
};
</script>
<style  scoped>
.block {
  margin: 10px 10px 0 0;
  float: right;
}
.top-box {
  display: flex;
}
</style>