<template>
	<view id="home">
		<view class="music">
			<u-swiper :list="list2" name="pic"></u-swiper>
			<view class="hot-musice-title mm">
				<view class="block">
					
				</view>
				<view class="title">
					热门音乐
				</view>
			</view>
			<view class="list">
				<view class="item" v-for="(i,index) in hotMusicList" :key=i.id @click="listDeatils(i.id)">
					<image :src="i.picUrl"></image>
					<text>{{i.name}}</text>
				</view>
			</view>
			<view class="new-musice-title">
				<view class="block">
					
				</view>
				<view class="title">
					最新音乐
				</view>
			</view>
			<view class="new-musice-list">
				<view class="" v-for="(i,index) in result">
					<musice :result="i.song" @click.native="goplay(i.song.id,index)"></musice>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import musice from '../../components/musci_item.vue'
	export default {
		components:{
			musice
		},
		created() {
			this.getHotMusicList()
			this.gethomepage()
			this.getNewMusic()
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
				list2: [
				],
				result:[]
			}
		},
		methods: {
			goplay(id,index){
				uni.navigateTo({
					url:'./playmusic?id=' + id+"&index="+index
				})
			},
			getNewMusic(){
				uni.request({
					url: "http://localhost:3000/personalized/newsong",
					success: res => {
						this.result=res.data.result
						this.$store.commit('increment',this.result)
					},
				})
			},
			getHotMusicList() {
				uni.request({
					url: "http://localhost:3000/personalized?limit=6",
					success: res => {
						this.hotMusicList = res.data.result
					},
				})
			},
			gethomepage(){
				uni.request({
					url: "http://localhost:3000/homepage/block/page",
					success: res => {
						this.list2=res.data.data.blocks[0].extInfo.banners
					},
				})
			},
			listDeatils(id) {
				uni.navigateTo({
					url: './musicdeatil?id=' + id
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
			.new-musice-title{
				display: flex;
				align-items: center;
				margin-top: 100rpx;
				.block{
					width: 5rpx;
					height: 30rpx;
					background-color: red;
				}
				.title{
					margin-left: 10rpx;
					font-size: 34rpx;
				}
			}
			.hot-musice-title{
				display: flex;
				align-items: center;
				.block{
					width: 5rpx;
					height: 30rpx;
					background-color: red;
				}
				.title{
					margin-left: 10rpx;
					font-size: 34rpx;
				}
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
