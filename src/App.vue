<template>
  <div id="app">
    <div v-if="list.indexOf($route.name)==-1">
       <Header></Header>
    <router-view/>
    <!-- 部分路由不应该包含这个Footer -->
    <Footer v-if="excludeRoutes.indexOf($route.name) == -1"></Footer>
    </div>
    <div v-else style="height:100%">
      <router-view />
    </div>
  </div>

</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default {
  name: 'App',
  data () {
    return {
      excludeRoutes: ['HomeIndex', 'MyAddress', 'AddAddress', 'MyOrder', 'MyShoppingCart'],
      list:['Login2','Index2','goods','users']
    };
  },
  components: {
    Header,
    Footer
  }
};
</script>
<style scoped>
#app{
  height: 100%;
}
</style>