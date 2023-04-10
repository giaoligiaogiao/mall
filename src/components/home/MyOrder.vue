<template>
  <div>
    <el-table :data="order" style="width: 100%" border>
      <el-table-column label="订单号" prop="order_id"></el-table-column>
      <el-table-column label="图片" prop="img">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="详情" prop="title"></el-table-column>
      <el-table-column label="款式" prop="package"></el-table-column>
      <el-table-column label="数量" prop="count"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="购买时间" prop="createAt"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleRate(scope.$index, scope.row)"
            >评价</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="page-size">
      <Page :total="100" show-sizer></Page>
    </div>
    <el-dialog
      title="商品评价"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="form"  ref="form"  >
        <el-form-item label="评价:">
          <el-input type="textarea" v-model="form.comments" ></el-input>
        </el-form-item>
        <el-form-item label="评分:" style="display: flex;align-items: center">
          <el-rate v-model="form.rate" ></el-rate>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MyOrder",
  data() {
    return {
      dialogVisible:false,
      form:{
        comments:'',
        rate:0
      },
      order: [
        {
          order_id: 1529931938150,
          count: 1,
          img: "static/img/goodsDetail/pack/1.jpg",
          package: "4.7英寸-深邃蓝",
          price: 28,
          title: "苹果8/7手机壳iPhone7 Plus保护壳全包防摔磨砂硬外壳",
          createAt: "2018-06-06 20:06:08"
        }
      ],
    }
  },
  methods: {
    handleRate() {
      this.dialogVisible=true
    },
    handleClose(){
      this.form.comments=''
      this.form.rate=0
    },
    submit(){
      if(!this.form.comments||!this.form.rate){
        this.$message('请完成商品的评价填写');
      }
      else{

      }
    }
  }
};
</script>

<style scoped>
.page-size {
  margin: 15px 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
