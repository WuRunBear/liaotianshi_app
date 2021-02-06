<template>
  <view>
    <view class="addFriend">
      <!-- 背景 -->
      <view
        class="bg"
        :style="{
          backgroundImage: `url('${
            userInfo.avatar ? userInfo.avatar : defaultBg
          }')`,
        }"
      ></view>

      <!-- 内容 -->
      <view class="content">
        <u-avatar
          class="avatar"
          :src="userInfo.avatar"
          :size="180"
          show-sex
          :sex-icon="userInfo.sex ? 'man' : 'woman'"
        />

        <view class="name">{{ userInfo.name }} </view>

        <u-form-item label="备注">
          <u-input v-model="form.alias" />
        </u-form-item>

        <u-form-item label="留言" label-position="top">
          <u-input v-model="form.msg" />
        </u-form-item>
      </view>

      <view class="operate">
        <u-button class="operate-btn" ripple type="default" @click="cancel">取消</u-button>
        <u-button class="operate-btn" ripple type="success" @click="addFriend">添加好友</u-button>
      </view>
    </view>
  </view>
</template>

<script>
import logo from "@/static/logo@3x.png";
export default {
  name: "addFriend",
  data() {
    return {
      defaultBg: logo,
      userInfo: {},
      form: {
        alias: "",
        msg: "",
      },
    };
  },
  methods: {
    addFriend() {
      uni.showToast({
        title: "点击添加好友",
      });
    },
    cancel() {
      uni.showToast({
        title: "点击取消",
      });
    },
  },
  onLoad(e) {
    uni.$once("addFriend", (e) => {
      this.userInfo = e.userInfo;
    });
  },
};
</script>

<style lang="scss" scoped>
.addFriend {
  height: 100vh;
  position: relative;
  .bg {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-size: 100%;
    background-repeat: no-repeat;
    filter: blur(20rpx);
  }

  .content {
    width: 100vw;
    min-height: 75vh;
    background-color: white;
    border-radius: 50rpx 50rpx 0 0;
    box-shadow: 0 -20rpx 20rpx $uni-text-color-shadow;
    position: relative;
    top: 25vh;
    padding: 0 $uni-spacing-row-lg;
    padding-top: 140rpx;

    .avatar {
      box-shadow: 0 18rpx 20rpx $uni-text-color-shadow;
      border: solid 3rpx white;
      position: absolute;
      top: -7vh;
    }

    .name {
      font-size: 26px;
    }
  }

  .operate {
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 0;
    padding: 0 $uni-spacing-row-lg;
    margin-bottom: $uni-spacing-row-sm;
    .operate-btn:first-child {
      flex: 3;
    }

    .operate-btn:last-child {
      flex: 7;
      margin-left: $uni-spacing-row-lg;
    }
  }
}
</style>