<template>
  <view v-show="more_show">
    <view class="mask" @click="hidden"></view>

    <view class="more">
      <view
        v-for="(item, index) in data"
        :key="index"
        class="more_item"
        :class="{ more_item_actice: more_item_index == index }"
        @click="itemClick(item.to)"
        @touchstart="more_item_index = index"
        @touchcancel="more_item_index = null"
        @touchend="more_item_index = null"
      >
        {{ item.text }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [
          {
            text: "发起群聊",
            to: {
              path: "",
            },
          },
          {
            text: "添加好友",
            to: {
              path: "/pages/search/search",
            },
          },
        ];
      },
    },
  },
  data() {
    return {
      more_item_index: null,
      more_show: false,
    };
  },
  methods: {
    itemClick(to) {
      this.toPage(to.fun, {
        url: to.path,
      });
    },
    show() {
      this.more_show = true;
    },
    hidden() {
      this.more_show = false;
    },
    toggle() {
      this.more_show = !this.more_show;
    },
  },
  created() {
    this.$on("show", this.show);
    this.$on("hidden", this.hidden);
    this.$on("toggle", this.toggle);
  },
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}

.more {
  top: 20rpx;
  right: 30rpx;
  position: fixed;
  border-radius: 10rpx;
  background-color: #ffffff;
  box-shadow: 4rpx 4rpx 10rpx rgba($color: #000000, $alpha: 0.5);
  z-index: 99;
  .more_item {
    width: 200rpx;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .more_item_actice {
    background-color: #c3c3c3;
  }
  .more_item:not(:last-child) {
    border-bottom: solid 1rpx #000000;
  }
}
</style>
