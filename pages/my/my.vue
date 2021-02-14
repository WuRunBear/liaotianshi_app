<template>
  <view>
    <view
      class="my-detail"
      hover-class="hover-class"
      hover-start-time="50"
      hover-stay-time="50"
    >
      <u-avatar
        class="avatar"
        :src="userInfo.avatar"
        mode="square"
        size="large"
      />

      <view class="info">
        <view class="name">{{ userInfo.name }}</view>
      </view>
    </view>

    <u-button class="operate-btn" type="error" @click="tuic">退出登录</u-button>
  </view>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "my",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["userInfo"]),
    ...mapActions("user", ["logout"]),
  },
  methods: {
    tuic() {
      this.logout();
    },
  },
};
</script>

<style lang="scss" scoped>
.my-detail {
  display: flex;
  padding: $uni-spacing-col-base $uni-spacing-row-lg;
  border-bottom: solid 1rpx $uni-border-color;

  .info {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: $uni-spacing-row-lg;
  }
}
.operate-btn {
  margin-top: $uni-spacing-row-lg;
}
</style>
