import * as types from "~/store/mutation-types";
import axios from "axios";
import Vue from "vue";
export const state = () => ({
  address: {},
  history: [],
  isLoading: true,
});

export const getters = {
  address: state => state.address,
  history: state => state.history,
  isLoading: state => state.isLoading,
};

export const actions = {
  async getAddress( { commit, rootGetters, rootMutation, dispatch }, adr) {
   try{
     // const token = getters.token || localStorage.getItem("user-token") || "";
    // if (!token) {
    //   dispatch("logout");
    //   return;
    // }
    commit(types.CLEAR_ADDRESS);
    commit(types.CLEAR_HISTORY);
    commit(types.SAVE_IS_LOADING_ADDRESS, true);
    const domen = rootGetters["main/server_domen"];
    const url = `${domen}/address/get/${adr}`;
    //const authorization = "Bearer " + token;
    let address = await axios
      .get(url,  {
        headers: {
          //Authorization: authorization
        }
      });
      if (address && address.data.status === true) {

      
        commit(types.SAVE_ADDRESS, {
          address: address.data.data.address,
          balance: address.data.data.balance,
          localeBalance: address.data.data.localeBalance,
          name: address.data.data.name,
          user_id: address.data.data.user_id,
          image: address.data.data.image,
          username: address.data.data.username,
          tags: address.data.data.tags,
        });
          commit(types.ADD_HISTORY, address.data.data.history);
      } else {
        commit(types.CLEAR_ADDRESS);
        commit(types.CLEAR_HISTORY);
      }
   } catch(e) {
    console.log(e)
   } finally{
    commit(types.SAVE_IS_LOADING_ADDRESS, false);
   }
  },

  async getHistory( { commit, rootGetters, rootMutation, dispatch }, {adr, lt, hash, limit}) {
   try{
     // const token = getters.token || localStorage.getItem("user-token") || "";
    // if (!token) {
    //   dispatch("logout");
    //   return;
    // }
    const domen = rootGetters["main/server_domen"];
    const url = `${domen}/address/get`;
    //const authorization = "Bearer " + token;
    let address = await axios
      .post(url,  
        {
          adr,lt,hash,limit
        }
      );
      if (address && address.data.status === true) {
        if (address.data.data.history.length > 0) {
          commit(types.ADD_HISTORY, address.data.data.history);
          return true;
        }
         
      }
   } catch(e) {
    console.log(e)
   }
  },



};

export const mutations = {

  [types.SAVE_ADDRESS](state, address) {
    state.address = address;
  },

  [types.ADD_HISTORY](state, history) {
    state.history = state.history.concat(history);
  },

  [types.SAVE_IS_LOADING_ADDRESS](state, isLoading) {
    state.isLoading = isLoading;
  },

  [types.CLEAR_ADDRESS](state) {
    state.address = {};
    state.history = [];
  },

  [types.CLEAR_HISTORY](state) {
    state.history = [];
  },


};
