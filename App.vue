<script>
export default {
  onLaunch: function() {
    console.log('App Launch');

    // #ifdef APP-PLUS
    let userinfo = uni.getStorageSync('userInfo');
    //判断是否存在登录信息
    if (!userinfo.auto_login) {
      //不存在则跳转登录页
      this.toPage("reLaunch", {
        url: '/pages/login/login',
        success: () => {
          //跳转完页面后再关闭启动页
          plus.navigator.closeSplashscreen();
        },
        fail(err){
          // 如果跳转错误则退出
          plus.nativeUI.toast(JSON.stringify(err), {
            duration: 'long', // 持续3.5s
            align: 'center', // 水平居中
            verticalAlign: 'center' // 垂直底部
          });

          plus.runtime.quit();
        }
      });
    } else {
      //存在则关闭启动页进入首页
      plus.navigator.closeSplashscreen();
    }
    // #endif
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  }
};
</script>

<style lang="scss">
// 自定义icon
@import './static/icon/iconfont.css';
// uview
@import 'uview-ui/index.scss';
/*每个页面公共css */
</style>
