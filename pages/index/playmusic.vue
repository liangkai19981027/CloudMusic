<template>
	<view id="playmusic">
		<view class="header">
			<u-notice-bar mode="horizontal" :list="list" type="none" :volume-icon="false" color="#efefef">
			</u-notice-bar>
		</view>
		<view class="music">
			<view class="m-song-wrap">
				<view class="img">
				</view>
				<image :src="picUrl" class="song_img" @click="got()"></image>
			</view>
		</view>
		<view class="footer">
			<view class="last">
				<image src="../../static/last.png"></image>
			</view>
			<view class="play_pause">
				<image src="../../static/暂停.png" @click="play()" v-if="isPaused"></image>
				<image src="../../static/播放.png" @click="play()" v-else></image>
			</view>
			<view class="next">
				<image src="../../static/next.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	let innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	export default {
		created() {
			this.getMusicDeatil()
			this.getSongUrl()
		},
		onLoad(options) {
			this.id = options.id
		},
		data() {
			return {
				id: 0,
				songs: [],
				list: [],
				picUrl: '',
				isPaused: false,
				songUrl:'',
				innerAudioContext:{}
			}
		},
		methods: {
			getMusicDeatil() {
				uni.request({
					url: "http://localhost:3000/song/detail",
					data: {
						ids: this.id
					},
					success: res => {
						this.songs = res.data.songs
						this.list.push(res.data.songs[0].name)
						this.picUrl = res.data.songs[0].al.picUrl
					}
				})
			},
			got() {
				uni.navigateTo({
					url: './t'
				})
			},
			getSongUrl(){
				uni.request({
					url: "http://localhost:3000/song/url",
					data: {
						id: this.id
					},
					success: res => {
						this.songUrl=res.data.data[0].url
					}
				})
			},
			play() {
				if (!this.isPaused) {
					innerAudioContext.src =this.songUrl;
					innerAudioContext.onPlay(() => {
						console.log('开始播放');
					});
					innerAudioContext.onError((res) => {
						console.log(res.errMsg);
						console.log(res.errCode);
					});
				} else {

					// innerAudioContext.destroy();
					innerAudioContext.onPause(function() {
						console.log('end');
					});
					innerAudioContext.pause()
				}
				this.isPaused = !this.isPaused
				console.log(this.isPaused)

			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #503e31;
	}

	#playmusic {
		.music {
			margin-top: 200rpx;

			.m-song-wrap {
				height: 600rpx;

				position: relative;

				.img {
					width: 200rpx;
					height: 200rpx;
				}

				.song_img {
					width: 300rpx;
					height: 300rpx;
					top: 195rpx;
					left: 248rpx;
					position: absolute;
					border-radius: 150rpx;
				}

				.img::after {
					content: "";
					position: absolute;
					background-image: url(../../static/disc.png);
					background-repeat: no-repeat;
					width: 494rpx;
					height: 494rpx;
					background-size: 100%;
					top: 100rpx;
					left: 150rpx;
				}
			}

			.m-song-wrap::before {
				content: "";
				background-image: url(../../static/needle-ab.png);
				background-size: 100%;
				position: absolute;
				left: 400rpx;
				width: 146rpx;
				height: 236rpx;
				z-index: 33;
			}
		}

		.footer {
			height: 300rpx;
			width: 100%;
			position: absolute;
			bottom: 0;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.play_pause,
				{
				height: 100rpx;
				width: 100rpx;
			}

			.last,
			.next {
				height: 60rpx;
				width: 60rpx;
			}
		}
	}

	image {
		width: 100%;
		height: 100%;
	}
</style>
