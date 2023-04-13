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
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column prop="level" label="权限"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="reset(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button size="mini" @click="deleteUser(scope.$index, scope.row)"
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
      @closed="beforeClose"
    >
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="120px" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px" prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限" label-width="120px" prop="level">
          <el-select v-model="form.level" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
import axios from "axios";
export default {
  data() {
    return {
      fileList: [],
      num: 0,
      list: [],
      tableData: [],
      searchData: [],
      type: "",
      page: {
        pages: 5,
        total: 0,
        
        pageSize: 7,
        pageNum: 1,
      },
      dialogVisible: false,
      title: "",
      form: {
        username: "",
        password: "",
        address: "",
        phone: "",
        level: "",
      },
      formInline: {
        username: "",
        type: "",
      },
      options: [
        {
          label: "1",
          value: 1,
        },
        {
          label: "2",
          value: 2,
        },
      ],
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
        password: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
          {
            min: 6,
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        level: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  created() {
    this.getData();
  },
  methods: {
    edit(data) {
      axios({
        method: "post",
        url: "http://localhost:8081/users/modify",
        data: this.form,
      }).then((res) => {
        console.log(res);
        this.dialogVisible = false;
      });
      setTimeout(() => {
        this.getData();
      }, 10);
    },
    upload() {
      if (this.type == "edit") {
        this.edit();
      } else {
        this.$refs.form.validate((valid) => {
          if (valid) {
            axios({
              method: "post",
              url: "http://localhost:8081/users/signup",
              data: JSON.stringify({
                username: this.form.username,
                password: this.form.password,
                address: this.form.address,
                phone: this.form.phone,
                level: this.form.level,
              }),
              headers: { "Content-Type": "application/json;charset=UTF-8" },
            });
            setTimeout(() => {
              this.dialogVisible = false;
              this.getData();
            });
          } else {
            return false;
          }
        });
      }
    },
    delete() {
      axios({
        method: "get",
        url: "http://localhost:8081/users/delete",
        params: {
          id: this.form.id,
        },
      });
      setTimeout(() => {
        this.getData();
      });
    },
    getData() {
      axios({
        method: "get",
        url: "http://localhost:8081/users",
        params: {
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum,
          search: this.formInline.username,
        },
      }).then((res) => {
        console.log(res);
        (this.tableData = res.data.list), (this.page.total = res.data.total);
      });
    },
    reset(index, row) {
      this.dialogVisible = true;
      this.title = "编辑";
      this.form = row;
      this.type = "edit";

      console.log(index, row);
    },
    deleteUser(index, row) {
      this.form = row;
      this.type = "delete";
      this.delete();
      console.log(index, row);
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
      this.fileList = [];
      this.title = "新增用户";
      this.dialogVisible = true;
    },

    resetForm(formName) {
      if (formName == "form") this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    beforeClose() {
      this.$refs.form.resetFields();
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