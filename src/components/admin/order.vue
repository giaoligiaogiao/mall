<template>
  <div>
    <div class="top-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="搜索">
          <el-input
            v-model="formInline.name"
            placeholder="搜索条件"
          ></el-input>
        </el-form-item>
          <el-button type="primary" @click="page.pageNum=1;getData()">查询</el-button>
       
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="table"
    >
      <el-table-column prop="img" label="图片" > 
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="" style="width:80%">
        </template>
      </el-table-column>
      <el-table-column prop="sale" label="销量"> </el-table-column>
      <el-table-column prop="remarks" label="评论"> </el-table-column>
      <el-table-column prop="title" label="商品"> </el-table-column>

      <el-table-column label="价格" prop="price"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="resetPassword(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button size="mini" @click="resetPassword(scope.$index, scope.row)"
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
    >
      <el-form :model="form" ref="form" :rules="rules">

        <el-form-item label="商品数量" label-width="120px" prop="num">
          <el-input v-model="form.num" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍" label-width="120px" prop="title">
          <el-input v-model="form.title" placeholder="请输入内容"></el-input>
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
      page: {
        pages: 5,
        total: 0,
        pageSize: 7,
        pageNum: 1,
      },
      dialogVisible: false,
      title: "",
      form: {
        num: "",
        inrto: "",
      },
      formInline: {
        name: "",
        type: "",
      },

      rules: {
        file: [
          {
            required: true,
            message: "请选择导入文件",
            trigger: "blur",
          },
        ],
        num: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        model: [
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

    getData() {
      axios({
        method: "get",
        url: "http://localhost:8081/goods",
        params: {
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum,
          
        },
      }).then((res) => {
        console.log(res)
        this.tableData=res.data.list
        this.page.total = res.data.total;
      });
    axios({
        method: "get",
        url: "http://localhost:8081/goods",
        params: {
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum,
        },
      }).then((res) => {
        console.log(res)
        this.tableData=res.data.list
        this.page.total = res.data.total;
      });
    },
    resetPassword(index, row) {
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
      this.form.model = "";
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