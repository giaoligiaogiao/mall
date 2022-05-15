<template>
  <div>
    <div class="pay-done-box">
      <img src="static/img/pay-success.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayDone',
   mounted () {
    const father = this;
    setTimeout(() => {
     this.$router.push('/');
    }, 3000);
  },
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
