import * as types from "~/store/mutation-types";
import axios from "axios";
import Vue from "vue";
export const state = () => ({
  nft: [],
  isLoading: true,
});

export const getters = {
  nft: state => state.nft,
  isLoading: state => state.isLoading,
};

export const actions = {
  async getByAddress( { commit, rootGetters, rootMutation, dispatch }, adr) {
   try{
     // const token = getters.token || localStorage.getItem("user-token") || "";
    // if (!token) {
    //   dispatch("logout");
    //   return;
    // }
    commit(types.CLEAR_NFT);
    commit(types.SAVE_IS_LOADING_NFT, true);
    const domen = rootGetters["main/server_domen"];
    const url = `${domen}/nft/getByAddress/${adr}`;
    //const authorization = "Bearer " + token;
    let nft = await axios
      .get(url,  {
        headers: {
          //Authorization: authorization
        }
      });
      if (nft && nft.data.status === true) {
      
        commit(types.SAVE_NFT, nft.data.data);
      } else {
        commit(types.CLEAR_NFT);
      }
   } catch(e) {
    console.log(e)
   } finally{
    commit(types.SAVE_IS_LOADING_NFT, false);
   }
  },

};

export const mutations = {

  [types.SAVE_NFT](state, nft) {
    state.nft = nft;
  },


  [types.SAVE_IS_LOADING_NFT](state, isLoading) {
    state.isLoading = isLoading;
  },

  [types.CLEAR_NFT](state) {
    state.nft = [];
  },




};
