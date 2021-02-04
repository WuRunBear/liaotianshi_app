<template>
  <view>
    <!-- 其他 -->
    <view class="more">
      <friend-item
        :data="{
          title: '新的好友',
        }"
      />

      <friend-item
        :data="{
          title: '群',
        }"
      />
    </view>
    <!-- 间隔槽 -->
    <u-gap height="50" bg-color="#cfcfcf"></u-gap>
    <!-- 好友列表 -->
    <view class="friend_list">
      <u-index-list :stick="false" :index-list="indexList">
        <view v-for="(item, index) in friendList" :key="index">
          <u-index-anchor :index="item.key" />
          <friend-item
            v-for="(child, i) in item.childs"
            :key="i"
            :data="child"
          />
        </view>
      </u-index-list>
    </view>

    <!-- 右上角的菜单 -->
    <more ref="more" />
  </view>
</template>

<script>
import friendItem from "./components/friend-item.vue";
export default {
  name: "friendList",
  components: {
    friendItem,
  },
  data() {
    return {
      friendList: [
        {
          key: "A",
          childs: [
            {
              number: 1234567801,
              title: "测试",
            },
          ],
        },
        {
          key: "B",
          childs: [
            {
              number: 1234567802,
              title: "测试",
            },
          ],
        },
        {
          key: "C",
          childs: [
            {
              number: 1234567803,
              title: "测试",
            },
          ],
        },
        {
          key: "D",
          childs: [
            {
              number: 1234567804,
              title: "测试",
            },
          ],
        },
        {
          key: "E",
          childs: [
            {
              number: 1234567805,
              title: "测试",
            },
          ],
        },
        {
          key: "F",
          childs: [
            {
              number: 1234567806,
              title: "测试",
            },
          ],
        },
        {
          key: "G",
          childs: [
            {
              number: 1234567807,
              title: "测试",
            },
          ],
        },
        {
          key: "H",
          childs: [
            {
              number: 1234567808,
              title: "测试",
            },
          ],
        },
        {
          key: "I",
          childs: [
            {
              number: 1234567809,
              title: "测试",
            },
          ],
        },
        {
          key: "J",
          childs: [
            {
              number: 1234567810,
              title: "测试",
            },
          ],
        },
        {
          key: "#",
          childs: [
            {
              number: 1234567811,
              title: "测试",
            },
          ],
        },
      ],
    };
  },
  computed: {
    indexList() {
      let indexList = [];
      this.friendList.forEach((element) => {
        indexList.push(element.key);
      });
      return indexList;
    },
  },
  methods: {},
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
</style>
