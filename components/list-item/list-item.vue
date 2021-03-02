<template>
  <view>
    <view
      @touchstart="back_show"
      @touchcancel="back_hidden"
      @touchend="back_hidden"
      @click="click"
      :class="{ 'list-item_back': back, 'list-item_simple': simple }"
      :style="{ ...style }"
      class="list-item"
      v-if="info"
    >
      <view class="left">
        <u-avatar class="picture" :src="info.avatar" mode="square" />
      </view>

      <view class="right">
        <view class="top">
          <text class="name">{{ info.name }}</text>

          <view v-if="!simple" class="time">{{ info.time | format }}</view>
        </view>

        <view v-if="!simple" class="bottom">
          <view class="msg">{{ info.newMsg }}</view>

          <view class="status"><u-icon name="volume-off"></u-icon></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "list-item",
  props: {
    data: {
      type: Object,
      default: () => null,
    },
    // 简洁版  只有图片和文字标题
    simple: {
      type: Boolean,
      default: false
    },
    height: {
      type: String|Number,
      default: ""
    }
  },
  data() {
    let style = {};
    this.height && (style.height = this.height + "rpx");
    return {
      info: this.data,
      back: false,
      style
    };
  },
  methods: {
    /**
     * 被按下时背景颜色显示
     */
    back_show() {
      this.back = true;
    },
    /**
     * 放开时背景颜色隐藏
     */
    back_hidden() {
      this.back = false;
    },
    /**
     * 点击
     */
    click() {
      this.$emit("click", this.info);
    },
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
        return chatTime.format("yyyy年MM月dd日 HH:mm:ss");
      }

      // 如果在同一年
      if (chatTime.getFullYear() == nowTime.getFullYear()) {
        // 如果在同一个月  否则返回格式：MM月dd日
        if (chatTime.getMonth() == nowTime.getMonth()) {
          if (chatTime.getDate() == nowTime.getDate() - 1) {
            return "昨天";
          }

          // 如果在同一星期
          if (chatTime.getIsSameWeek(nowTime)) {
            // 如果在同一天
            if (chatTime.getDay() == nowTime.getDay()) {
              return chatTime.format("HH:mm");
            } else {
              return chatTime.format("EE HH:mm");
            }
          } else {
            return chatTime.format("MM月dd日");
          }
        } else {
          return chatTime.format("MM月dd日");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item_back {
  background-color: #efefee;
}
.list-item_simple{
  .right {
    .top {
      height: 100% !important;
    }
  }
}
.list-item {
  display: flex;
  padding: 0 $uni-spacing-row-lg;
  height: 136rpx;
  font-family: PingFangSC-Regular;
  border-bottom: 1rpx $uni-border-color solid;

  .left {
    margin-right: $uni-spacing-row-lg;
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