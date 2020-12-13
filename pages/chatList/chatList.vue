<template>
  <view class="content" @click="$refs.more.$emit('hidden')">
    <chat-item
      v-for="(item, index) in chatList"
      :key="index"
      :data="item"
    />

    <!-- 右上角的菜单 -->
    <more ref="more" :data="more" />
  </view>
</template>

<script>
import chatItem from "./components/chat-item.vue";
import more from "@/components/more.vue";

export default {
  components: {
    "chat-item": chatItem,
    more,
  },
  name: "chatList",
  data() {
    return {
      chatList: [
        {
          picture: "",
          name: "测试",
          time: "2020-12-1 10:10:10",
          newMsg: "hello",
        },
      ],
      more: [
        {
          text: "发起群聊",
          to: {
            path: "",
          },
        },
        {
          text: "添加好友",
          to: {
            path: "",
          },
        },
      ],
    };
  },
  methods: {
    /**
     * 测试用方法
     */
    addMsgCount() {
      this.$store.commit("chatMessage/setNewMsgCount");

      this.setNavigationBarTitle();
    },
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
    if ("search" == e.types) {
      this.$refs.more.$emit("hidden");
    } else if ("more" == e.types) {
      this.$refs.more.$emit("toggle");
    }
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
