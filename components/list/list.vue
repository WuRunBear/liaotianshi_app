<template>
  <view>
    <view class="title" @click="list_show = !list_show">
      <text>{{ title }}</text>
      <u-icon :name="list_show ? 'arrow-up' : 'arrow-down'" />
    </view>

    <scroll-view
      class="list"
      :style="{ ...style }"
      scroll-y
      @scrolltolower="load"
    >
      <slot />

      <view
        v-show="isStatus || value || finished || error"
        class="status"
        @click="$emit('click-status', status.type)"
      >
        <u-line :hair-line="false" />
        <view class="content">
          <u-loading v-if="status.loading" />
          <text>{{ status.text }}</text>
        </view>
        <u-line :hair-line="false" />
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: "list",
  props: {
    title: {
      type: String,
      default: "",
    },
    height: {
      type: Number | String,
      default: "",
    },
    isStatus: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: "加载中",
    },
    finishedText: {
      type: String,
      default: "没有更多了",
    },
    errorText: {
      type: String,
      default: "搜索失败，请重试",
    },
    defaultText: {
      type: String,
      default: "...",
    },
    scrollY: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      listHeight: this.height,
      list_show: true,
    };
  },
  watch: {
    height: function (newV) {
      this.listHeight = newV;
    },
  },
  computed: {
    status() {
      if (this.value) {
        return {
          loading: true,
          type: "loading",
          text: this.loadingText,
        };
      }
      if (this.finished) {
        return {
          type: "finished",
          text: this.finishedText,
        };
      }
      if (this.error) {
        return {
          type: "error",
          text: this.errorText,
        };
      }
      return {
        type: "default",
        text: this.defaultText,
      };
    },
    style() {
      let style = {};
      if (this.listHeight && this.list_show) {
        style.height = this.listHeight;
        if ("number" == this.listHeight) {
          style.height += "rpx";
        }
      }
      if (!this.list_show) {
        style.height = 0;
      }

      return style;
    },
  },
  methods: {
    load(e) {
      // 触发v-model的input事件
      this.$emit("input", true);
      // 触发搜索事件
      this.$emit("load", true);
      console.log("触发搜索");
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 100rpx;
  display: flex;
  align-items: center;
  padding: 0 $uni-spacing-row-lg;
  border-bottom: 1rpx $uni-border-color solid;
  text {
    flex: 1;
    color: $uni-color-title;
    font-size: $uni-font-size-title;
    font-weight: bold;
  }
}

.list {
  width: 100%;
  height: 100vh;
  transition: height 0.5s;
}

.status {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 55rpx;
  height: 55rpx;
  .u-line {
    flex: 1;
  }
  .content {
    margin: 0 $uni-spacing-row-sm;
    .u-loading {
      margin-right: $uni-spacing-row-sm;
    }
  }
}
</style>
