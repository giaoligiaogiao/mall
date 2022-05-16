<template>
  <div>
    <div class="pay-done-box">
      <img src="static/img/pay-success.png" />
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState,mapActions } from "vuex";
export default {
  name: "PayDone",
  created() {
    this.loadShoppingCart();
  },
  computed: {
    ...mapState(['shoppingCart'])
  },
  mounted() {

    setTimeout(() => {
      this.$router.push("/");
    }, 3000);
  },
  methods: {
    ...mapActions(["loadShoppingCart"])
  },
  store
};
</script>

<style scoped>
.pay-done-box {
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
