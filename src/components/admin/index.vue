<template>
  <a-layout id="components-layout">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">商城后台管理系统</div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="[1]">
        <a-menu-item key="1" @click="ToRouter('goods', '1')">
          <a-icon type="bank" />
          <span>商品管理</span>
        </a-menu-item>
        <a-menu-item key="2" @click="ToRouter('users', '2')">
          <a-icon type="user" />
          <span>用户管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" class="header">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <a-dropdown :trigger="['click']" class="menu">
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            admin<a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="0" @click="ToRouter('login2', 1)">
              退出登录
            </a-menu-item>
            <a-menu-item key="1" @click="changePassword">修改密码</a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
      <el-dialog title="修改密码" width="500px" :visible.sync="dialogVisible">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="账户" label-width="100px" prop="account">
            <el-input
              maxlength="20"
              show-word-limit
              v-model="form.account"
              placeholder="请输入您的账户"
            ></el-input>
          </el-form-item>
          <el-form-item label="旧密码" label-width="100px" prop="oldPassword">
            <el-input
              maxlength="20"
              show-word-limit
              v-model="form.oldPassword"
              placeholder="请输入您的原密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" label-width="100px" prop="newPassword">
            <el-input
              maxlength="20"
              show-word-limit
              v-model="form.newPassword"
              placeholder="请输入您的新密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
      </el-dialog>
    </a-layout>
  </a-layout>
</template>
<script>
// import { mapActions, mapState, mapMutations } from "vuex";
// import { MUTATION_SAVEINDEX } from "@/store/mutation/mutation-types";
// import {
//   ACTION_MANAGERGETINFO,
//   ACTION_UPDATEPASSWORD,
//   ACTION_GETUSERINFO,
// } from "@/store/action/action-types";
export default {
  data() {
    return {
      collapsed: false,
      dialogVisible: false,
      form: {
        account: "",
        oldPassword: "",
        newPassword: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账户", trigger: "blur" }],
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    // ...mapState(["user", "index"]),
  },
  methods: {
    // ...mapMutations([MUTATION_SAVEINDEX]),
    // ...mapActions([
    //   ACTION_MANAGERGETINFO,
    //   ACTION_UPDATEPASSWORD,
    //   ACTION_GETUSERINFO,
    // ]),
    ToRouter(url, index) {
      // this.MUTATION_SAVEINDEX(index);
      if (this.$route.path != "/" + url) this.$router.push(url);
    },
    changePassword() {
      this.dialogVisible = true;
      console.log(this.user);
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    },
    // submit() {
    //   this.$refs["form"].validate((valid) => {
    //     if (valid) {
    //       if (this.form.oldPassword != this.user.password) {
    //         this.$message.error("密码输入错误");
    //         this.dialogVisible = false;
    //       } else if (this.form.account != this.user.account) {
    //         this.$message.error("账户输入错误");
    //         this.dialogVisible = false;
    //       } else {
    //         this.ACTION_UPDATEPASSWORD(this.form).then(() => {
    //           this.ACTION_GETUSERINFO({ id: this.user.userId });
    //         });
    //         this.dialogVisible = false;
    //       }
    //     } else return false;
    //   });
    // },
  },
};
</script>

<style  scoped>
#components-layout {
  height: 100%;
  width: 100%;
 
}
 .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger :hover {
    color: #1890ff;
  }
  .logo {
    height: 32px;
    color: #fff;
    margin: 16px;
    font-size: 20px;

    overflow: hidden;
  }
.header {

}
  .menu {
    float: right;
    height: 65%;
    margin-right: 80px;
  }
.ant-layout-content {
  min-height: auto;
}
</style>