<template>
  <view>
    <!-- 其他 -->
    <view class="other">
      <list-item
        :data="{
          name: '新的好友',
          avatar: ''
        }"
        simple
      />

      <list-item
        :data="{
          name: '群',
          avatar: ''
        }"
        simple
      />
    </view>
    <!-- 间隔槽 -->
    <u-gap height="30" bg-color="#cfcfcf"></u-gap>
    <!-- 好友列表 -->
    <view class="friend_list">
      <u-index-list :stick="false" :index-list="indexList">
        <view v-for="(item, index) in friendList" :key="index">
          <u-index-anchor :index="item.key" />
          <list-item
            v-for="(child, i) in item.childs"
            :key="i"
            :data="child"
            @click="toBVue"
            height="110"
            simple
          />
        </view>
      </u-index-list>
    </view>

    <!-- 右上角的菜单 -->
    <more ref="more" />
  </view>
</template>

<script>
export default {
  name: "friendList",
  data() {
    return {
      friendList: [
        {
          key: "A",
          childs: [
            {
              number: 1234567801,
              name: "测试",
              avatar: ""
            },
          ],
        },
        {
          key: "B",
          childs: [
            {
              number: 1234567802,
              name: "测试",
              avatar: ""
            },
          ],
        },
        {
          key: "C",
          childs: [
            {
              number: 1234567803,
              name: "测试",
              avatar: ""
            },
          ],
        },
        {
          key: "D",
          childs: [
            {
              number: 1234567804,
              name: "测试",
              avatar: ""
            },
          ],
        },
        {
          key: "E",
          childs: [
            {
              number: 1234567805,
              name: "测试",
              avatar: ""
            },
          ],
        },
        {
          key: "F",
          childs: [
            {
              number: 1234567806,
              name: "测试",
              avatar: ""
            },
          ],
        },
        {
          key: "G",
          childs: [
            {
              number: 1234567807,
              name: "测试",
              avatar: ""
            },
          ],
        },
        {
          key: "H",
          childs: [
            {
              number: 1234567808,
              name: "测试",
              avatar: ""
            },
          ],
        },
        {
          key: "I",
          childs: [
            {
              number: 1234567809,
              name: "测试",
              avatar: ""
            },
          ],
        },
        {
          key: "J",
          childs: [
            {
              number: 1234567810,
              name: "测试",
              avatar: ""
            },
          ],
        },
        {
          key: "#",
          childs: [
            {
              number: 1234567811,
              name: "测试",
              avatar: ""
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
  methods: {
    /**
     * 跳转
     */
    toBVue(e) {
      this.toPage("navigateTo", {
        url: "/pages/userDetail/userDetail",
        success: function() {
          uni.$emit("userDetail", {
            number: e.number,
            userInfo: e,
          });
        },
      });
    },
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
</style>
