<template>
  <div class="container">
      <div class="login">
            <h1 class="title">商城后台管理系统</h1>
            <div class="box">
                <el-input style="width:80%;margin:20px" v-model="account" placeholder="用户名" clearable="true"></el-input>
                <el-input style="width:80%;margin-bottom:20px" v-model="password" placeholder="密码" :show-password='true'></el-input>
                <el-button style="width:80%" type="primary"   @click="handleSubmit('formInline')">登录</el-button>
            </div>
      </div>

  </div>
</template>

<script>
// import handleSubmit() from '@/components/Login'
export default {
data(){
    return{
        account:'',
        password:''
    }
}
}
</script>

<style scoped>
.container{
    width: 100%;
    height: 100%;
    background: rgb(90, 154, 156);
}
.login{
    width: 400px;
    height: 400px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.title{
    color: #FFF;
    text-align: center;
    margin-bottom: 50px;
}
.box{
    border-radius: 10px;
    width: 100%;
    height: 200px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>