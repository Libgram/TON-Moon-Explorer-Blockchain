<template>
	<div class="profile-info">
		<div class="profile-info-left">
			<img :class="['profile-info__image', isNFT ? 'profile-info__image-nft' : '']" :src="image" alt="nft">
		</div>
		<div class="profile-info-right">
			<v-skeleton-loader dark :loading="isLoadingAddress || isLoadingProfile" width="200px" height="100px" type="list-item-two-line">
				<a target="_blank" v-if="username" :href="`https://t.me/${username}`">@{{username}}</a>
				<h1 :title="name">{{name}}</h1>
				
				<div class="profile-info-right__tags">
					<div class="profile-info-right__tag profile-info-right__tag-nft" v-if="isAddressNFT">
						NFT
					</div>
					<div class="profile-info-right__tag profile-info-right__tag-jetton" v-if="isAddressJetton">
						Jetton
					</div>
					<div class="profile-info-right__tag profile-info-right__tag-scam" v-if="isAddressSCAM">
						SCAM
					</div>
					<div class="profile-info-right__tag profile-info-right__tag-service" v-if="isAddressService">
						Service
					</div>
					
				</div>
				<h2 v-if="profile.tm > 0">{{profile.tm}} MOON</h2>
			</v-skeleton-loader>
		
		</div>
	</div>
</template>
<script>export default{
	props:{
		profile:{
			type: Object
		},
		address:{
			type: Object
		},
		type: {
			type: String
		},
		isLoadingAddress: {
			type: Boolean,
			default: true
		},
		isLoadingProfile: {
			type: Boolean,
			default: true
		}
	},
	computed:{
		isNFT() {
			try{
				return this?.profile?.image && this.profile.is_user
			} catch(e) {
				console.log(e);
			}
		},

		isAddressSCAM() {
			try{
				 return this.address.tags.find(item => {return item === 'SCAM'});
			} catch(e) {
		
			}
		},

		isAddressNFT() {
			try{
				 return this.address.tags.find(item => {return item === 'NFT'});
			} catch(e) {
			
			}
		},

		isAddressService() {
			try{
				 return this.address.tags.find(item => {return item === 'Service'});
			} catch(e) {
			
			}
		},

		isAddressJetton() {
			try{
				 return this.address.tags.find(item => {return item === 'Jetton'});
			} catch(e) {
				
			}
		},
		image() {
			try{
				if (this?.profile?.image && this.profile.is_user) {
					return `https://tonmoon.org/public/nfts/${this.profile.image}.png`
				}
				if (this?.profile?.image && !this.profile.is_user) {
					return `/img/logos/${this.profile.image}`
				}
				if (this.type === 'address' && this?.address?.image) {
					return `/img/logos/${this?.address?.image}`
				}
				if (this.type === 'address' && this?.address?.user_id) {
					return `/img/pb.svg`;
				}

				if (this.type === 'profile' && this?.profile?.username) {
					return `/img/pb.svg`;
				}
				return `/img/pg.svg`;
			} catch(e){
				return `/img/pg.svg`;
				console.log(e);
			}
		},
		balance() {
			return ((this.address.balance/1000000000).toFixed(9)) || 0;
		},
		username() {
			try{
				if (this.profile.username) return this.profile.username;
				if (this.address.username) return this.address.username;
			} catch(e){
				console.log(e);
			}
		},
		name() {
			try{
				if (this.profile.name) return this.profile.name;
				if (this.address.name) return this.address.name;
				if (this.type === 'profile') return this.$route.params.address;
				return '*'+this.$route.params.address.substr(-7);
			} catch(e){
				console.log(e);
			}
		},

		countAddresses() {
			try{
				return this.profile.addresses.length;
			} catch(e){
				return 0;
			}
		}
	}
};</script>
<style lang="scss">
	.profile-info{
	display: flex;

	&__tags{
	display: flex;
	margin-bottom: 20px;
	span{
	margin-right: 10px;
	display: block;
	padding: 8px 14px;
	&.orange{
	font-size: 24px;
	line-height: 22px;
		background: rgba(255,255,255,0.1);
	}
	border-radius: 50px;
}
}
	&__image{
		width: 150px;
		height: 150px;
		object-fit: cover;
		border-radius: 75px;
		

		&-nft{
			width: 150px;
			height: 190px;
			border-radius: 15px;
			object-fit: unsets;
		}

		@media (max-width: 540px){
			width: 90px;
			height: 90px;
			border-radius: 45px;
			flex-direction: column;
		}
	
	}
	&-left{
	margin-right: 20px;
	}

	&-right{
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    &__tags{
	    	margin-top: 7px;
		    display: flex;
		}

		&__tag{
			border-radius: 5px;
			padding: 5px 10px;
			font-weight: 600;
			margin-right: 10px;
			&-nft{
				color: #ffab00;
				border: solid 1px #ffab00;
			}
			&-scam{
				color: #bb002f;
				border: solid 1px #bb002f;
			}

			&-service{
				color: #64b5f6;
				border: solid 1px #64b5f6;
			}

			&-jetton{
				color: #fdd835;
				border: solid 1px #fdd835;
			}
		}
	}
	    

	h1{
		font-size: 26px;
		text-transform:capitalize;
		width: 270px;
		overflow: hidden;
  text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 1.1;
		margin-top: 5px;
		@media (max-width: 540px){
			width: 200px;
		}
	}
	

	a{
			font-size: 16px;
			font-weight: 400;
			color: var(--p);

			text-decoration: none;
}
	h2{
		margin-top: 4px;

		color: var(--o);
    font-size: 18px;
    font-weight: 600;

		
	}
	
}
</style>