<template>
	<view id="search">
		<view class="search">
			<u-search placeholder="搜索歌曲、歌手、专辑" v-model="keywords" :show-action='false' @search="search()"></u-search>
			<u-line color="#C0C0C0"></u-line>
		</view>
		<view class="hot_search">
			<view class="title" v-if="!issearch">
				热门搜索
			</view>
			<view class="title" v-else>
				最佳匹配
			</view>
			<view class="list" v-if="!issearch">
				<ul class="hot">
					<li v-for="(item,index) in hotSearchList" @click="getSearchList(item.first)">
						{{item.first}}
					</li>
				</ul>
				<view class="search_history">
					<ul>
						<li v-for="(item,index) in searchHistory" @click="changekeywords(item)">
							
							<view class="left">
								<image src="../../static/记录.png"></image>
							</view>
							<view class="right">
								<view class="item">
									{{item}}
								</view>
								<u-line color="#C0C0C0"></u-line>
							</view>
						</li>
					</ul>
				</view>
			</view>
			<view class="music_list" v-else>
				<view class="songer">
					<view class="avatar">
						<image :src="songerinfo.cover" mode=""></image>
					</view>
					<view class="name">
						歌手：{{songerinfo.name}}
					</view>
				</view>
				<view class="music" v-for="(i,index) in searchResult" @click="goplay(i.id)">
					<musice :result="i"></musice>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import musice from '../../components/musci_item.vue'
	export default {
		created() {
			this.getHotSearch()
			this.searchHistory = uni.getStorageSync('cm_search_history')
		},
		components: {
			musice
		},
		data() {
			return {
				keywords: '',
				hotSearchList: [],
				searchResult: [],
				issearch: false,
				albumId: 0,
				artistId: 0,
				songerinfo: {},
				searchArr: [],
				searchHistory: []
			}
		},
		methods: {
			changekeywords(keywords){
				this.keywords=keywords
				this.search()
			},
			goplay(id) {
				uni.navigateTo({
					url: "./playmusic?id=" + id
				})
			},
			getSearchList(v) {
				this.keywords = v
				this.search()
			},
			search() {
				if (!uni.getStorageSync('cm_search_history')) {
					uni.setStorageSync('cm_search_history', [])
				} else {
					this.searchArr = uni.getStorageSync('cm_search_history')
				}
				this.searchArr.push(this.keywords)
				let obj = new Set(this.searchArr)
				uni.setStorageSync('cm_search_history', Array.from(obj))
				uni.request({
					url: "http://localhost:3000/search",
					data: {
						keywords: this.keywords
					},
					success: res => {
						this.searchResult = res.data.result.songs
						this.albumId = res.data.result.songs[0].album.id
						this.artistId = res.data.result.songs[0].artists[0].id
						this.getSonger()
					}
				})
				this.issearch = !this.issearch
			},
			getSonger() {
				uni.request({
					url: "http://localhost:3000/artist/detail",
					data: {
						id: this.artistId
					},
					success: res => {
						this.songerinfo = res.data.data.artist
					}
				})
			},
			getHotSearch() {
				uni.request({
					url: "http://localhost:3000/search/hot",
					data: {
						ids: this.id
					},
					success: res => {
						this.hotSearchList = res.data.result.hots
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#search {
		.search {
			height: 150rpx;
			line-height: 150rpx;
			padding: 10rpx;
		}

		.hot_search {
			.songer {
				display: flex;
				align-items: center;

				.avatar {
					width: 150rpx;
					height: 150rpx;
					margin-left: 10rpx;
				}

				.name {
					margin-left: 40rpx;
					font-size: 34rpx;
				}
			}

			.title {
				height: 100rpx;
				line-height: 100rpx;
				padding: 10rpx;
			}

			.list {
				.search_history {
					li{
						display: flex;
						align-items: center;
						height: 100rpx;
						.left {
							width: 30rpx;
							height: 30rpx;
							margin-left: 20rpx;
						}
						.right{
							flex: 15;
							margin-left: 20rpx;
							.item{
								height: 50rpx;
							}
						}
					}
					
				}

				.hot {
					display: flex;
					flex-flow: wrap;

					li {
						margin-left: 16rpx;
						margin-top: 16rpx;
						text-align: center;
						height: 64rpx;
						border: 1px solid #c7c3c3;
						min-width: 100rpx;
						padding-left: 20rpx;
						padding-right: 20rpx;
						border-radius: 80rpx;
						line-height: 64rpx;
					}
				}
			}
		}
	}

	image {
		width: 100%;
		height: 100%;
	}
</style>
