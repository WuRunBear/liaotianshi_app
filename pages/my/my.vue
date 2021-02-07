<template>
  <view>
    <view class="my-detail">
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
import { mapGetters } from "vuex";

export default {
  name: "my",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["userInfo"]),
  },
  methods: {
    tuic() {
      console.log(this.userInfo);
    },
  },
};
</script>

<style lang="scss" scoped>
.my-detail {
  display: flex;
  padding: $uni-spacing-col-base $uni-spacing-row-lg;
  border-bottom: solid 1rpx #000;

  .info {
    flex: 1;
    margin-left: $uni-spacing-row-lg;
  }
}
.operate-btn {
  margin-top: $uni-spacing-row-lg;
}
</style>
