<template>
	<view id="music_item">
		<view class="card">
			<view class="name">
				<view class="song_name">
					{{result.name}}
				</view>
				<view class="author_name">
					<view class="" v-for="(item,index) in result.artists">
						{{item.name+(index+1==result.artists.length?"-":"/")}}
					</view>
					<view class="zj_name">
						{{result.album.name}}
					</view>
				</view>
			</view>
			<view class="icon">
				<image src="../static/play.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			result: {
				type: Object,
				default: {}
			}
		}
	}
</script>

<style scoped lang="less">
	#music_item {
		padding: 10rpx;

		.card {
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.icon{
				width: 50rpx;
				height: 50rpx;
			}
			.name {
				width: 600rpx;
				.song_name {
					height: 50rpx;
					color: #333;
					font-size: 34rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.author_name {
					display: flex;
					color: #888;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					.zj_name{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
	image{
		width: 100%;
		height: 100%;
	}
</style>
