<template>
	<view class="content">
		<button type="default" @click="t()">asd</button>
	</view>
</template>


<script>
	//创建innerAudioContext对象应该是全局对象，否则会出现多个音频同时播放的情况
	export default {
		created() {
			console.log(this.$store.state.name)
		},
		methods:{
			t(){
				 this.$store.commit('increment','qwewqwe')
			}
		}
		
	}
</script>



<style lang="scss">

</style>

