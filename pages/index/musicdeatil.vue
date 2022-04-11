<template>
	<view id="deatil">
		<view class="header">
			<view class="plhead_wrap">
				<view class="plhead_fl lsthd_fl">
					<image :src="playlist.coverImgUrl" mode=""></image>
				</view>
				<view class="plhead_fr">
					<h2 class="f-thide2 f-brk lsthd_title">{{playlist.name}}</h2>
					<view class="lsthd_auth f-thide">
						<view class="user_avatarUrl">
							<image :src="creator.avatarUrl"></image>

						</view>
						<view class="creator_nickname">
							{{creator.nickname}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pylst_list">
			<h3 class='u-smtitle'>歌曲列表</h3>
			<view class="m-sglst">
				<view class="m-sgitem" v-for="(i,index) in tracks" @click="goplay(i.id)">
					<view class="index">
						{{index}}
					</view>
					<view class="song_name">
						{{i.name}}
						<view class="ar">
							<span v-for="(i2,index) in i.ar">
								<!-- {{i2.name}} -->
								{{i2.name+(index+1==i.ar.length?"-":"/")}}
							</span>
							{{i.al.name}}
						</view>
					</view>
					<view class="bf">
						<u-icon name="play-circle" size="50" color="#c5c5c5"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="comments">
			<h3 class='u-smtitle' v-if="hotComments.length!=0">热门评论</h3>
			<view class="hot_comments cmt_c" v-for="(i,index) in hotComments">
				<view class="cmt_left">
					<view class="cmt_avatar">
						<u-avatar :src="i.user.avatarUrl" size='60'></u-avatar>
					</view>
				</view>
				<view class="right">
					<view class="cmt_nickname_likedCount">
						<view class="nickname">
							{{i.user.nickname}}
						</view>
						<view class="likedCount">
							<view class="count">
								{{i.likedCount}}
							</view>
							<view class="img">
								<image src="../../static/点赞.png" mode=""></image>
							</view>
						</view>
					</view>
					<p>{{dataTime(i.time)}}</p>
					<view class="cmt_comment">
						{{i.content}}
					</view>
				</view>
			</view>
			<h3 class='u-smtitle' v-if="newComments.length!=0">最新评论</h3>
			<view class="new_comments cmt_c" v-for="(i,index) in newComments">
				<view class="cmt_left">
					<view class="cmt_avatar">
						<u-avatar :src="i.user.avatarUrl" size='60'></u-avatar>
					</view>
				</view>
				<view class="right">
					<view class="cmt_nickname_likedCount">
						<view class="nickname">
							{{i.user.nickname}}
						</view>
						<view class="likedCount">
							<view class="count">
								{{i.likedCount}}
							</view>
							<view class="img">
								<image src="../../static/点赞.png" mode=""></image>
							</view>
						</view>
					</view>
					<p>{{dataTime(i.time)}}</p>
					<view class="cmt_comment">
						{{i.content}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		happenTimeFun
	} from '../../utils/utils.js'
	export default {
		created() {
			this.getHotMusicList()
			this.gethotComments()
			this.getnewComments()
		},
		onLoad: function(option) {
			this.id = option.id
		},
		computed: {
			dataTime() {
				return function(v) {
					return happenTimeFun(v)
				}
			}
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
				id: 0,
				tracks: [],
				playlist: [],
				creator: {},
				hotComments: [],
				newComments:[]
			}
		},
		methods: {
			getHotMusicList() {
				uni.request({
					url: "http://localhost:3000/playlist/detail",
					data: {
						id: this.id
					},
					success: res => {
						this.tracks = res.data.playlist.tracks
						this.playlist = res.data.playlist
						this.creator = res.data.playlist.creator
					},
				})
			},
			gethotComments() {
				uni.request({
					url: "http://localhost:3000/comment/hot",
					data: {
						id: this.id,
						type: 2
					},
					success: res => {
						this.hotComments = res.data.hotComments
					},
				})
			},
			getnewComments(){
				uni.request({
					url: "http://localhost:3000/comment/new",
					data: {
						id: this.id,
						type: 2,
						sortType:3
					},
					success: res => {
						this.newComments = res.data.data.comments
						console.log(res.data.data.comments)
					},
				})
			},
			goplay(id){
				uni.navigateTo({
					url:"./playmusic?id="+id
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	#deatil {
		.header {
			padding: 60rpx 20rpx 60rpx 30rpx;
			height: 362rpx;
			background: linear-gradient(to right, #C0C0C0, #15161b);
			.plhead_wrap {
				display: flex;
				.plhead_fl {
					height: 252rpx;
					width: 252rpx;
				}
				.plhead_fr {
					margin-left: 32rpx;
					.lsthd_title {
						color: #fefefe;
						font-size: 34rpx;
						height: 88rpx;
						padding-top: 2rpx;
					}
					.lsthd_auth {
						display: flex;
						align-items: center;
						.user_avatarUrl {
							height: 60rpx;
							width: 60rpx;
							border-radius: 30rpx;
							margin-right: 10rpx;
							margin-top: 10rpx;
							image {
								border-radius: 30rpx;
							}
						}
						.creator_nickname {
							color: hsla(0, 0%, 100%, .7);
						}
					}
				}
			}
		}

		.pylst_list {
			.m-sglst {
				padding: 20rpx;
				.m-sgitem {
					display: flex;
					height: 100rpx;
					justify-content: space-between;
					.index {
						width: 50rpx;
						line-height: 100rpx;
					}

					.song_name {
						flex: 1;

						.ar {
							margin-top: 10rpx;
							color: #888;
						}
					}
				}
			}
		}

		.comments {
			.cmt_c {
				display: flex;
				padding: 20rpx;
				.right {
					flex: 1;
					margin-left: 40rpx;
					.cmt_nickname_likedCount {
						display: flex;
						justify-content: space-between;
					}

					.cmt_comment {
						margin-top: 20rpx;
					}

					.likedCount {
						display: flex;
						.count{
							margin-right: 20rpx;
							font-size: 10rpx;
							color: #999;
						}
						.img {
							height: 28rpx;
							width: 28rpx;
						}
					}
				}
			}
		}
	}

	.u-smtitle {
		height: 46rpx;
		line-height: 46rpx;
		padding: 0 20rpx;
		font-size: 24rpx;
		color: #666;
		background-color: #eeeff0;
	}

	image {
		width: 100%;
		height: 100%;
	}
</style>
