<template>
	<view id="playmusic">
		<view class="header">
			<u-notice-bar mode="horizontal" :list="list" type="none" :volume-icon="false" color="#efefef">
			</u-notice-bar>
		</view>
		<view class="music">
			<view class="m-song-wrap">
				<view class="img ">
					<image src="../../static/needle-ab.png" mode="" :class="{'normal':!isPaused, 'rotate':isPaused}">
					</image>
				</view>
				
				<image :src="picUrl" class="song_img" :class="{'pause':!isPaused}" @click="got()"></image>
			</view>
		</view>
		<view class="footer">
			<view class="slider">
				<view class="start">
					{{startTime}}
				</view>
				<view class="center">
					<u-slider v-model="value"></u-slider>
				</view>
				<view class="end">
					{{Ttime}}
				</view>
			</view>
			<view class="play">
				<view class="last">
					<image src="../../static/last.png" @click="last()"></image>
				</view>
				<view class="play_pause">
					<image src="../../static/暂停.png" @click="play()" v-if="isPaused"></image>
					<image src="../../static/播放.png" @click="play()" v-else></image>
				</view>
				<view class="next">
					<image src="../../static/next.png" @click="next()"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	let innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	innerAudioContext.loop = true
	
	export default {
		created() {
			innerAudioContext.onCanplay(()=>{
				console.log(innerAudioContext.duration)
				this.duration=innerAudioContext.duration
			})
			innerAudioContext.onTimeUpdate(() => {
				this.startTime = moment(innerAudioContext.currentTime*1000).format("mm:ss") 
				// console.log(moment(innerAudioContext.currentTime*1000).format("mm:ss"))
				this.value=innerAudioContext.currentTime/this.duration*100
			})
			this.getMusicDeatil()
			this.getSongUrl()
			this.playList = uni.getStorageSync('songs')
		},
		onLoad(options) {
			this.id = options.id
			this.index = parseInt(options.index)
			console.log(this.imgurl)
		},
		destroyed() {
			innerAudioContext.destroy()
		},
		data() {
			return {
				id: 0,
				songs: [],
				list: [],
				picUrl: '',
				isPaused: false,
				songUrl: '',
				innerAudioContext: {},
				currentTime:0,
				startTime:"00:00",
				playList: [],
				index: 0,
				dt: 0,
				value:0,
				duration:0,
				imgurl:'1'
			}
		},
		computed: {
			Ttime() {
				return moment(this.dt).format('m:ss')
			}
		},
		methods: {
			next() {
				if (this.index + 1 >= this.playList[0].length) {
					this.index = this.playList[0].length - 1
					uni.showToast({
						title: '已经最后一首'
					})
					return
				}
				this.index++
				let id = this.playList[0][this.index].id

				uni.redirectTo({
					url: "./playmusic?id=" + id + "&index=" + this.index
				})
				this.$router.go(0)
			},
			last() {
				if (this.index <= 0) {
					this.index = 0
					uni.showToast({
						title: '已经第一首'
					})
					return
				}
				this.index--
				let id = this.playList[0][this.index].id
				uni.redirectTo({
					url: "./playmusic?id=" + id + "&index=" + this.index
				})
				this.$router.go(0)
			},
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
						this.dt = res.data.songs[0].dt
					}
				})
			},
			got() {
				uni.navigateTo({
					url: './t'
				})
			},
			getSongUrl() {
				uni.request({
					url: "http://localhost:3000/song/url",
					data: {
						id: this.id
					},
					success: res => {
						this.songUrl = res.data.data[0].url
						innerAudioContext.src = this.songUrl;
						innerAudioContext.onPlay(() => {
							this.isPaused = true
						})
					}
				})
			},
			play() {
				if (!this.isPaused) {
					innerAudioContext.src = this.songUrl;
					innerAudioContext.startTime = this.currentTime
					innerAudioContext.onError((res) => {
						console.log(res.errMsg);
						console.log(res.errCode);
					});
				} else {

					// innerAudioContext.destroy();
					innerAudioContext.onPause(() => {
						this.currentTime = innerAudioContext.currentTime
					});
					innerAudioContext.pause()
				}
				this.isPaused = !this.isPaused
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
					width: 146rpx;
					height: 236rpx;
					margin-left: 400rpx;
					z-index: 99;

					image {
						transition: transform 1s ease;
					}
				}

				.song_img {
					width: 300rpx;
					height: 300rpx;
					top: 195rpx;
					left: 248rpx;
					position: absolute;
					border-radius: 150rpx;
					animation: rotation 10s linear infinite;
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

			// .m-song-wrap::before {
			// 	content: "";
			// 	background-image: url(../../static/needle-ab.png);
			// 	background-size: 100%;
			// 	position: absolute;
			// 	left: 400rpx;
			// 	width: 146rpx;
			// 	height: 236rpx;
			// 	z-index: 33;
			// 	transition: transform 5s ease;
			// 	transform: rotate(-33deg);
			// 	transform-origin: top left;
			// }
		}

		.footer {
			height: 400rpx;
			width: 100%;
			position: absolute;
			bottom: 0;
			padding: 20rpx;

			.slider {
				display: flex;
				height: 100rpx;
				justify-content: space-between;
				align-items: center;
				color: #ffffff;

				.center {
					flex: 1;
					margin-left: 40rpx;
					margin-right: 40rpx;
				}
			}

			.play {
				display: flex;
				justify-content: space-between;
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
	}

	image {
		width: 100%;
		height: 100%;
		z-index: 9999;
	}

	.rotate {
		transform: rotate(0deg);
		transform-origin: top left;
	}

	.normal {
		transform: rotate(-33deg);
		transform-origin: top left;
	}

	.tp {
		/* transform: rotate(360deg); */

		animation: rotation 3s linear infinite;
	}

	@keyframes rotation {

		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}

	}

	.pause {
		animation-play-state: paused !important;
	}
</style>
