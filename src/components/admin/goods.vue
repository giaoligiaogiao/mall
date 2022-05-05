<template>
  <div>
    <div class="top-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="addUser"
            >导入学生</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-popover placement="bottom" width="180" v-model="visible">
            <el-form :model="managerForm" ref="managerForm">
              <el-form-item label="楼栋" label-width="50px">
                <el-select v-model="managerForm.dormitory" placeholder="请选择">
                  <el-option
                    v-for="item in dormitory.filter((x) => !x.account)"
                    :key="item.id"
                    :label="item.name"
                    :value="item.dormitory"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名" label-width="50px">
                <el-input v-model="managerForm.name"></el-input>
              </el-form-item>
              <el-form-item label="账户" label-width="50px">
                <el-input v-model="managerForm.account"></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="closePover()"
                >取消</el-button
              >
              <el-button
                type="primary"
                :disabled="
                  managerForm.account == '' ||
                  managerForm.name == '' ||
                  managerForm.dormitory == ''
                "
                size="mini"
                @click="addManager()"
                >确定</el-button
              >
            </div>
            <el-button type="primary" icon="el-icon-edit" slot="reference"
              >新增宿管</el-button
            >
          </el-popover>
        </el-form-item>
        <el-form-item label="账户">
          <el-input
            v-model="formInline.name"
            placeholder="账户/姓名"
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
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'userId', order: 'ascending' }"
      class="table"
    >
      <el-table-column prop="userId" label="id" sortable> </el-table-column>
      <el-table-column prop="userName" label="姓名"> </el-table-column>

      <el-table-column prop="account" label="账户"> </el-table-column>

      <el-table-column label="类型" prop="userType"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="resetPassword(scope.$index, scope.row)"
            >重置密码</el-button
          >
          <el-button
            v-if="scope.row.account != 'admin'&&scope.row.del==0"
            size="mini"
            type="danger"
            @click="deleteUser(scope.$index, scope.row)"
            >禁用</el-button
          >
          <el-button
            v-if="scope.row.account != 'admin'&&scope.row.del==1"
            size="mini"
            type="primary"
            @click="deleteUser(scope.$index, scope.row)"
            >启用</el-button
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
      :title="title"
      width="500px"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item
          label="文件导入"
          label-width="120px"
          prop="file"
          v-model="form.file"
        >
          <el-upload
            class="upload-demo"
            action=""
            ref="upload"
            :auto-upload="false"
            :file-list="fileList"
            :show-file-list="false"
            :on-change="handleChange"
          >
            <el-button size="small" type="primary">点击导入</el-button>
            <div slot="tip" class="el-upload__tip" v-if="num > 0">
              共计学生{{ num }}名
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="男生寝室楼" label-width="120px" prop="boy">
          <el-select v-model="form.boy" placeholder="请选择楼栋">
            <el-option
              v-for="item in dormitory.filter((x) => x.sex == 1)"
              :key="item.id"
              :label="item.name"
              :value="item.dormitory"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="女生寝室楼" label-width="120px" prop="girl">
          <el-select v-model="form.girl" placeholder="请选择楼栋">
            <el-option
              v-for="item in dormitory.filter((x) => x.sex == 0)"
              :key="item.id"
              :label="item.name"
              :value="item.dormitory"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upload()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { mapActions, mapState } from "vuex";
// import {
//   ACTION_GETUSERLIST,
//   ACTION_GETDORMITORYLIST,
//   ACTION_ADDSTUDENT,
//   ACTION_ADDMANAGER,
//   ACTION_DELETEUSER,
//   ACTION_RESETPASSWORD,
// } from "@/store/action/action-types";
export default {
  data() {
    return {
      fileList: [],
      visible: false,
      managerForm: {
        name: "",
        account: "",
        dormitory: "",
      },
      num: 0,
      list: [],
      tableData: [],
      page: {
        pages: 5,
        total: 0,
        pageSizes: [5, 7, 10],
        pageSize: 7,
        pageNum: 1,
      },
      dialogVisible: false,
      title: "",
      form: {
        boy: "",
        girl: "",
        file: "",
      },
      formInline: {
        name: "",
        type: "",
      },
      options: [
        {
          value: 0,
          label: "学生",
        },
        {
          value: 1,
          label: "宿舍管理员",
        },
        {
          value: 2,
          label: "系统管理员",
        },
        {
          value: "",
          label: "全部",
        },
      ],
      rules: {
        file: [
          {
            required: true,
            message: "请选择导入文件",
            trigger: "blur",
          },
        ],
        girl: [
          {
            required: true,
            message: "请至少选择一个楼栋",
            trigger: "blur",
          },
        ],
        boy: [
          {
            required: true,
            message: "请至少选择一个楼栋",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    // ...mapState(["dormitory"]),
  },
  created() {
    this.getData();
    this.getList();
  },
  methods: {
    // ...mapActions([
    //   ACTION_GETUSERLIST,
    //   ACTION_GETDORMITORYLIST,
    //   ACTION_ADDSTUDENT,
    //   ACTION_ADDMANAGER,
    //   ACTION_DELETEUSER,
    //   ACTION_RESETPASSWORD,
    // ]),
    getData() {
      let params = {
        pageSize: this.page.pageSize,
        pageNum: this.page.pageNum,
        keyword: this.formInline.name,
        type: this.formInline.type,
      };

      this.ACTION_GETUSERLIST(params).then((res) => {
        if (this.tableData) this.tableData = [];
        res.list.forEach((item) => {
          if (item.userType == 0) {
            item.userType = "学生";
          } else if (item.userType == 1) {
            item.userType = "宿舍管理员";
          } else {
            item.userType = "系统管理员";
          }
          this.tableData.push(item);
        });
        this.page.total = res.total;
      });
    },
    getList() {
      this.ACTION_GETDORMITORYLIST();
    },
    deleteUser(index, row) {
      console.log(index, row);
      let params = {
        account: row.account,
        del:!row.del
      };
      this.ACTION_DELETEUSER(params).then(()=>{
        this.$nextTick(()=>{
          this.getData()
        })
        });
      // .then(this.getData());
    },
    resetPassword(index, row) {
      console.log(index, row);
      let params = {
        account: row.account,
      };
      this.ACTION_RESETPASSWORD(params);
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getData();
    },
    addUser() {
      this.form.boy = "";
      this.form.girl = "";
      this.fileList = [];
      this.title = "账号导入";
      this.dialogVisible = true;
      this.num = 0;
    },
    addManager() {
      let params = {
        account: this.managerForm.account,
        name: this.managerForm.name,
        dormitory: this.managerForm.dormitory,
      };
      this.ACTION_ADDMANAGER(params).then(() => {
        this.closePover();
        this.search();
      });
    },
    search() {
      this.getData();
      this.getList();
    },
    resetForm(formName) {
      if (formName == "form") this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    // handleChange(file, fileList) {
    //   console.log(file.raw.type);
    //   const isXLS =
    //     file.raw.type == "application/vnd.ms-excel" ||
    //     file.raw.type ==
    //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    //   if (!isXLS) {
    //     this.$message.error("上传文件只能是 XLS或XLSX 格式!");
    //     return;
    //   }

    //   this.fileList = [fileList[fileList.length - 1]]; // 只能上传一个Excel，重复上传会覆盖之前的
    //   this.form.file = file.raw;
    //   let reader = new FileReader();
    //   let _this = this;
    //   reader.readAsArrayBuffer(this.form.file);
    //   reader.onload = (e) => {
    //     let buffer = reader.result;
    //     let bytes = new Uint8Array(buffer);
    //     let length = bytes.byteLength;
    //     let binary = "";
    //     for (let i = 0; i < length; i++) {
    //       binary += String.fromCharCode(bytes[i]);
    //     }
    //     let XLSX = require("xlsx");
    //     let wb = XLSX.read(binary, {
    //       type: "binary",
    //     });
    //     let outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    //     _this.num = outdata.length;
    //     _this.list = outdata;
    //   };
    // },
    upload() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let x = [];
          this.list.forEach((item) => {
            let obj = {};
            if (item) {
              obj.name = item.姓名;
              obj.number = item.学号;
              if (item.性别 == "女") obj.sex = 0;
              else if (item.性别 == "男") obj.sex = 1;
              x.push(obj);
            }
          });
          this.list = x;
          let students = {
            students: this.list,
            boy: this.form.boy,
            girl: this.form.girl,
          };
          this.ACTION_ADDSTUDENT(students).then((this.dialogVisible = false));
        } else {
          return false;
        }
      });
    },
    closePover() {
      this.managerForm.name = "";
      this.managerForm.dormitory = "";
      this.managerForm.account = "";
      this.visible = false;
    },
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