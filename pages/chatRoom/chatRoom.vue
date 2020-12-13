<template>
  <view class="chat">
    <div class="message_list" ref="mesList">
      <view
        class="message_item"
        v-for="(item, index) in messageList"
        :key="index"
        :id="'key-' + index"
      >
        <view
          class="message_item_time"
          v-if="interval(item.sendTime, index > 0 ? messageList[index - 1].sendTime : null)"
        >
          {{ item.sendTime | format }}
        </view>

        <message-item :msg="item" />
      </view>
    </div>

    <!-- 发消息等操作 -->
    <view class="chat_operate">
      <view class="chat_operate_voice"><u-icon name="volume-up" size="50"></u-icon></view>

      <view class="chat_operate_msg">
        <textarea v-model="message" class="msg_text" placeholder="请输入" confirm-type="send" />
      </view>

      <view class="chat_operate_send">
        <u-button @click="send" type="success" size="mini" ripple>发送</u-button>
      </view>

      <view class="chat_operate_more">
        <view class="more_btn"><u-icon name="plus-circle" size="50"></u-icon></view>
      </view>
    </view>
  </view>
</template>

<script>
import messageItem from './components/message-item.vue';
export default {
  components: {
    messageItem
  },
  data() {
    return {
      message: '',
      messageList: [
        {
          message: {
            url: '/static/mp3/1.mp3',
            size: 1,
          },
          type: 1,
          sendTime: '2020-12-2 10:11:11',
          master: {
            number: 1234567890,
            userName: '测试用户1',
            picture: ''
          }
        },
        {
          message: {
            url: '/static/mp3/2.mp3',
            size: 1,
          },
          type: 1,
          sendTime: '2020-12-2 10:09:10',
          master: {
            number: 1234567891,
            userName: '测试用户自己',
            picture: ''
          }
        },
        {
          message: `测试1fdasfdsafdsfvdsafdsaagrgfdsafd`,
          type: 0,
          sendTime: '2020-12-2 10:08:09',
          master: {
            number: 1234567892,
            userName: '测试用户1',
            picture: ''
          }
        },
        {
          message: `测试1fdasfdsafdsfvdsafdsaagrgfdsafd`,
          type: 0,
          sendTime: '2020-12-2 10:05:08',
          master: {
            number: 1234567892,
            userName: '测试用户1',
            picture: ''
          }
        },
        {
          message: `测试1fdasfdsafdsfvdsafdsaagrgfdsafd`,
          type: 0,
          sendTime: '2020-12-2 10:05:08',
          master: {
            number: 1234567892,
            userName: '测试用户1',
            picture: ''
          }
        },
        {
          message: `测试1fdasfdsafdsfvdsafdsaagrgfdsafd`,
          type: 0,
          sendTime: '2020-12-2 10:05:08',
          master: {
            number: 1234567892,
            userName: '测试用户1',
            picture: ''
          }
        },
        {
          message: `测试1fdasfdsafdsfvdsafdsaagrgfdsafd`,
          type: 0,
          sendTime: '2020-12-2 10:05:08',
          master: {
            number: 1234567892,
            userName: '测试用户1',
            picture: ''
          }
        },
        {
          message: `测试1fdasfdsafdsfvdsafdsaagrgfdsafd`,
          type: 0,
          sendTime: '2020-12-2 10:05:08',
          master: {
            number: 1234567892,
            userName: '测试用户1',
            picture: ''
          }
        }
      ]
    };
  },
  onLoad(e) {
    this.msgListDown();
    console.log(e);
  },
  updated() {
    this.$nextTick(function() {
      console.log(this.$refs.mesList.offsetHeight);
      // this.msgListDown();
    });
  },
  methods: {
    /**
     * 发送消息
     */
    send() {
      if (this.message == '') return;

      this.messageList.push({
        message: this.message,
        sendTime: new Date().format(),
        master: {
          number: 1234567891,
          userName: '测试用户自己',
          picture: ''
        }
      });

      this.msgListDown();
      this.message = '';
    },
    /**
     * 消息列表拉到最底
     */
    msgListDown() {},
    /**
     * 消息时间间隔
     */
    interval(one, two) {
      if (!two) return true;

      let oneTime = new Date(one).getTime(),
        twoTime = new Date(two).getTime(),
        interval = Math.abs(oneTime - twoTime);

      if (interval / 1000 / 60 > 3) {
        return true;
      } else {
        return false;
      }
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
            return '昨天 ' + chatTime.format('HH:mm');
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
            return chatTime.format('MM月dd日 HH:mm');
          }
        } else {
          return chatTime.format('MM月dd日 HH:mm');
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chat {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .message_list {
    flex: 1;
    overflow-y: auto;
    padding: 20rpx 0;
    background-color: #eeeeee;
    .message_item {
      margin-bottom: 50rpx;
      .message_item_time {
        text-align: center;
        font-size: 20rpx;
      }
    }
    .message_item:last-child {
      margin-bottom: 0;
    }
  }
  .chat_operate {
    height: 85rpx;
    display: flex;
    align-items: center;
    border-top: solid 0.5rpx #555555;
    background-color: #eeeeee;
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
    .chat_operate_more {
      width: 85rpx;
    }
  }
}
</style>
