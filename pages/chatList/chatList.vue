<template>
  <view class="content">
    <list-item
      v-for="(item, index) in chatList"
      :key="index"
      :data="item"
      @click="toBVue({ path: '/pages/chatRoom/chatRoom?room_id=123456' })"
    />

    <!-- 右上角的菜单 -->
    <more ref="more" />
  </view>
</template>

<script>
export default {
  name: "chatList",
  data() {
    return {
      chatList: [
        {
          avatar: "",
          name: "测试",
          time: "2020-12-1 10:10:10",
          newMsg: "hello",
        },
      ],
    };
  },
  methods: {
    /**
     * 设置顶部导航栏
     */
    setNavigationBarTitle() {
      uni.setNavigationBarTitle({
        title: this.newMsgCount ? "消息(" + this.newMsgCount + ")" : "消息",
      });
    },
    /**
     * 为 tabBar 消息的右上角添加文本。
     */
    setTabBarBadge(index = 0, text = 0) {
      if ("number" != typeof index) return;

      if (text > 0) {
        uni.setTabBarBadge({
          index,
          text: text.toString(),
        });
      } else {
        uni.removeTabBarBadge({
          index,
        });
      }
    },
    /**
     * 跳转
     */
    toBVue(to) {
      this.toPage("navigateTo", {
        url: to.path,
      });
    },
  },
  computed: {
    newMsgCount: function () {
      return this.$store.getters["chatMessage/getNewMsgCount"];
    },
  },
  watch: {
    newMsgCount: function (newV, oldV) {
      this.setTabBarBadge(0, newV.toString());
    },
  },
  onReady() {
    this.setNavigationBarTitle();

    this.setTabBarBadge(0, this.newMsgCount.toString());
  },
  onShow() {
    this.setNavigationBarTitle();
  },
  /**
   * 点击顶部右侧按钮
   */
  onNavigationBarButtonTap(e) {
    switch (e.fun) {
      case "search":
        this.toPage("navigateTo", {
          url: "/pages/search/search",
        });
        break;
      case "more":
        this.$refs.more.$emit("toggle");
        return;
    }

    this.$refs.more.$emit("hidden");
  },
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}
</style>
