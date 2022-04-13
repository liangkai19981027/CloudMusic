<template>
	<view id="home">
		<view class="header">
			<view class="icon">
				<image src="../../static/音乐.png" mode=""></image>
			</view>
			<view class="title">
				网易云音乐
			</view>
		</view>
		<view class="tabs">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#dd001b"
				bar-width="100"></u-tabs>
				
				<u-line color="#C0C0C0"></u-line>
		</view>
		<component :is="component"></component>
	</view>
</template>

<script>
	import home from './home.vue'
	import hotmusice from './hotmusice.vue'
	import search from './search.vue'
	export default {
		created() {
			
		},
		components: {
			home,
			search,
			hotmusice
		},
		data() {
			return {
				list: [{
					name: '推荐音乐'
				}, {
					name: '热歌榜单'
				}, {
					name: '搜索',
				}],
				current: 0,
				hotMusicList: [],
				component: 'home'
			}
		},
		methods: {
			change(index) {
				this.current = index;
				switch (index) {
					case 0:
						this.component = 'home'
						break
					case 1:
						this.component = 'hotmusice'
						break
					case 2:
						this.component = 'search'
				}
			},
		},

	}
</script>
<style lang="scss">
	#home {
		.header {
			display: flex;
			background-color: #d43c33;
			height: 200rpx;
			align-items: center;

			.icon {
				width: 100rpx;
				height: 100rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.title {
				font-size: 40rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
