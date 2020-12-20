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

        <!-- 文字 -->
        <view
          @click="msgClick(msg.message, msg.type)"
          class="user_message"
          v-if="!msg.type || msg.type == 0"
        >
          {{ msg.message }}
        </view>
        <!-- 语音 -->
        <view
          @click="msgClick(msg.message, msg.type)"
          class="user_message user_voice"
          :style="{
            width: msg.message.size * 15 + 'rpx'
          }"
          v-else-if="msg.type == 1"
        >
          <!-- 未播放 -->
          <u-icon name="volume" size="40" v-show="!voicePlaying" />
          <!-- 播放中 -->
          <u-icon name="volume-fill" size="40" v-show="voicePlaying" />
          <!-- 时间 -->
          <view class="user_voice_time">{{ msg.message.size }}"</view>
        </view>
        <!-- 图片 -->
        <view
          @click="msgClick(msg.message, msg.type)"
          class="user_message"
          v-else-if="msg.type == 2"
        >
          {{ msg.message }}
        </view>
        <!-- 视频 -->
        <view
          @click="msgClick(msg.message, msg.type)"
          class="user_message"
          v-else-if="msg.type == 3"
        >
          {{ msg.message }}
        </view>
        <!-- 文件 -->
        <!-- <view
          @click="msgClick(msg.message, msg.type)"
          class="user_message"
          v-if="msg.type == 4"
        >
          {{ msg.message }}
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'message-item',
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
      },
      voicePlaying: false,
      audio: null
    };
  },
  computed: {
    ...mapState({
      playing_audio: state => state.chatRoom.playing_audio
    })
  },
  created() {
    // this.init();
  },
  methods: {
    msgClick(obj, type) {
      if (type == 0) {
        // 文字
        console.log(type, obj);
      } else if (type == 1) {
        // 语音
        // 播放语音
        this.toggleVoicePlay();
      } else if (type == 2) {
        // 图片
        console.log(type, obj);
      } else if (type == 3) {
        // 视频
        console.log(type, obj);
      } else if (type == 4) {
        // 文件
        console.log(type, obj);
      }
    },
    /**
     * 初始化
     */
    init() {
      if (this.msg.type == 1) {
      }
    },
    createAudio() {
      this.audio = this.createInnerAudioContext({
        src: this.msg.message.url,
        onPlay: () => {
          this.voicePlaying = true;
        },
        onStop: () => {
          // 停止播放 更改状态并销毁实列
          this.delVoicePlay();
        },
        onEnded: () => {
          // 播放完毕 更改状态并销毁实列
          this.delVoicePlay();
        }
      });
    },
    delVoicePlay() {
      this.voicePlaying = false;
      console.log(1)
      if(this.playing_audio.id == this.audio.id){
        this.$store.commit('chatRoom/delPlaying_audio'); // 清除vuex中正在播放的实列
      }
      this.audio.destroy();
      this.audio = null;
    },
    /**
     * 播放语音
     */
    toggleVoicePlay() {
      if (!this.audio) {
        this.createAudio();
      }

      if (this.voicePlaying) {
        // 如果正在播放中
        this.audio.stop(); // 停止播放
      } else {
        // 不在播放中
        if (this.playing_audio) {
          // 如果正在播放其他语音 并且不是新的要播放的就停掉
          this.playing_audio.stop(); // 停止
        }
        this.$store.commit('chatRoom/setPlaying_audio', this.audio); // 更改正在播放的语音
        this.audio.play(); // 开始播放
      }
    }
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
    .user_voice {
      max-width: 494rpx;
      min-width: 140rpx;
      display: flex;
      align-items: center;

      &_time {
        margin-left: 20rpx;
      }
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
      background-color: #19be6b;
    }
  }
}
</style>
