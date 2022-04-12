<template>
	<view id="home">
		<view class="music">
			<view class="hot-musice-title">
				热门歌单
			</view>
			<view class="list">
				<view class="item" v-for="(i,index) in hotMusicList" :key=i.id @click="listDeatils(i.id)">
					<image :src="i.picUrl"></image>
					<text>{{i.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		created() {
			this.getHotMusicList()
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
			}
		},
		methods: {
			getHotMusicList() {
				uni.request({
					url: "http://localhost:3000/personalized?limit=6",
					success: res => {
						console.log(res);
						this.hotMusicList = res.data.result
					},
				})
			},
			listDeatils(id) {
				uni.navigateTo({
					url: './musicdeatil?id='+id
				})
			},
		},

	}
</script>

<style lang="scss">
	#home {
		.music {
			.hot-musice-title {
				height: 100rpx;
				line-height: 100rpx;
				margin-left: 10rpx;
				font-size: 30rpx;
			}

			.list {
				display: flex;
				height: 600rpx;
				flex-wrap: wrap;
				justify-content: space-between;
				align-content: space-between;

				.item {
					width: 246rpx;
					height: 248rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}

	text {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
</style>
