<template>
	<view class='chat'>
    <view class="message_list">
      fdsa
    </view>
    
    <!-- 发消息等操作 -->
    <view class="chat_operate">
      <view class="chat_operate_voice">
        <u-icon name="volume-up" size="50"></u-icon>
      </view>
      <view class="chat_operate_msg">
        <textarea class="msg_text" placeholder="请输入" confirm-type="send" />
      </view>
      <view class="chat_operate_send">
        <u-button type="success" size='mini' ripple>发送</u-button>
      </view>
      <view class="chat_operate_more">
        <view class="more_btn">
          <u-icon name="plus-circle" size="50"></u-icon>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
    onLoad(e){
      console.log(e)
    }
	}
</script>

<style lang="scss" scoped>
.chat{
  height: 100vh;
  display: flex;
  flex-direction: column;
  .message_list{
    flex: 1;
    background-color: #eeeeee;
  }
  .chat_operate{
    height: 85rpx;
    display: flex;
    align-items: center;
    border-top: solid 0.5rpx #555555;
    background-color: #eeeeee;
    [class^='chat_operate_']{
      width: 80rpx;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chat_operate_voice{
      width: 60rpx;
      margin-left: 10rpx;
    }
    .chat_operate_msg{
      flex: 1;
      padding: 10rpx;
      overflow: hidden;
      .msg_text{
        width: 100%;
        height: 70%;
        background-color: #ffffff;
        border-radius: 15rpx;
        padding: 10rpx;
      }
    }
    .chat_operate_send{
      width: 100rpx;
    }
    .chat_operate_more{
      width: 85rpx;
    }
  }
}
</style>