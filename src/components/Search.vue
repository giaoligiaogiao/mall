<template>
  <div>
    <div class="container">
      <i-input v-model="sreachData" size="large" class="sreach" placeholder="输入你想查找的商品">
        <Button slot="append" icon="ios-search" @click="sreach"></Button>
      </i-input>
      <Tag v-for="(item, index) in promotionTags" :key="index" closable  @on-close="closeTags(index)"><span @click="selectTags(index)">{{item}}</span></Tag>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Search',
  data () {
    
    return {
      sreachData: '',
      promotionTags: ['手机', '电脑', '零食', '母婴', '衣服']
    };
  },
  watch:{
    
  },
  methods: {
    
    closeTags (index) {
      this.promotionTags.splice(index, 1);
    },
    selectTags (index) {
      this.sreachData = this.promotionTags[index];
    },
    sreach () { 
      if(this.$parent.getData){
        this.$parent.getData(this.sreachData)
      }
      
      this.$router.push({path: '/goodsList', query: { sreachData: this.sreachData }

    });
      // axios({
      //   method: "get",
      //   url: "http://localhost:8081/goods",
      //   params: {
      //     pageSize: this.page.pageSize,
      //     pageNum: this.page.pageNum,
      //     search:this.formInline.title,
      //   },
      // }).then((res) => {
      //   console.log(res)
      //   this.tableData=res.data.list,
      //   this.page.total = res.data.total;
      // });
    
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 15px;
  margin: 0px auto;
  margin-bottom: 15px;
  width: 460px;
}
.sreach {
  margin: 5px 0px;
}
</style>
