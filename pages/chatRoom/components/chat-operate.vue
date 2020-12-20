<template>
  <view>
    <view class="chat_operate_mask" v-show="is_operateBottom" @click="is_operateBottom = false" />
    <view
      class="chat_operate"
      :class="{
        chat_operate_open: is_operateBottom
      }"
      @transitionend="
        () => {
          this.$emit('changeHeight');
        }
      "
    >
      <view class="chat_operate_top">
        <view class="chat_operate_voice"><u-icon name="volume-up" size="50"></u-icon></view>

        <view class="chat_operate_msg">
          <textarea
            v-model="message"
            @click="is_operateBottom = false"
            class="msg_text"
            placeholder="请输入"
            confirm-type="send"
          />
        </view>

        <view class="chat_operate_meme">
          <u-icon
            custom-prefix="HChat_icon"
            @click="toggleOperateBottomType(2)"
            name="smile"
            size="50"
          />
        </view>

        <view>
          <view class="chat_operate_send" v-show="message != ''">
            <u-button @click="send" type="success" size="mini" ripple>发送</u-button>
          </view>

          <view class="chat_operate_more_btn" v-show="message == ''">
            <u-icon @click="toggleOperateBottomType(1)" name="plus-circle" size="50"></u-icon>
          </view>
        </view>
      </view>

      <view class="chat_operate_bottom" v-show="is_operateBottom">
        <view class="chat_operate_more" v-show="operateBottomType == 1">
          <view
            v-for="(item, index) in chatOperateMoreList"
            :key="index"
            @click="item.fun ? item.fun : function() {}"
            class="chat_operate_more_item"
          >
            <u-icon
              class="chat_operate_more_item_icon"
              custom-prefix="HChat_icon"
              :name="item.icon"
              size="60"
            ></u-icon>
            <text class="chat_operate_more_item_text">{{ item.title }}</text>
          </view>
        </view>
        <view class="chat_operate_meme" v-show="operateBottomType == 2">fds</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'chat-operate',
  data() {
    return {
      message: '',
      chatOperateMoreList: [
        {
          title: '图片',
          icon: 'picture',
          fun: null
        },
        {
          title: '视频',
          icon: 'video',
          fun: null
        },
        {
          title: '文件',
          icon: 'file-open',
          fun: null
        },
        {
          title: '位置',
          icon: 'map',
          fun: null
        }
      ],
      is_operateBottom: false,
      operateBottomType: 1 //更多操作的类型 1：图片、文件等，2：表情包
    };
  },
  methods: {
    /**
     * 发送消息
     */
    send() {
      if (this.message == '') return;

      this.$emit('send', this.mssage);

      this.message = '';
    },
    /**
     * 切换底部显示的东西  表情包等
     */
    toggleOperateBottomType(i) {
      // 如果点击的是当前显示的就关闭
      if (this.is_operateBottom && this.operateBottomType == i) {
        this.is_operateBottom = false;
        return;
      }

      this.is_operateBottom = true;
      this.operateBottomType = i;
    }
  }
};
</script>

<style lang="scss" scoped>
.chat_operate_mask{
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9;
}
.chat_operate {
  height: 85rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  // align-items: center;
  border-top: solid 0.5rpx #555555;
  background-color: #eeeeee;
  transition: height 0.3s;
  .chat_operate_top {
    width: 100%;
    height: 85rpx;
    display: flex;
    align-items: center;
    [class^='chat_operate_'] {
      width: 80rpx;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chat_operate_voice {
      width: 60rpx;
      margin-left: 10rpx;
    }
    .chat_operate_msg {
      flex: 1;
      padding: 10rpx;
      overflow: hidden;
      .msg_text {
        width: 100%;
        height: 70%;
        background-color: #ffffff;
        border-radius: 15rpx;
        padding: 10rpx;
      }
    }
    .chat_operate_send {
      width: 100rpx;
    }
    .chat_operate_more_btn {
      width: 85rpx;
    }
  }
}
.chat_operate_open {
  position: relative;
  z-index: 10;
  height: 400rpx;
  .chat_operate_bottom {
    flex: 1;
    display: flex;
    align-content: space-around;
    justify-content: center;
    .chat_operate_more {
      max-width: 600rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .chat_operate_more_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .chat_operate_more_item_icon {
          width: 100rpx;
          height: 100rpx;
          background-color: #ffffff;
          border-radius: 30rpx;
          margin: 0 20rpx;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat_operate_more_item_text {
          margin-top: 10rpx;
        }
      }
    }
    .chat_operate_meme {
      flex: 1;
    }
  }
}
</style>
