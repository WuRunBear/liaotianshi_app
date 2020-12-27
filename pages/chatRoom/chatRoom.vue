<template>
  <view class="chat">
    <scroll-view
      scroll-y
      :scroll-top="scrollTop"
      id="message_list"
      class="message_list"
      ref="mesList"
    >
      <view id="message_list_container" class="message_list_container">
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
      </view>
    </scroll-view>

    <!-- 发消息等操作 -->
    <chat-operate @send="send" @changeHeight="msgListDown" />
  </view>
</template>

<script>
import messageItem from './components/message-item.vue';
import chatOperate from './components/chat-operate.vue';
import { mapState } from 'vuex';
export default {
  components: {
    messageItem,
    chatOperate
  },
  data() {
    return {
      scrollTop: 0,
      messageList: [
        {
          id: 1,
          message: {
            url: '/static/mp3/1.mp3',
            size: 15
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
          id: 2,
          message: {
            url: '/static/mp3/2.mp3',
            size: 1
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
          id: 3,
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
          id: 4,
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
          id: 5,
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
          id: 6,
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
          id: 7,
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
          id: 8,
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
  computed: {
    ...mapState({
      playing_audio: state => state.chatRoom.playing_audio
    })
  },
  onLoad(e) {
    uni.onWindowResize((res) => {
      this.msgListDown();
    });
    this.msgListDown();
  },
  onHide() {
    this.playing_audio && this.playing_audio.stop(); // 停止播放
  },
  onUnload() {
    this.playing_audio && this.playing_audio.stop(); // 停止播放
  },
  methods: {
    /**
     * 发送消息
     */
    send() {
      this.messageList.push({
        message: this.message,
        type: 0,
        sendTime: new Date().format(),
        master: {
          number: 1234567891,
          userName: '测试用户自己',
          picture: ''
        }
      });

      this.msgListDown();
    },
    /**
     * 消息列表拉到最底
     */
    msgListDown() {
      this.$nextTick(() => {
        let that = this;
        let query = uni.createSelectorQuery();
        query.select('#message_list').boundingClientRect();
        query.select('#message_list_container').boundingClientRect();
        query.exec(res => {
          if (res[1].height > res[0].height) {
            that.scrollTop = res[1].height - res[0].height;
          }
        });
      });
    },
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
    overflow: hidden;
    background-color: #eeeeee;
    .message_list_container {
      padding: 20rpx 0;
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
  }
}
</style>
