<template>
	<div class="profile-balance" v-if="isLoadingAddress || (!isLoadingAddress && address && !isNaN(balance))">
		<v-skeleton-loader dark :loading="isLoadingAddress" height="73px" type="list-item-two-line">
			<p :title="address.balance / 1000000000">{{balance}} TON</p>
			<span v-if="localeBalance.currency">~{{localeBalance.amountF}} {{localeBalance.currency}}</span>
			<span v-else>-</span>
   		 </v-skeleton-loader>
		
	</div>
</template>
<script>
export default{
	props:{
		address:{
			type: Object
		},
		isLoadingAddress: {
			type: Boolean,
			default: true
		}
		
	},

	data() {
		return{
			loading: false
		}
	},
	computed: {
		balance() {
			try{
				return (this.address.balance / 1000000000);
			} catch(e) {console.log(e)}
		},

		localeBalance() {
			return {amountF: this.address?.localeBalance?.amountF, currency: this.address?.localeBalance?.currency};
		}
	}
};
</script>
<style lang="scss" scoped>
	.profile-balance{
		margin-top: 27px;
		display: flex;
		flex-direction:column;
  
  p{
	font-weight: bold;
	font-size: 32px;
	line-height: 32px;
	margin-bottom: 10px;
	letter-spacing: 1px;

	@media (max-width: 540px){
		font-size: 24px;
		margin-bottom: 5px;
	}
}  
span{
  font-size: 24px;
line-height: 31px;
color: rgba(255, 255, 255, 0.4);
letter-spacing: 1px
}

	
}
</style>