<template>
	<view class="content">
	<!-- 音乐列表 -->
		<view class="menu1">
			<view class="menu1_item" v-for="(item,i) in menu1" :key="i">
				<view class="item_warp" @click="playAudio(i)">
					<view class="item_icon t-icon" :class="item.isPlay?'t-icon-ziyuanldpi':'t-icon-bofang1'"></view>
					<view class="item_title">{{item.title}}</view>
				</view>
			</view>
		</view>
	<!-- 播放器 -->
		<view class="bar_warp" ref="bar_warp">
			<view class="bar_progress" ref="bar_progress">
				<view class="progress_warp">
					<view class="bar_left">
						<img :src="current.poster" alt="">
					</view>
					<view class="bar_mid">
						<view class="name">{{current.name}}</view>
						<view class="author">{{current.author}}</view>
						<view class="bar" ref="bar">
							<span class="icon" ref="icon"></span>
						</view>
					</view>
					<view class="bar_right t-icon" :class="isPlay?'t-icon-bofang':'t-icon-bofang4'" @click="playBtn">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	//创建innerAudioContext对象应该是全局对象，否则会出现多个音频同时播放的情况
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	export default {
		data() {
			return {
				isPlay: false,
				menu1: [
					{
						title: "哥只是个传说",
						isPlay: false,
						src: "../../static/audio/陈旭 - 哥 只是个传说.mp3",
						img: 'http://p2.music.126.net/7RItheuGL6uP4YfZj3CW8w==/27487790706531.jpg',
						name: "哥只是个传说",
						author: "陈旭"
					},
					{
						title: "DJBeat_老果",
						isPlay: false,
						src: "../../static/audio/DJ_Beat老果 - WOD.mp3",
						img: 'http://p2.music.126.net/7RItheuGL6uP4YfZj3CW8w==/27487790706531.jpg',
						name: "DJBeat_老果",
						author: "未知"
					},
					{
						title: "哥只是个传说",
						isPlay: false,
						src: "../../static/audio/陈旭 - 哥 只是个传说.mp3",
						img: 'http://p2.music.126.net/7RItheuGL6uP4YfZj3CW8w==/27487790706531.jpg',
						name: "哥只是个传说",
						author: "陈旭"
					},
				],
				current: {
					poster: '../../static/img/未知.png',
					name: '未知',
					author: '未知歌手',
					src: '',
				},
			}
		},
		components: {},
		mounted() {
			//操作dom，添加移动端的触摸事件
			const bar = this.$refs.bar
			const icon = this.$refs.icon
			let maxScroll = 0
			let timeChangeX = 0
			let flag = false
			//添加icon的触摸事件
			//基于触摸开始事件上在监听触摸移动和触摸停止的事件
			let offsetX = 0
			//进度条随着音乐的播放进度而改变
			innerAudioContext.onTimeUpdate(() => {
				if (!flag) {
					maxScroll = bar.$el.clientWidth - icon.clientWidth
					let progress = innerAudioContext.currentTime / innerAudioContext.duration
					let position = maxScroll * progress
					icon.style.transform = `translate(${position}px,-50%)`
					//记录偏移位置
					timeChangeX = position
				}
			})
			icon.addEventListener('touchstart', (ev) => {
				flag = true
				maxScroll = bar.$el.clientWidth - icon.clientWidth
				//记录开始的位置
				const startX = ev.changedTouches[0].clientX
				const touchmoveCallback = (ev) => {
					//计算偏移量
					offsetX = ev.changedTouches[0].clientX - startX + timeChangeX
					//约束偏移量
					if (offsetX < 0) {
						offsetX = 0
					}
					if (offsetX > maxScroll) {
						offsetX = maxScroll
					}
					// console.log(offsetX)
					//手指移动多少，就让icon标签在当前位置跟着偏移多少
					icon.style.transform = `translate(${offsetX}px,-50%)`
					// console.log(progress)
				}
				const touchendCallback = (ev) => {
					flag = false
					maxScroll = bar.$el.clientWidth - icon.clientWidth
					//偏移多少,音乐就偏移多少
					let progress = offsetX / maxScroll
					let currentTime = innerAudioContext.duration * progress
					innerAudioContext.seek(currentTime)

					//移除监听
					document.removeEventListener('touchmove', touchmoveCallback)
					document.removeEventListener('touchend', touchendCallback)
				}
				//添加监听
				document.addEventListener('touchmove', touchmoveCallback)
				document.addEventListener('touchend', touchendCallback)
			})



		},
		onLoad() {},
		methods: {
			playAudio: function(i) {
				if (!this.menu1[i].isPlay) {
					this.isPlay = true
					for (let j = 0; j < this.menu1.length; j++) {
						if (this.menu1[j].isPlay && j != i) {
							this.menu1[j].isPlay = !this.menu1[j].isPlay
						}
					}
					this.menu1[i].isPlay = !this.menu1[i].isPlay
					this.$refs.bar_warp.$el.style.display = 'flex'
					this.current.poster = this.menu1[i].img
					this.current.name = this.menu1[i].name
					this.current.author = this.menu1[i].author
					this.current.src = this.menu1[i].src
					innerAudioContext.src = this.current.src
				}
			},
			playBtn: function() {
				if (innerAudioContext.paused) {
					innerAudioContext.play()
					this.isPlay = true
				} else {
					innerAudioContext.pause() //暂停
					innerAudioContext.onPause(() => {
						console.log("总共：" + innerAudioContext.duration)
						console.log("当前：" + innerAudioContext.currentTime)
					})
					this.isPlay = false
				}
			}

		}
	}
</script>



<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		font-weight: 200;
		font-size: 13px;
	}

	.content {
		width: 100%;
		color: white;

		.menu1 {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: white;

			.menu1_item {
				width: 80%;
				height: 40px;
				color: black;
				display: flex;
				align-items: center;

				.item_warp {
					display: flex;

					.item_icon {
						width: 22px;
						height: 22px;
					}

					.item_title {
						margin-left: 10px;
					}
				}
			}
		}

		.bar_warp {
			height: 60px;
			display: none;
		}

		.bar_progress {
			position: fixed;
			bottom: 0rpx;
			width: 100%;
			height: 60px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: rgb(240, 240, 240);

			.progress_warp {
				width: 95%;
				height: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.bar_left {
					background-color: red;
					width: 12%;
					display: flex;
					justify-content: center;
					align-items: center;

					img {
						width: 100%;
					}
				}

				.bar_mid {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 70%;
					width: 65%;

					.name {
						color: black;
						font-size: 15px;
						font-weight: 600;
					}

					.author {
						color: rgba($color: #000000, $alpha: .3);
						font-size: 11px;
					}

					.bar {
						height: 4px;
						width: 100%;
						background-color: #ddd;

						.icon {
							position: relative;
							top: 50%;
							left: 0;
							transform: translate(-50%, -50%);
							display: block;
							width: 5px;
							height: 4px;
							background: rgba($color: #7bd25c, $alpha: 1.0);
							border-radius: 50%;

							&::before {
								content: "";
								position: absolute;
								top: -5px;
								left: -5px;
								bottom: -5px;
								right: -5px;
							}
						}
					}
				}

				.bar_right {
					width: 35px;
					height: 35px;
					background-repeat: no-repeat;
					background-size: cover;
					background-position: 50% 50%;
				}
			}

		}

		//引入图标
		// @font-face {
		// 	font-family: 'iconfont';
		// 	/* Project id 2634205 */
		// 	src: url('https://at.alicdn.com/t/font_2634205_tfx2rjy7ocd.woff2?t=1624629652226') format('woff2'),
		// 		url('https://at.alicdn.com/t/font_2634205_tfx2rjy7ocd.woff?t=1624629652226') format('woff'),
		// 		url('https://at.alicdn.com/t/font_2634205_tfx2rjy7ocd.ttf?t=1624629652226') format('truetype');
		// }

		.iconfont {
			font-family: "iconfont" !important;
			font-size: 14px;
			font-style: normal;
			-webkit-font-smoothing: antialiased;
			-webkit-text-stroke-width: 0.2px;
			-moz-osx-font-smoothing: grayscale;
		}
	}

	// @import '../../static/iconfont-weapp-icon.css';
</style>

