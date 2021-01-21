<template>
  <view>
    <!-- 其他 -->
    <view class="more">
        <friend-item
          :data='{
            title: "新的好友"
          }'
        />

        <friend-item
          :data='{
            title: "群"
          }'
        />
    </view>
    <!-- 间隔槽 -->
    <u-gap height="50" bg-color="#cfcfcf"></u-gap>
    <!-- 好友列表 -->
    <view class="friend_list">
      <u-index-list :stick='false'>
        <view
          v-for="(item, index) in friendList"
          :key='index'
        >
          <u-index-anchor :index="item.key" />
          <friend-item
            v-for="(child, i) in item.childs"
            :key='i'
            :data='child'
          />
        </view>
      </u-index-list>
    </view>

    <!-- 右上角的菜单 -->
    <more ref="more" />
  </view>
</template>

<script>
import friendItem from './components/friend_item.vue'
export default {
  name: 'friendList',
  components: {
    friendItem,
  },
  data() {
    return {
      friendList: [
        {
          key: 'A',
          childs: [
            {
              title: "测试"
            },
            {
              title: "测试"
            },
            {
              title: "测试"
            },
            {
              title: "测试"
            },
            {
              title: "测试"
            },
            {
              title: "测试"
            },
            {
              title: "测试"
            },
            {
              title: "测试"
            },
            {
              title: "测试"
            },
            {
              title: "测试"
            },
            {
              title: "测试"
            },
            {
              title: "测试"
            },
            {
              title: "测试"
            },
          ]
        }
      ]
    };
  },
  methods: {
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
  
</style>
