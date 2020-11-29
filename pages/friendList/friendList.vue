<template>
  <view>
    通讯录

    <u-button type="default" @click="addMsgCount">add</u-button>
  </view>
</template>

<script>
export default {
  name: 'friendList',
  data() {
    return {};
  },
  methods: {
    addMsgCount() {
      this.$store.commit('chatMessage/setNewMsgCount', 321);
    }
  }
};
</script>

<style lang="scss"></style>
