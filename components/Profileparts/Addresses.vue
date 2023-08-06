<template>
	<div class="profile-addresses" v-if="addresses.length > 0">
		<div class="profile-addresses__address" v-for="(adr,key) in addresses" @click="adr.address !== address.address ? $emit('getAddress', adr.address): false">
			<p>{{adr.name || `Address #${key+1}`}}<ModulesCopy :text="adr.address" /></h1></p><span  :class="adr.address === address.address? 'active' : ''"></span>
			
		</div>
	
	</div>
</template>
<script>
	export default{
		props:{
			profile:{
				type: Object
			},
			address:{
				type: Object
			}
		},
		computed: {
			addresses() {
				try{
					if (this.profile.addresses) return this.profile.addresses
					if (this.address.address) return [{address: this.address.address,name: this.address.name || this.address.address.substr(0,6) + '***'+this.address.address.substr(-6)}];
				return []
				} catch(e) {return []}
			}
		}
	};
</script>
<style lang="scss" scoped>
	.profile-addresses{
		margin-top: 27px;
		display: flex;
		flex-direction:column;
        border-radius: 15px;
        border: solid 1px rgba(255,255,255,.15);

  
	&__address{
	padding: 17px;
	display: flex;
	cursor: pointer;
	justify-content: space-between;

	     &:not(:last-child){
	        border-bottom: solid 1px rgba(255,255,255,.15);
			
		}

		p{
			font-weight: 500;
			font-size: 16px;
			line-height: 24px;
		}

		span{
		position: relative;
		width: 20px;
		height: 20px;
		border-radius: 10px;
			border: 2px solid #fff;

			&.active:after{
			position: absolute;
			content: '';
			width: 10px;
			height: 10px;
			left: 3px;
			top: 3px;
			border-radius: 7.5px;
			background: #fff;
		}

		}
	}


	
}
</style>