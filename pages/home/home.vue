<template>
  <view class="content">
    <view
      class="tabs"
      :style="{ width: '300%', transform: 'translateX(-' + current * ((1 / 3) * 100) + '%)' }"
    >
      <chatList class="tab-item" />

      <friendList class="tab-item" />

      <my class="tab-item" />
    </view>

    <u-tabbar
      v-model="current"
      :list="list"
      active-color="#42b983"
      inactive-color="#333333"
      icon-size="35rpx"
      @change="tabbarChange"
    ></u-tabbar>
  </view>
</template>

<script>
import my from '@/pages/my/my';
import friendList from '@/pages/friendList/friendList';
import chatList from '@/pages/chatList/chatList';

export default {
  components: {
    chatList,
    friendList,
    my
  },
  data() {
    return {
      list: [
        {
          iconPath: 'bubble-o',
          selectedIconPath: 'bubble',
          text: '消息',
          count: 99,
          isDot: false,
          customIcon: false,
          path: '/pages/chatList/chatList'
          // pagePath: '/pages/chatList/chatList'
        },
        {
          iconPath: 'address-book-o',
          selectedIconPath: 'address-book',
          text: '通讯录',
          count: 0,
          isDot: true,
          customIcon: false,
          path: '/pages/friendList/friendList'
          // pagePath: '/pages/friendList/friendList'
        },
        {
          iconPath: 'user-o',
          selectedIconPath: 'user',
          text: '我的',
          count: 0,
          isDot: false,
          customIcon: false,
          path: '/pages/my/my'
          // pagePath: '/pages/my/my'
        }
      ],
      current: 0
    };
  },
  methods: {
    tabbarChange(index) {
      this.setNav(index);
    },
    setNav(index) {
      switch (index) {
        case 0:
          this.chatListNav();
          break;
        case 1:
          this.friendListNav();
          break;
        case 2:
          this.myNav();
          break;
        default:
          break;
      }
    },
    chatListNav() {
      uni.setNavigationBarTitle({
        title: this.list[0].count > 0 ? '消息(' + this.list[0].count + ')' : '消息'
      });
      
    },
    friendListNav() {
      uni.setNavigationBarTitle({
        title: '通讯录'
      });
    },
    myNav() {
      uni.setNavigationBarTitle({
        title: ' '
      });
      plus.navigator.hideSystemNavigation();
    }
  },
  onReady() {
    this.setNav(this.current);
  },
  onShow() {
    this.setNav(this.current);
  }
};
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  .tabs {
    display: flex;
    transition: transform 0.5s;
    .tab-item {
      width: 100%;
    }
  }
}
</style>
