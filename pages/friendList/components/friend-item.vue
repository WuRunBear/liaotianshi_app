<template>
  <view>
    <view
      @touchstart="friend_item_back_show"
      @touchcancel="friend_item_back_hidden"
      @touchend="friend_item_back_hidden"
      @click="toBVue"
      :class="{ friend_item_back }"
      class="friend_item"
      v-if="info"
    >
      <view class="left">
        <u-image
          class="picture"
          width="80rpx"
          height="80rpx"
          :src="info.picture"
        ></u-image>
      </view>

      <view class="right">
        <view class="title">{{ info.title }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => null,
    },
  },
  name: "friend-item",
  data() {
    return {
      info: this.data,
      friend_item_back: false,
    };
  },
  methods: {
    /**
     * 被按下时背景颜色显示
     */
    friend_item_back_show() {
      this.friend_item_back = true;
    },
    /**
     * 放开时背景颜色隐藏
     */
    friend_item_back_hidden() {
      this.friend_item_back = false;
    },
    /**
     * 跳转
     */
    toBVue(to) {
      this.toPage("navigateTo", {
        url: '/pages/userDetail/userDetail',
        query: {
          number: this.info.number
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.friend_item_back {
  background-color: #efefee;
}
.friend_item {
  display: flex;
  padding: 0 32rpx;
  height: 110rpx;
  font-family: PingFangSC-Regular;
  border-bottom: 1rpx #e1e1e1 solid;

  .left {
    // width: 96rpx;
    margin: 32rpx 32rpx 32rpx 0;
    display: flex;
    align-items: center;
  }

  .right {
    flex: 1;
    .title {
      font-size: 28rpx;
      color: #272832;
      line-height: 110rpx;
    }
  }
}
</style>
