<template>
  <div>
    <div class="top-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="addUser"
            >添加用户</el-button
          >
        </el-form-item>
        <el-form-item label="查询">
          <el-input
            v-model="formInline.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="
              page.pageNum = 1;
              getData();
            "
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%" class="table">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="sale" label="密码"> </el-table-column>
      <el-table-column prop="remarks" label="邮箱"> </el-table-column>
      <el-table-column prop="username" label="电话"> </el-table-column>
      <el-table-column prop="level" label="权限"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="reset(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button size="mini" @click="reset(scope.$index, scope.row)"
            >删除</el-button
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
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="mail">
          <el-input v-model="form.mail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="权限" label-width="120px" prop="level">
          <el-input v-model="form.level" placeholder="请输入权限"></el-input>
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
import axios from "axios";
export default {
  data() {
    return {
      fileList: [],
      num: 0,
      list: [],
      tableData: [],
      searchData:[],
      page: {
        pages: 5,
        total: 0,
        pageSizes: [5,7,10],
        pageSize: 7,
        pageNum: 1,
      },
      dialogVisible: false,
      title: "",
      form: {
        username: "",
        password:"",
        mail:"",
        phone:"",
        level:"",
      },
      formInline: {
        username: "",
        type: "",
      },

      rules: {
        img: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
  },
  created() {
    this.getData();
  },
  methods: {
    upload(){
      axios({
        method: "post",
        url: "http://localhost:8081/users/add",
        data:JSON.stringify({
          username:this.form.username,
          password:this.form.password,
          mail:this.form.mail,
          phone:this.form.phone,
          level:this.from.level,
        }),
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    },)},
    getData() {
      axios({
        method: "get",
        url: "http://localhost:8081/users",
        params: {
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum,
          search:this.formInline.username,
        },
      }).then((res) => {
        console.log(res)
        this.tableData=res.data.list,
        this.page.total = res.data.total;
      });
    
    },
    reset(index, row) {
       axios({
        method: "get",
        url: "http://localhost:8081/users",
        params: {
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum,
          search:this.formInline.username,
        },
      }).then((res) => {
        console.log(res)
        this.tableData=res.data.list,
        this.page.total = res.data.total;
      });
      console.log(index, row);
      let params = {
        account: row.account,
      };
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
      this.form.num = "";
      this.form.username = "";
      this.fileList = [];
      this.title = "新增商品";
      this.dialogVisible = true;
    },
    resetForm(formName) {
      if (formName == "form") this.dialogVisible = false;
      this.$refs[formName].resetFields();
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