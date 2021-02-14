<template>
  <view>
    <view class="user">
      <view class="user-avatar">
        <u-avatar
          class="avatar"
          :size="180"
          show-sex
          :sex-icon="userInfo.sex ? 'man' : 'woman'"
          :src="userInfo.avatar"
          shape="circle"
        />
      </view>

      <view class="user-info">
        <user-info-item title="昵称：" :content="userInfo.name" />
        <user-info-item isCopy title="账号：" :content="userInfo.number" />
        <user-info-item title="签名：" :content="userInfo.signature" />
        <user-info-item isCopy title="地址：" :content="userInfo.address" />
      </view>

      <view class="user-operate">
        <!-- 不是好友 -->
        <view v-if="!userInfo.isFriend && !userInfo.isSelf">
          <u-button ripple type="success" @click="addFriend">添加好友</u-button>
        </view>
        <!-- 是好友 -->
        <view v-if="userInfo.isSelf || userInfo.isFriend">
          <u-button ripple type="success" @click="send">发送消息</u-button>
          <u-button
            v-if="!userInfo.isSelf"
            ripple
            type="error"
            @click="delFriend"
            >删除好友</u-button
          >
        </view>
      </view>
    </view>

    <!-- 模态框 -->
    <u-modal
      v-model="modalShow"
      content="确定删除吗？"
      show-cancel-button
      @confirm="modalConfirm"
    ></u-modal>
  </view>
</template>

<script>
import userInfoItem from "./components/user-info-item";

export default {
  name: "user-detail",
  components: {
    userInfoItem,
  },
  data() {
    return {
      number: null,
      userInfo: {
        name: "测试用户",
        number: 1234567811,
        avatar: "https://t7.baidu.com/it/u=2387439597,1787872516&fm=193&f=GIF",
        signature: "",
        address: "",
        sex: true,
        isSelf: false,
        isFriend: false,
      },
      modalShow: false,
    };
  },
  methods: {
    addFriend() {
      this.toPage("navigateTo", {
        url: "/pages/addFriend/addFriend",
        success: () => {
          uni.$emit("addFriend", { userInfo: this.userInfo });
        },
      });
    },
    send() {},
    delFriend() {
      this.modalShow = true;
    },
    modalConfirm() {},
  },
  onLoad(e = {}) {
    this.number = e.number && e.number;

    uni.setNavigationBarTitle({
      title: this.userInfo.name,
    });
  },
};
</script>

<style lang="scss" scoped>
.user {
  .user-avatar {
    width: 100%;
    height: 250rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .avatar {
      box-shadow: 0rpx 15rpx 18rpx 0 $uni-text-color-shadow;
    }
  }

  .user-operate {
    margin: $uni-spacing-col-lg 0;
    > view > * {
      margin-top: $uni-spacing-col-base;
    }
  }
}
</style>