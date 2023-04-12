<template>
  <div>
    <Search></Search>
    <div class="container">
      <div class="bread-crumb">
        <Breadcrumb>
          <BreadcrumbItem to="/">
            <Icon type="ios-home-outline"></Icon> 首页
          </BreadcrumbItem>
          <BreadcrumbItem to="/goodsList?sreachData=">
            <Icon type="bag"></Icon> {{ searchItem }}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
  
      <div class="goods-box">
        <div class="as-box">
          <div class="item-as-title">
            <span>商品精选</span>
            <span>广告</span>
          </div>
          <div class="item-as" v-for="(item, index) in asItems" :key="index">
            <div class="item-as-img">
              <img :src="item.img" alt="" />
            </div>
            <div class="item-as-price">
              <span>
                <Icon type="social-yen text-danger"></Icon>
                <span class="seckill-price text-danger">{{ item.price }}</span>
              </span>
            </div>
            <div class="item-as-intro">
              <span>{{ item.intro }}</span>
            </div>
            <div class="item-as-selled">
              已有<span>{{ item.num }}</span
              >人评价
            </div>
          </div>
        </div>
        <div class="goods-list-box">
          <div class="goods-list-tool">
            <ul>
              <li
                v-for="(item, index) in goodsTool"
                :key="index"
                @click="orderBy(item.en, index)"
              >
                <span :class="{ 'goods-list-tool-active': isAction[index] }"
                  >{{ item.title }} <Icon :type="icon[index]"></Icon
                ></span>
              </li>
            </ul>
          </div>
          <div class="goods-list">
            <div
              class="goods-show-info"
              v-for="(item, index) in orderGoodsList"
              :key="index"
            >
              <div class="goods-show-img">
                
                <img :src="item.img" @click="todetail(item)"/>
              </div>
              <div class="goods-show-price">
                <span>
                  <Icon type="social-yen text-danger"></Icon>
                  <span class="seckill-price text-danger">{{
                    item.price.toFixed(2)
                  }}</span>
                </span>
              </div>
              <div class="goods-show-detail">
                <span>{{ item.intro }}</span>
              </div>
              <div class="goods-show-num">
                <span>{{ item.remarks }}</span
                >条评价
              </div>
              <div class="goods-show-seller">
                <span>{{ item.shopName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-page">
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
    </div>
    <Spin size="large" fix v-if="isLoading"></Spin>
  </div>
</template>

<script>
import Search from "@/components/Search";
import store from "@/vuex/store";
import axios from "axios";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "GoodsList",
  beforeRouteEnter(to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  data() {
    return {
      searchItem: "",
      isAction: [true, false, false],
      icon: ["arrow-up-a", "arrow-down-a", "arrow-down-a"],
      goodsTool: [
        { title: "上架时间", en: "sale" },
        { title: "评论数", en: "remarks" },
        { title: "价格", en: "price" },
      ],
      //分页字段
      page: {
        pages: 5,
        total: 0,
        pageSizes: [5, 7, 10],
        pageSize: 7,
        pageNum: 1,
      },
      goods: [],
    };
  },
  computed: {
    ...mapState(["asItems", "isLoading"]),
    ...mapGetters(["orderGoodsList"]),
  },
  methods: {
    ...mapMutations(["SET_GOODS_ORDER_BY","SET_LOAD_STATUS","SET_GOODS_LIST","SET_LOAD_STATUS"]),
    ...mapActions(["loadGoodsList"]),
    orderBy(data, index) {
      console.log(data);
      this.icon = ["arrow-down-a", "arrow-down-a", "arrow-down-a"];
      this.isAction = [false, false, false];
      this.isAction[index] = true;
      this.icon[index] = "arrow-up-a";
      this.SET_GOODS_ORDER_BY(data);
    },
    //分页方法不用管
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getData();
    },
    //分页方法不用管
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getData();
    },
    getData(data) {
      this.SET_LOAD_STATUS(true);
      axios({
        method: "get",
        url: "http://localhost:8081/goods",
        params: {
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum,
          search:data
        },
      }).then((res) => {
        this.page.total = res.data.total
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const data = {
              goodsList: res.data.list,
              asItems: [
                {
                  img: "static/img/goodsList/item-as-.jpg",
                  price: 39.9,
                  intro: "SKSK 苹果7/7plus手机壳 iPhone 7 Plus保护套全包硬",
                  num: 3140,
                  sale: 9000,
                },
              ],
            };
            this.SET_GOODS_LIST(data);
            this.SET_LOAD_STATUS(false);
          });
        });
      });
    },
    todetail(item){
      this.$router.push({
        query:item,
        path:'/goodsDetail'
      })
    }
  },
  mounted() {
    this.searchItem = this.$route.query.sreachData;
    this.getData(this.searchItem)
    
    // this.loadGoodsList();
    // this.getData();
  },
  components: {
    Search
  },
  store,
};
</script>

<style scoped>
.container {
  margin: 15px auto;
  width: 93%;
  min-width: 1000px;
}
.text-danger {
  color: #a94442;
}
.seckill-price {
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
}
.goods-box {
  display: flex;
}
/* ---------------侧边广告栏开始------------------- */
.as-box {
  width: 200px;
  border: 1px solid #ccc;
}
.item-as-title {
  width: 100%;
  height: 36px;
  color: #b1191a;
  line-height: 36px;
  font-size: 18px;
}
.item-as-title span:first-child {
  margin-left: 20px;
}
.item-as-title span:last-child {
  float: right;
  margin-right: 15px;
  font-size: 10px;
  color: #ccc;
}
.item-as {
  width: 160px;
  margin: 18px auto;
}
.item-as-img {
  width: 160px;
  height: 160px;
  margin: 0px auto;
}
.item-as-price span {
  font-size: 18px;
}
.item-as-intro {
  margin-top: 5px;
  font-size: 12px;
}
.item-as-selled {
  margin-top: 5px;
  font-size: 12px;
}
.item-as-selled span {
  color: #005aa0;
}
/* ---------------侧边广告栏结束------------------- */

/* ---------------商品栏开始------------------- */
.goods-list-box {
  margin-left: 15px;
  width: calc(100% - 215px);
}
.goods-list-tool {
  width: 100%;
  height: 38px;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}
.goods-list-tool ul {
  padding-left: 15px;
  list-style: none;
}
.goods-list-tool li {
  cursor: pointer;
  float: left;
}
.goods-list-tool span {
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-left: none;
  line-height: 36px;
  background-color: #fff;
}
.goods-list-tool span:hover {
  border: 1px solid #e4393c;
}
.goods-list-tool i:hover {
  color: #e4393c;
}
.goods-list-tool-active {
  color: #fff;
  border-left: 1px solid #ccc;
  background-color: #e4393c !important;
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.goods-show-info {
  width: 240px;
  padding: 10px;
  margin: 15px 0px;
  border: 1px solid #fff;
  cursor: pointer;
}
.goods-show-info:hover {
  border: 1px solid #ccc;
  box-shadow: 0px 0px 15px #ccc;
}
.goods-show-price {
  margin-top: 6px;
}
.goods-show-detail {
  font-size: 12px;
  margin: 6px 0px;
}
.goods-show-num {
  font-size: 12px;
  margin-bottom: 6px;
  color: #009688;
}
.goods-show-num span {
  color: #005aa0;
  font-weight: bold;
}
.goods-show-seller {
  font-size: 12px;
  color: #e4393c;
}
.goods-page {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
/* ---------------商品栏结束------------------- */
</style>
