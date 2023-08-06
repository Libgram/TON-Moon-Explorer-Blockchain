<template>
	<div class="profile-nft">
		<h2>Meta Panthers</h2>
		<div class="profile-nft__group">
			<div class="profile-nft__group-item" v-for="nft of nfts">
				<img :src="image(nft.hash)" alt="nft">
				<p>{{civil(nft.civil)}}</p>
				<span><template v-if="prestige(nft.power)">Prestige: {{prestige(nft.power)}}</template></span>
			</div>
		</div>
	

	
	</div>
</template>
<script>export default{
	props:{
		nfts:{
			type: Array
		}
	},

	methods: {
		image(hash) {
			try{
				return `https://tonmoon.org/public/nfts/${hash}.png`
			} catch(e){
				console.log(e);
			}
		},

		civil(civil) {
			try{
				switch(civil) {
					case 1: return 'Ancient Egypt';
					case 2: return 'Ancient Japan';
					case 3: return 'Ancient England';
				}
			} catch(e){
				console.log(e);
			}
		},

		prestige(prestige){
			try{
				if (Number(prestige)) {
					return Number(prestige).toFixed(2);
				}
				
			} catch(e){
				console.log(e);
			}
		}
	},


	computed: {
		name() {
			if(this.hist.info.name) return this.hist.info.name;
			return `*${this.hist.p.substr(-7)}`;
		},

		
	}
};
</script>
<style lang="scss" scoped>
	.profile-nft{
	padding: 15px 35px;
	@media (max-width: 600px){
		padding: 15px 0;
	}

	h2{
		margin: 15px 0;
	}
	&__group{
		display: flex;
		flex-wrap: wrap;
		
		&-item{
		
		@media (min-width: 601px){
			&:nth-child(3n - 1){
			margin-left: 24px;
			margin-right: 24px;
		}
		}
		@media (max-width: 600px){
			&:nth-child(2n){
				margin-left: 24px;
				margin-right: 0;
			}
		}

			margin-bottom: 32px;
			width: calc((100% - 48px) / 3);
			height: 100%;

			@media (max-width: 600px){
				width: calc((100% - 24px) / 2);
			}
			img{
				width: 100%;
		
				border-radius: 15px;
			}

			p{
				margin-top: 16px;
				font-weight: 600;
				font-size: 16px;
				color: #fff;
			}

			span{
				display: inline-block;
				margin-top: 6px;
				font-weight: 600;
				color: #A0A1A2;
				font-size: 16px;
			}
		}
	}
	
	}
</style>