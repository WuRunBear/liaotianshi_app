export default {
	namespaced: true,
	state: {
		token: '',
		info: {
			name: "测试用户自己",
			number: 1234567811,
			avatar: "https://t7.baidu.com/it/u=2387439597,1787872516&fm=193&f=GIF",
			signature: "",
			address: "",
			sex: true,
			isSelf: false,
			isFriend: false,
		}
	},
	mutations: {
		// setNewMsgCount(state, data) {
		//   if (data) {
		//     state.newMsgCount += data
		//   } else {
		//     state.newMsgCount++
		//   }
		// }
	},
	getters: {
		token(state) {
			return state.token;
		},
		userInfo(state) {
			return state.info;
		}
	},
	mutations: {
		userInfo(state, data) {
			// 变更状态
			state.info = data;
		}
	},
	actions: {
		login() {
			// 测试用数据
			let userInfo = {
				name: "测试用户自己",
				number: 1234567811,
				avatar: "https://t7.baidu.com/it/u=2387439597,1787872516&fm=193&f=GIF",
				signature: "",
				address: "",
				sex: true,
				isSelf: false,
				isFriend: false,
				auto_login: true,
        keep_password: true,
			}
			uni.setStorageSync('userInfo', userInfo);
			commit("userInfo", userInfo);

			//登录成功跳转到首页
			this.toPage("reLaunch", {
			  url: '/pages/chatList/chatList'
			});
		},
		logout({
			commit
		}) {
			commit("userInfo", {});
			uni.removeStorageSync("userInfo");
			this.toPage("reLaunch", {
				url: "/pages/login/login",
			});
		}
	},
}
