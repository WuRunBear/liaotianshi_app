<template>
  <view class="content">
    <view
      style="width: 100%;padding: 0 62rpx;margin: auto;"
    >
      <u-image
        class="logo"
        src="@/static/logo@3x.png"
        width="192rpx"
        height="91.6rpx"
      />

      <text class="title">注册\n</text>
      <!-- 表单 -->
      <u-form
        :model="userInfo"
        ref="uForm"
        style="margin-top: 40rpx;"
      >
        <u-form-item prop="name" label-width="auto">
          <u-input
            v-model="userInfo.name"
            type="string"
            placeholder="请输入昵称"
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

        <u-form-item prop="confirmPwd" label-width="auto">
          <u-input
            v-model="userInfo.confirmPwd"
            type="password"
            placeholder="确认密码"
            placeholder-style="font-size: 32rpx;"
          />
        </u-form-item>

        <u-form-item prop="email" label-width="auto">
          <u-input
            v-model="userInfo.email"
            type="string"
            placeholder="请输入邮箱"
            placeholder-style="font-size: 32rpx;"
          />
        </u-form-item>
      </u-form>

      <u-button
        class="registerBtn"
        @click="register"
        shape="circle"
        :ripple="true"
        :hair-line="false"
      >
        注册
      </u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: '',
        password: '',
        confirmPwd: '',
        email: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['change', 'blur']
          },
          {
            type: 'string',
            max: 10,
            min: 3,
            message: '用户名格式错误，应是3~10个字符',
            trigger: ['change', 'blur']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['change', 'blur']
          },
          {
            type: 'string',
            max: 16,
            min: 6,
            message: '密码格式错误，长度应是6~16个字符',
            trigger: ['change', 'blur']
          }
        ],
        confirmPwd: [
          {
            required: true,
            message: '请输入确认密码',
            trigger: ['change', 'blur']
          },
          {
            type: 'string',
            max: 16,
            min: 6,
            message: '密码格式错误，长度应是6~16个字符',
            trigger: ['change', 'blur']
          },
          {
            validator: (rlue, value) => {
              return value === this.userInfo.password;
            },
            message: '两次密码不一致',
            trigger: ['change', 'blur']
          }
        ],
        email: [
          {
            type: 'email',
            message: '邮箱格式错误',
            trigger: ['change', 'blur']
          }
        ]
      }
    };
  },
  methods: {
    register() {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          // 将新注册的用户账号返回给login页面
          uni.$emit('register', { number: 1234567891 });

          this.toPage("navigateBack");
        }
      });
    }
  },
  onReady() {
    // 设置登录表单的验证规则
    this.$refs.uForm.setRules(this.rules);

    // 设置导航栏
    uni.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: 'rgba(255,255,255,0)',
      success(e) {
        console.log('setNav success', e);
      },
      fail(e) {
        console.log('setNav fail', e);
      }
    });
  }
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

  .registerBtn {
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
}
</style>
