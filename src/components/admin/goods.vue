<template>
  <div>
    <div class="top-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="addGood"
            >添加商品</el-button
          >
        </el-form-item>
        <el-form-item label="查询">
          <el-input
            v-model="formInline.title"
            placeholder="商品介绍"
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
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="" style="width: 80%" />
        </template>
      </el-table-column>
      <el-table-column prop="volume" label="销量"> </el-table-column>
      <el-table-column prop="remarks" label="评论"> </el-table-column>
      <el-table-column prop="title" label="商品"> </el-table-column>

      <el-table-column label="价格" prop="price"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="reset(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button size="mini" @click="deleteGoods(scope.$index, scope.row)"
            >删除</el-button
          >
          <el-button size="mini" @click="reset(scope.$index, scope.row)"
            >添加款式</el-button
          >
          <el-button size="mini" @click="openks(scope.$index, scope.row)"
            >编辑款式</el-button
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
        <el-form-item label="商品图片" label-width="120px" prop="img">
          <el-input v-model="form.img" placeholder="请输入路径"></el-input>
        </el-form-item>
        <el-form-item label="商品详情" label-width="120px" prop="img2">
          <el-input v-model="form.img2" placeholder="请输入路径"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍" label-width="120px" prop="title">
          <el-input v-model="form.title" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" label-width="120px" prop="price">
          <el-input v-model="form.price" placeholder="请输入价格"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upload()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="title1"
      width="1000px"
      :visible.sync="dialogVisible1"
      :close-on-click-modal="false"
    >
      <el-form :model="form1" ref="form1" >
        <div v-for="item in form1" style="display:flex">
          <el-form-item label="商品图片" label-width="120px" prop="img">
            <el-input v-model="item.img" placeholder="请输入路径"></el-input>
          </el-form-item>
          <el-form-item label="商品介绍" label-width="120px" prop="title">
            <el-input v-model="item.model" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" label-width="120px" prop="price">
            <el-input v-model="item.price" placeholder="请输入价格"></el-input>
          </el-form-item>
          <el-button @click="editks(item)">编辑</el-button>
          <el-button @click="deleteks(item)">删除</el-button>
        </div>
        
      </el-form>
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
      page: {
        pages: 5,
        total: 0,
      
        pageSize: 7,
        pageNum: 1,
      },
      dialogVisible: false,
      title: "",
      form: {
        img: "",
        price: "",
        title: "",
      },
      form1:{

      },
      formInline: {
        title: "",
        type: "",
      },
      dialogVisible1:false,

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
        title: [
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
        url: "http://localhost:8081/goods/modify",
        data: this.form,
      }).then((res) => {
        console.log(res);
        this.dialogVisible = false;
      });
      setTimeout(() => {
        this.getData();
      }, 10);},
    upload() {
      if (this.type == "edit") {
        this.edit();
      } else {
        this.$refs.form.validate((valid) => {
          if (valid) {
      axios({
        method: "post",
        url: "http://localhost:8081/goods/add",
        data: JSON.stringify({
          img: this.form.img,
          img2: this.form.img2,
          title: this.form.title,
          price: this.form.price,
        }),
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      });
      setTimeout(() => {
              this.dialogVisible = false;
              this.getData();
            });
          }else {
            return false;
          }
        });
      }
    },
    deleteks(data){
      axios({
        method: "get",
        url: "http://localhost:8081/models/delete",
        params: {
          id: data.id,
        },
      });
      setTimeout(() => {
        this.dialogVisible1=false
        this.getData();
      });
    },
    editks(data){
      axios({
        method: "post",
        url: "http://localhost:8081/models/modify",
        data,
      });
      setTimeout(() => {
        this.dialogVisible1=false
        this.getData();
      });
    },
    delete() {
      axios({
        method: "get",
        url: "http://localhost:8081/goods/delete",
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
        url: "http://localhost:8081/goods",
        params: {
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum,
          search: this.formInline.title,
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
    openks(index,row){
      
      axios({
        method: "get",
        url: "http://localhost:8081/models/search",
        params: {
         goodsId:row.id
        },
      }).then((res) => {
        this.dialogVisible1 = true;
        this.title1 = "编辑";
        console.log(res);
       this.form1=res.data
      });
      // this.form1=
    },
    deleteGoods(index, row) {
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
    addGood() {
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