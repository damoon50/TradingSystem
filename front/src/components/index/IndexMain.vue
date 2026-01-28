<template>
	<el-main>
		<bread-crumbs :title="title" class="bread-crumbs"></bread-crumbs>
		<router-view class="router-view"></router-view>
	</el-main>
</template>
<script>
	import menu from "@/utils/menu";
	export default {
		data() {
			return {
				menuList: [],
				role: "",
				currentIndex: -2,
				itemMenu: [],
				title: ''
			};
		},
		mounted() {
			let menus = menu.list();
			this.menuList = menus;
			this.role = this.$storage.get("role");
		},
		methods: {
			menuHandler(menu) {
				this.$router.push({
					name: menu.tableName
				});
				this.title = menu.menu;
			},
			titleChange(index, menus) {
				this.currentIndex = index
				this.itemMenu = menus;
				console.log(menus);
			},
			homeChange(index) {
				this.itemMenu = [];
				this.title = ""
				this.currentIndex = index
				this.$router.push({
					name: 'home'
				});
			},
			centerChange(index) {
				this.itemMenu = [{
					"buttons": ["新增", "查看", "修改", "删除"],
					"menu": "修改密码",
					"tableName": "updatePassword"
				}, {
					"buttons": ["新增", "查看", "修改", "删除"],
					"menu": "个人信息",
					"tableName": "center"
				}];
				this.title = ""
				this.currentIndex = index
				this.$router.push({
					name: 'home'
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	a {
		text-decoration: none;
		color: #ffffff;
		transition: all 0.2s ease;
	}

	a:hover {
		color: #2563eb;
	}

	.nav-list {
		width: 100%;
		margin: 0 auto;
		text-align: left;
		margin-top: 20px;

		.nav-title {
			display: inline-block;
			font-size: 15px;
			color: rgba(255, 255, 255, 0.8);
			padding: 15px 25px;
			border: none;
			transition: all 0.2s ease;
		}

		.nav-title:hover {
			color: #ffffff;
			background-color: rgba(255, 255, 255, 0.05);
		}

		.nav-title.active {
			color: #ffffff;
			cursor: default;
			background-color: #2563eb;
			border-radius: 6px;
		}
	}

	.nav-item {
		margin-top: 20px;
		background: #1e1e1e;
		padding: 15px 0;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

		.menu {
			padding: 15px 25px;
			color: #ffffff;
		}
	}

	.el-main {
		background-color: #121212;
		padding: 0 24px;
		// padding-top: 60px;
	}

	.router-view {
		padding: 24px;
		margin-top: 20px;
		background: #1e1e1e;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		box-sizing: border-box;
		transition: all 0.3s ease;
	}

	.bread-crumbs {
		width: 100%;
		margin-top: 20px;
		padding: 12px 0;
		box-sizing: border-box;
	}
</style>
