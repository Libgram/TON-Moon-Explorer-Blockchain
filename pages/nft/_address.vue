<template>
  <div class="nft-page">

  	<PartsHeader/>


  	<div class="nft-page__profile container-f">
  		<div class="nft-page__profile-left">
        <img src="" alt="">
  		</div>
  		<div class="nft-page__profile-right">
  			<ProfilepartsHistory 
        @getHistory="getHistory" 
        :isLoadingAddress="isLoadingAddress"
        :isLoadingNFT="isLoadingNFT"
        :nft="nft"
         :address="address" :history="history"/>
  		</div>
  	</div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import * as types from "@/store/mutation-types";
export default {
  name: 'nftPage',
  data() {
    return {
      type: '',
    }
  },
  computed: {
    ...mapGetters({
      nft: 'NFT/nft',
      isLoadingNFT: 'NFT/isLoading',
      profile: 'profile/profile',
      isLoadingProfile: 'profile/isLoading',
      address: 'address/address',
      history: 'address/history',
      isLoadingAddress: 'address/isLoading',
    }),
  },
  async created() {
    this.clearAddress();
    this.clearProfile();
    this.clearNFT();
    let search = this.$route.params.address;

    if (search.length === 48) {
       this.type = 'address';
      await this.getAddress(search);
      this.getNFT(search);

      if (this.address && this.address.user_id) {
        await this.getProfile({type: 'user_id', search: this.address.user_id});
      } else{
        this.saveIsLoadingProfile(false);
      }
      
    } else{
      this.type = "profile"
      await this.getProfile({type: 'username', search: search.toLowerCase()});
      if (this.profile && Array.isArray(this.profile.addresses) && this.profile.addresses.length > 0) {
        await this.getAddress(this.profile.addresses[0].address);
        this.getNFT(this.profile.addresses[0].address);
      } else{
        this.saveIsLoadingAddress(false);
      }
     
    }
    
  },

  methods: {
    async updateAddressInfo(adr) {
      this.getAddress(adr);
      this.getNFT(adr);
    },
      ...mapMutations({
      clearAddress: `address/${types.CLEAR_ADDRESS}`,
      clearProfile: `profile/${types.CLEAR_PROFILE}`,
      clearNFT: `NFT/${types.CLEAR_NFT}`,
      saveIsLoadingProfile: `profile/${types.SAVE_IS_LOADING_PROFILE}`,
      saveIsLoadingAddress: `address/${types.SAVE_IS_LOADING_ADDRESS}`,
      saveIsLoadingNFT: `NFT/${types.SAVE_IS_LOADING_NFT}`,
    }),
     ...mapActions({
       getProfile: "profile/get",
       getAddress: "address/getAddress",
       getNFT: "NFT/getByAddress",
        getHistory: "address/getHistory",
    }),
  }
};
</script>
<style lang="scss" scoped>

	.nft-page{

	 height: 100vh;

		&__profile{
		padding-top: 60px;
		padding-bottom: 60px;
    position: relative;
			display: flex;
			justify-content: space-between;
          align-items: flex-start;
        @media (max-width: 1260px){
        flex-direction: column;
        }
      &-left{
        top: 100px;
        padding: 35px;
        border-radius: 15px;
        border: solid 1px rgba(255,255,255,.15);
        width: 500px;
        position: fixed;
        @media (max-width: 1260px){
        margin-top: 30px;
        width: 100%;
          position: unset;
          top: unset;
        }

         @media (max-width: 540px){
          border: unset;
          padding: 35px 0;
          }
      }

      &-right{
        width: 670px;
        top: 100px;
        position: absolute;
        right: 0;
      
        border-radius: 15px;
        border: solid 1px rgba(255,255,255,.15);
        @media (max-width: 1260px){
          margin-top: 30px;
          width: 100%;
          position: unset;
          top: unset;
        }
        @media (max-width: 540px){
          border: unset;
          padding: 0 0 35px 0;
        }
      }
	}
			
	}
</style>