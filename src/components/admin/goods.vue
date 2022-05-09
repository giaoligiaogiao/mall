<template>
  <div>
    <div class="top-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="addUser"
            >添加商品</el-button
          >
        </el-form-item>
        <el-form-item label="搜索">
          <el-input
            v-model="formInline.name"
            placeholder="搜索条件"
          ></el-input>
        </el-form-item>
          <el-button type="primary" @click="page.pageNum=1;getData()">查询</el-button>
        </el-form-item>
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
      <el-table-column prop="num" label="数量"> </el-table-column>

      <el-table-column prop="intro" label="介绍"> </el-table-column>

      <el-table-column label="价格" prop="price"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="resetPassword(scope.$index, scope.row)"
            >操作</el-button
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

        <el-form-item label="商品数量" label-width="120px" prop="num">
          <el-input v-model="form.num" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍" label-width="120px" prop="intro">
          <el-input v-model="form.intro" placeholder="请输入内容"></el-input>
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

export default {
  data() {
    return {
      fileList: [],
      num: 0,
      list: [],
      tableData: [   {
            img: 'static/img/goodsDetail/intro/1.jpg',
            price: 39.9,
            intro: 'SKSK 苹果7/7plus手机壳 iPhone 7 Plus保护套全包硬',
            num: 3140,
            sale: 9000
          },],
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
        num:'',
        inrto:'',
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
        intro: [
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
      let params = {
        pageSize: this.page.pageSize,
        pageNum: this.page.pageNum,
        keyword: this.formInline.name,
        type: this.formInline.type,
      };

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
      this.form.intro = "";
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