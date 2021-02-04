<template>
  <view>
    <view class="user-info-item">
      <view class="user-info-item-title"> {{ title }}</view>

      <view class="user-info-item-content">
        {{ content }}
      </view>

      <view v-if="isCopy" class="user-info-item-copy">
        <u-icon
          custom-prefix="HChat_icon"
          @click="copy(content)"
          name="copy"
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "user-info-item",
  props: {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String|Number,
      default: "",
    },
    isCopy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods:{
    copy(data){
      this.clipboard({
        data
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-info-item {
  width: 100%;
  height: 78rpx;
  line-height: 70rpx;
  font-size: 32rpx;
  letter-spacing: -0.55px;
  display: flex;
  border-bottom: solid 1rpx #eeeeee;
  .user-info-item-title {
    color: #272832;
    text-align: center;
    width: 140rpx;
  }

  .user-info-item-content {
    color: rgba(39,40,50,0.60);
    flex: 1;
  }

  .user-info-item-copy{
    width: 90rpx;
    text-align: center;
  }
}
</style>