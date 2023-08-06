<template>
	<div class="profile-history" >
		<div class="profile-history__header">
			<v-skeleton-loader dark :loading="isLoadingAddress" width="200px" height="24px" type="heading">
			<div class="profile-history__wrapped-tab">
				<div class="profile-history__tabs">
				<div @click="tabActive = 'transactions'" :class="['profile-history__tab', tabActive === 'transactions' ? 'profile-history__tab-active' : '']">
					Transactions
				</div>
				<div @click="tabActive = 'nfts'" :class="['profile-history__tab', tabActive === 'nfts' ? 'profile-history__tab-active' : '']">
					NFT <span v-if="nft.length">{{nft.length}}</span>
				</div>
				<div @click="tabActive = 'tokens'" :class="['profile-history__tab', tabActive === 'tokens' ? 'profile-history__tab-active' : '']">
					Jetton <span v-if="token.length">{{token.length}}</span>
				</div>
			</div>
			</div>
			</v-skeleton-loader>
		
		</div>
		<div class="profile-history__wrapper">
			<template v-if="tabActive === 'transactions'">
			
				<template v-if="!isLoadingAddress && history.length > 0">
					<ProfilepartsHistoryitem  :hist="hist" v-for="hist of history"/>
				</template>
				<div v-else-if="!isLoadingAddress" class="profile-history__nf">No transactions</div>

				<infinite-loading v-if="hash && lt" @infinite="handleHistory"></infinite-loading>
					<v-skeleton-loader  v-for="n of 5" dark v-if="isLoadingAddress" :loading="isLoadingAddress" height="73px" type="list-item-avatar-two-line">

		   		 </v-skeleton-loader>
			</template>

			<template v-if="tabActive === 'nfts'">
		
				<ProfilepartsNFT v-if="!isLoadingNFT && nft.length > 0" :nfts="nft"/>
				<div v-else-if="!isLoadingNFT" class="profile-history__nf">No NFTs</div>

				<v-skeleton-loader  v-for="n of 5" dark v-if="isLoadingNFT" :loading="isLoadingNFT" height="73px" type="list-item-avatar-two-line">

		   		 </v-skeleton-loader>
			</template>

			<template v-if="tabActive === 'tokens'">
				<template v-if="!isLoadingToken && token.length > 0">
					<ProfilepartsToken :t="t" v-for="t of token"/>
				</template>
					
				<div v-else-if="!isLoadingToken" class="profile-history__nf">No Tokens</div>

				<v-skeleton-loader  v-for="n of 5" dark v-if="isLoadingToken" :loading="isLoadingToken" height="73px" type="list-item-avatar-two-line">

		   		 </v-skeleton-loader>
			</template>
		
		</div>

	</div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';
import { mapActions, mapMutations, mapGetters } from "vuex";
import * as types from "@/store/mutation-types";
export default{
	 components: {
    InfiniteLoading,
  },
	props:{
		history:{
			type: Array
		},

		address:{
			type: Object
		},
		
		isLoadingAddress: {
			type: Boolean,
			default: true
		},

		nft:{
			type: Array
		},
		token:{
			type: Array
		},
		isLoadingNFT: {
			type: Boolean,
			default: true
		},
		isLoadingToken: {
			type: Boolean,
			default: true
		}
	},

	data() {
		return{
			tabActive: 'transactions',
		}
	},

	methods:{
		...mapActions({
        getHistory: "address/getHistory",
    }),
		async handleHistory($state) {
			try{
				let res = await this.getHistory({adr: this.address.address, hash: this.hash, lt: this.lt, limit: 50})
				if (!res) throw new Error('no transactions');
				$state.loaded();
			
		} catch(e) {
			$state.complete();
		}
		}
	},

	computed: {
		hash(){
			try{
				return this.history[this.history.length-1].transaction_id.hash
			} catch(e) {return};
			
		},
		lt(){
			try{
				return this.history[this.history.length-1].transaction_id.lt
			} catch(e) {return};
		}
	}
};</script>
<style lang="scss">
.profile-history{
	&__nf{
		width: 100%;
		padding: 36px 36px;
		font-size: 20px;
		font-weight: 400;
		color: var(--p);
		text-align: center;
	}
	&__header{
	
		padding: 16px 35px;
		border-bottom: solid 1px rgba(255,255,255,.15);

		@media (max-width: 540px){
          padding: 24px 0;
          font-size: 32px;
          border: unset;
        }
	}

	&__wrapped-tab{
		width: 100%;
		overflow-y: hidden;
		overflow-x: auto;
	}

	&__tabs{
		display: flex;
		width: 100%;
	}
	&__tab{
	display: flex;
		span{
		margin-left: 8px;
		display: inline-block;
		border-radius: 5px;
		background: #c30000;
		color: #fff;
		padding: 0 8px;
		@media (max-width: 540px){
          font-size: 16px;
     
        }
	}
		font-size: 18px;
		line-height: 24px;
		font-weight: 600;
		cursor: pointer;
		color: rgba(255,255,255,.4);
		&-active{
			color: #fff;
		}
		@media (max-width: 540px){
          font-size: 24px;
          line-height: 26px;
        }

		&:not(:last-child){
			margin-right: 36px;
		}
	}
	
}
</style>