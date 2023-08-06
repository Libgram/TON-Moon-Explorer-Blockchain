<template>
  <div class="explorer-profile-page">

  	<PartsHeader/>


  	<div class="explorer-profile-page__profile container-f">
  		<div class="explorer-profile-page__profile-left">
        <div class="explorer-profile-page__profileInfo">
          <ProfilepartsInfo :isLoadingAddress="isLoadingAddress" :isLoadingProfile="isLoadingProfile" :profile="profile" :address="address" :type="type"/>
          <ProfilepartsBalance :isLoadingAddress="isLoadingAddress" :profile="profile" :address="address" :type="type"/>
          <ProfilepartsAddresses :isLoadingAddress="isLoadingAddress" :profile="profile" :address="address" @getAddress="updateAddressInfo"/>
        </div>
  			<footer class="explorer-profile-page__footer">
          <a href="https://t.me/TONMoonBot" target="_blank">TonMoonBot</a>
          <a href="https://tonmoon.org/explorer/metapanthers" target="_blank">NFT Meta Panthers</a>
          <a href="https://t.me/TONMoonSupportBot" target="_blank">Support</a>
        </footer>
  		</div>
  		<div class="explorer-profile-page__profile-right">
        
  			<ProfilepartsHistory 
        @getHistory="getHistory" 
        :isLoadingAddress="isLoadingAddress"
        :isLoadingNFT="isLoadingNFT"
        :isLoadingToken="isLoadingToken"
        :nft="nft"
        :token="token"
         :address="address" :history="history"/>
  		</div>
  	</div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import * as types from "@/store/mutation-types";
export default {
  name: 'explorerProfilePage',
  data() {
    return {
      type: '',
    }
  },
  computed: {
    ...mapGetters({
      nft: 'NFT/nft',
      isLoadingNFT: 'NFT/isLoading',
      token: 'token/token',
      isLoadingToken: 'token/isLoading',
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
    this.clearToken();
    let search = this.$route.params.address;

    if (search.length === 48) {
       this.type = 'address';
      await this.getAddress(search);
      this.getNFT(search);
      this.getToken(search);

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
        this.getToken(this.profile.addresses[0].address);
      } else{
        this.saveIsLoadingAddress(false);
      }
     
    }
    
  },

  methods: {
    async updateAddressInfo(adr) {
      this.getAddress(adr);
      this.getNFT(adr);
      this.getToken(adr);
    },
      ...mapMutations({
      clearAddress: `address/${types.CLEAR_ADDRESS}`,
      clearProfile: `profile/${types.CLEAR_PROFILE}`,
      clearNFT: `NFT/${types.CLEAR_NFT}`,
      clearToken: `token/${types.CLEAR_TOKEN}`,
      saveIsLoadingProfile: `profile/${types.SAVE_IS_LOADING_PROFILE}`,
      saveIsLoadingAddress: `address/${types.SAVE_IS_LOADING_ADDRESS}`,
      saveIsLoadingNFT: `NFT/${types.SAVE_IS_LOADING_NFT}`,
      saveIsLoadingToken: `token/${types.SAVE_IS_LOADING_TOKEN}`,
    }),
     ...mapActions({
       getProfile: "profile/get",
       getAddress: "address/getAddress",
       getNFT: "NFT/getByAddress",
       getToken: "token/getByAddress",
        getHistory: "address/getHistory",
    }),
  }
};
</script>
<style lang="scss" scoped>

	.explorer-profile-page{

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
        
        width: 500px;
        position: fixed;
        @media (max-width: 1260px){
        margin-top: 30px;
        width: 100%;
          position: unset;
          top: unset;
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

  &__profileInfo{
     border: solid 1px rgba(255,255,255,.15);
     padding: 35px;
    border-radius: 15px;
         @media (max-width: 540px){
            border: unset;
            padding: 35px 0;
            }
    }

  &__footer{
    display: flex;
    margin-top: 16px;
     @media (max-width: 1439px){
        display: none;
        }
    a{
    position: relative;
   
    font-size: 14px;

    &:not(:last-child){
     margin-right: 18px;
  }
      color: var(--p);
      transition: color .3s ease;
      &:hover{
        color: var(--s);
    }
      &:not(:last-child):after{
      position: absolute;
      content: ' · ';
      width: 1px;
      height: 14px;
      right: -8px;
      top: 0;
    }
    }
  }
			
	}


</style>