<template>
  <view>
    <view
      :class="{ 
        isMe: user.number == msg.master.number
      }"
      class="message"
    >
      <view class="left">
        <u-image class="user_picture" width="80rpx" height="80rpx" :src="msg.master.picture" />
      </view>

      <view class="right">
        <view class="user_name">{{ msg.master.userName }}</view>

        <view class="user_message">{{ msg.text }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    msg: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      user: {
        number: 1234567891,
        userName: '测试用户自己',
        picture: ''
      }
    };
  },
};
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  margin: 10rpx 0;
  .left {
    width: 128rpx;
    height: 80rpx;
    display: flex;
    justify-content: center;
  }
  .right {
    .user_name {
      font-size: 22rpx;
    }
    .user_message {
      max-width: 494rpx;
      font-size: 32rpx;
      padding: 16rpx 22rpx;
      margin-top: 5rpx;
      line-height: 44rpx;
      border-radius: 15rpx;
      background-color: #ffffff;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
}
.isMe {
  flex-direction: row-reverse;
  .right {
    .user_name {
      text-align: right;
    }
    .user_message {
      background-color: #19BE6B;
    }
  }
}
</style>
