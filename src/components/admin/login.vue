<template>
  <div class="container">
      <div class="login">
            <h1 class="title">商城后台管理系统</h1>
            <div class="box" >
                <Form ref="formInline" :model="formDate" :rules="ruleInline">
              <FormItem prop="username">
                <el-input style="width:80%;margin:20px" v-model="formDate.username" placeholder="用户名" ></el-input>
                 
              </FormItem>
               <FormItem prop="password">
                <el-input style="width:80%;margin-bottom:20px" v-model="formDate.password" placeholder="密码" :show-password='true'></el-input>
                </FormItem>
                <FormItem>
                <el-button style="width:80%" type="primary"   @click="handleSubmit('formInline')">登录</el-button>
                </FormItem>
                </Form>
            </div>
      </div>

  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapMutations, mapActions } from 'vuex';
export default {
  name: 'Login',
  data () {
    return {
      formDate: {
        username: '',
        password: ''
      },
      ruleInline: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(['SET_USER_LOGIN_INFO']),
    ...mapActions(['login']),
    handleSubmit (name) {
      const father = this;
      console.log(this.formDate.username);
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.login(father.formDate).then(result => {
            if (result) {
              this.$Message.success('登录成功');
              father.$router.push('/');
            } else {
              this.$Message.error('用户名或密码错误');
            }
          });
        } else {
          this.$Message.error('请填写正确的用户名或密码');
        }
      });
    }
  },
  store
};
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