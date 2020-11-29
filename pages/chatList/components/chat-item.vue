<template>
  <view>
    <view
      @touchstart="chat_item_back_show"
      @touchcancel="chat_item_back_hidden"
      @touchend="chat_item_back_hidden"
      @click='toBVue({path: "/pages/chatDetail/chatDetail?room_id=123456"})'
      :class="{ chat_item_back }"
      class="chat_item"
      v-if="info"
    >
      <view class="left">
        <u-image class="picture" width="96rpx" height="96rpx" :src="info.picture"></u-image>
      </view>

      <view class="right">
        <view class="top">
          <view class="name">{{ info.name }}</view>

          <view class="time">{{ info.time | format }}</view>
        </view>

        <view class="bottom">
          <view class="msg">{{ info.newMsg }}</view>

          <view class="status"><u-icon name="volume-off"></u-icon></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => null
    }
  },
  name: 'chat-item',
  data() {
    return {
      info: this.data,
      chat_item_back: false
    };
  },
  methods: {
    chat_item_back_show(){
      this.chat_item_back = true;
    },
    chat_item_back_hidden(){
      this.chat_item_back = false;
    },
    toBVue(to){
      uni.navigateTo({
        url: to.path
      });
    }
  },
  filters: {
    /**
     * 格式化时间
     */
    format(v) {
      // 消息的时间
      let chatTime = new Date(v);
      // 现在的时间
      let nowTime = new Date();

      // 如果不在同一年  返回格式：yyyy年MM月dd日 HH:mm:ss
      if (chatTime.getFullYear() < nowTime.getFullYear()) {
        return chatTime.format('yyyy年MM月dd日 HH:mm:ss');
      }

      // 如果在同一年
      if (chatTime.getFullYear() == nowTime.getFullYear()) {
        // 如果在同一个月  否则返回格式：MM月dd日
        if (chatTime.getMonth() == nowTime.getMonth()) {
          if (chatTime.getDate() == nowTime.getDate() - 1) {
            return '昨天';
          }

          // 如果在同一星期
          if (chatTime.getIsSameWeek(nowTime)) {
            // 如果在同一天
            if (chatTime.getDay() == nowTime.getDay()) {
              return chatTime.format('HH:mm');
            } else {
              return chatTime.format('EE HH:mm');
            }
          } else {
            return chatTime.format('MM月dd日');
          }
        } else {
          return chatTime.format('MM月dd日');
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chat_item_back {
  background-color: #efefee;
}
.chat_item {
  display: flex;
  padding: 0 32rpx;
  height: 136rpx;
  font-family: PingFangSC-Regular;
  border-bottom: 1rpx #e1e1e1 solid;

  .left {
    width: 96rpx;
    margin-right: 32rpx;
    display: flex;
    align-items: center;
  }

  .right {
    flex: 1;
    height: 100%;
    .top {
      height: 50%;
      display: flex;
      align-items: center;

      .name {
        font-size: 28rpx;
        color: #272832;
      }

      .time {
        margin-left: auto;
        font-size: 22rpx;
        color: rgba(39, 40, 50, 0.4);
      }
    }
    .bottom {
      height: 50%;
      display: flex;
      align-items: center;

      .msg {
        font-size: 26rpx;
        color: rgba(39, 40, 50, 0.6);
      }

      .status {
        margin-left: auto;
        font-size: 40rpx;
        color: rgba(39, 40, 50, 0.4);
      }
    }
  }
}
</style>
