<template>
  <view>
    我的
    <u-button @click="tuic">退出登录</u-button>
  </view>
</template>

<script>
export default {
  name: 'my',
  data() {
    return {};
  },
  methods: {
    tuic() {
      uni.removeStorageSync('userInfo');
      uni.reLaunch({
        url: '/pages/login/login'
      });
    }
  }
};
</script>

<style lang="scss"></style>
