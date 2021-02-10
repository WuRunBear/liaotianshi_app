<template>
  <view class="content">
    <view style="width: 100%; padding: 0 62rpx; margin: auto">
      <u-image
        class="logo"
        src="@/static/logo@3x.png"
        width="192rpx"
        height="91.6rpx"
      />

      <text class="title">登录\n</text>
      <text style="font-size: 40rpx; color: rgba(39, 40, 50, 0.5)"
        >您好，欢迎来到 HChat！</text
      >

      <!-- 表单 -->
      <u-form :model="userInfo" ref="uForm" style="margin-top: 40rpx">
        <u-form-item prop="number" label-width="auto">
          <u-input
            v-model="userInfo.number"
            type="number"
            placeholder="请输入用户名"
            placeholder-style="font-size: 32rpx;"
          />
        </u-form-item>

        <u-form-item prop="password" label-width="auto">
          <u-input
            v-model="userInfo.password"
            type="password"
            placeholder="请输入密码"
            placeholder-style="font-size: 32rpx;"
          />
        </u-form-item>
      </u-form>

      <u-button
        class="loginBtn"
        @click="Login"
        shape="circle"
        :ripple="true"
        :hair-line="false"
      >
        登录
      </u-button>

      <view class="other">
        <view hover-class="otherActive" @click="getBackPwd">忘记密码</view>
        <view hover-class="otherActive" @click="register">用户注册</view>
      </view>
    </view>

    <!-- 消息提示 -->
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userInfo: {
        number: "",
        password: "",
        auto_login: true,
        keep_password: true,
      },
      rules: {
        number: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["change", "blur"],
          },
          {
            type: "number",
            max: 10,
            min: 10,
            message: "用户名格式错误，应是10位数的纯数字",
            trigger: ["change", "blur"],
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["change", "blur"],
          },
          {
            type: "string",
            max: 16,
            min: 6,
            message: "密码格式错误，长度应是6~16个字符",
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },
  computed: {
    ...mapActions("user", ["login"]),
  },
  methods: {
    register() {
      this.toPage("navigateTo", {
        url: "/pages/register/register",
      });
    },
    getBackPwd() {
      this.toPage("navigateTo", {
        url: "/pages/getBackPwd/getBackPwd",
      });
    },
    Login(e) {
      this.login();
      return false;
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          // if ('1234567891' == this.userInfo.number && '123456' == this.userInfo.password) {
          if (this.userInfo.number && this.userInfo.password) {
            this.login();
          } else {
            this.$refs.uToast.show({
              title: "登录失败，用户名或密码错误！",
              type: "error",
            });
          }
        }
      });
    },
  },
  onReady() {
    // 设置登录表单的验证规则
    this.$refs.uForm.setRules(this.rules);

    // 获取新注册的账号
    uni.$on("register", (data) => {
      this.userInfo.number = data.number;
    });
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  .logo {
    margin: 0 auto;
    margin-bottom: 54.4rpx;
  }

  .title {
    font-size: 56rpx;
    font-weight: bold;
  }

  .loginBtn {
    width: 520rpx;
    height: 96rpx;
    margin-top: 100rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    border: none;
    box-shadow: 0 25px 16px -18px rgba(255, 228, 49, 0.9);
    background-color: rgba(255, 228, 49, 1);
  }

  .other {
    width: 520rpx;
    margin: 0 auto;
    margin-top: 40rpx;
    font-size: 28rpx;
    color: rgba(74, 170, 255, 1);
    display: flex;
    justify-content: space-between;
  }

  .otherActive {
    color: rgba(59, 136, 204, 1);
  }
}
</style>
