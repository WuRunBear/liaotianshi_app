<template>
  <view>
    <view class="search">
      <!-- 搜索框 -->
      <view class="search-box">
        <u-search
          v-model.lazy.trim="searchObj.text"
          @custom="search(true)"
          @search="search(true)"
        />
      </view>

      <!-- 结果列表 -->
      <list
        id="userList"
        title="用户"
        :is-status="userList.list.length > 0"
        :height="userListHeight"
        v-model="userList.loading"
        :finished="userList.finished"
        default-text="点击加载更多"
        @click-status="clickStatus($event, 'userList')"
      >
        <list-item
          v-for="(item, index) in userList.list"
          :key="index"
          :data="item"
          @click="to"
          simple
        />
      </list>

      <!-- 结果列表 -->
      <list
        id="groupList"
        title="群组"
        :is-status="groupList.list.length > 0"
        :height="groupListHeight"
        v-model="groupList.loading"
        :finished="groupList.finished"
        default-text="点击加载更多"
        @click-status="clickStatus($event, 'groupList')"
      >
        <list-item
          v-for="(item, index) in groupList.list"
          :key="index"
          :data="item"
          @click="to"
          simple
        />
      </list>
    </view>
  </view>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      searchObj: {
        // 搜索对象
        text: "",
        mode: 1, // 模式 1：user, 2：group
      },
      userList: {
        list: [],
        loading: false,
        finished: false,
      },
      groupList: {
        list: [],
        loading: false,
        finished: false,
      },
      userListHeight: "auto",
      groupListHeight: "auto",
    };
  },
  methods: {
    to(e) {
      this.toPage("navigateTo", {
        url: "/pages/addFriend/addFriend",
        success: () => {
          uni.$emit("addFriend", { userInfo: e });
        },
      });
    },
    clickStatus(t, type) {
      if ("default" == t) {
        "userList" == type && (this.searchObj.mode = 1);
        "groupList" == type && (this.searchObj.mode = 2);

        this.search(false);
      }
    },
    search(all) {
      if("" == this.searchObj.text) {
        return false;
      }

      if (all) {
        this.userList.list = [];
        this.userList.finished = false;
        this.groupList.list = [];
        this.groupList.finished = false;
      }

      if (this.searchObj.mode == 1 || all) {
        this.userList.loading = true;
      }
      if (this.searchObj.mode == 2 || all) {
        this.groupList.loading = true;
      }

      // 测试用
      setTimeout(() => {
        let userList = [];
        let groupList = [];
        for (let i = 0; i < 5; i++) {
          if (this.searchObj.mode == 1 || all) {
            userList.push({
              name: "测试用户" + Math.random(),
              number: 1234567891,
              avatar: "",
            });
          }
          if (this.searchObj.mode == 2 || all) {
            groupList.push({
              name: "测试群组" + Math.random(),
              number: 1234567891,
              avatar: "",
            });
          }
        }
        if (this.searchObj.mode == 1 || all) {
          this.userList.list = all
            ? userList
            : [...this.userList.list, ...userList];
          this.userList.loading = false;
        }
        if (this.searchObj.mode == 2 || all) {
          this.groupList.list = all
            ? groupList
            : [...this.groupList.list, ...groupList];
          this.groupList.loading = false;
        }
      }, 3000);
    },
    changeHeight(id) {
      let path = `#${id} .list .uni-scroll-view-content`;
      uni
        .createSelectorQuery()
        .in(this)
        .select(`${path} uni-view`)
        .boundingClientRect((viewData) => {
          uni
            .createSelectorQuery()
            .in(this)
            .select(`${path} .status`)
            .boundingClientRect((statusData) => {
              console.log(statusData.height);
              let h =
                viewData.height * this[id].list.length + statusData.height;
              this[`${id}Height`] = h + "px";
            })
            .exec();
        })
        .exec();
    },
  },
  watch: {
    userList: {
      deep: true,
      handler: function () {
        this.$nextTick(() => {
          this.changeHeight("userList");
        });
      },
    },
    groupList: {
      deep: true,
      handler: function () {
        this.$nextTick(() => {
          this.changeHeight("groupList");
        });
      },
    },
  },
  onShow() {},
};
</script>

<style lang="scss" scoped>
.search {
  height: 100vh;
  .search-box {
    padding: $uni-spacing-col-lg $uni-spacing-col-base;
  }

  #userList,
  #groupList {
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
  }
}
</style>