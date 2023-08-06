<template>
	<div class="form">
		<h1>TON Explorer</h1>
		<h2>Search for addresses of friends, shops and NFTs</h2>

			<div class="form__wrapper">
				<input v-on:keyup.enter="handleSearch" type="text" name="" v-model="search" placeholder="Enter username or address" autofocus>
			<div @click="handleSearch" :class="['form__search', !s.length ? 'form__search-disabled': '']"></div>
			</div>

		</div>
</template>
<script>
	export default{
		data() {
			return {
				search: ''
			}
		},
		created(){


		},

		computed: {
			s() {
				try{
					return this.search.replaceAll('@', '').trim();
				} catch(e){
					console.log(e)
					return '';
				}
			}
		},

		methods: {
			handleSearch() {
				try{
					if (this.s !== '') {
						this.$router.push({ path: `/explorer/${this.s}` })

					}
				} catch(e){
					console.log(e);
				}
				
			}
		},
		watch: {
			q(){
			}
		}
	};
</script>
<style lang="scss" scoped>
	.form{
	width: 100%;
		margin-top: 60px;
		h1{
			font-size: 48px;
			text-align: center;
			@media(max-width: 768px){
			font-size: 42px;
		}
		}
		h2{
		padding-top: 8px;
		font-size: 24px;
		text-align: center;
		font-weight: 300;
		line-height: 24px;

			@media(max-width: 540px){
				font-size: 16px;
			}

	}
		&__wrapper{
		margin-top: 50px;
		display: flex;
		position: relative;
	}
		input[type="text"]{
		
			width: 600px;
			@media(max-width: 768px){
			width: 100%;
		}
			height: 50px;	
			border: solid 1px #30363d;
			border-radius: 15px;
			padding: 0 65px 0 15px;
			font-size: 18px;
			font-weight: 400;

			color: #fff;
			font-family: 'Montserrat', sans-serif;
			&::placeholder {
			  color: #737a83;
			  font-size: 18px;
			  font-weight: 400;
			  font-family: 'Montserrat', sans-serif;
			  @media(max-width: 540px){
				font-size: 16px;
			}
			}
		}
		&__search{
			right: 0;
			position: absolute;
			width: 50px;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			background: url('/img/search.svg') no-repeat center;
			background-size: 35%;
			transition: opacity .3s;
			&-disabled{
				transition: opacity .3s;
				opacity: .5;
			}
		}
}
</style>