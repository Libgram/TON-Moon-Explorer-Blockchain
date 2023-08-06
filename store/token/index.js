import axios from "axios";
import Vue from "vue";
import * as types from "~/store/mutation-types";
export const state = () => ({
  token: [],
  isLoading: true,
});

export const getters = {
  token: state => state.token,
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
    commit(types.CLEAR_TOKEN);
    commit(types.SAVE_IS_LOADING_TOKEN, true); 

    const domen = rootGetters["main/server_domen"];
    const url = `${domen}/jetton/getByAddress/${adr}`;
    //const authorization = "Bearer " + token;
    let jettons = await axios
      .get(url,  {
        headers: {
          //Authorization: authorization
        }
      });
      if (jettons && jettons.data && jettons.data.status === true) {
        if (jettons.data.data && jettons.data.data.jettons && jettons.data.data.jettons.length > 0) {
             commit(types.SAVE_TOKEN, jettons.data.data.jettons);
        }
      } else {
        commit(types.CLEAR_TOKEN);
      }
   } catch(e) {
    console.log(e)
   } finally{
    commit(types.SAVE_IS_LOADING_TOKEN, false);
   }
  },

};

export const mutations = {

  [types.SAVE_TOKEN](state, token) {
    state.token = token;
  },


  [types.SAVE_IS_LOADING_TOKEN](state, isLoading) {
    state.isLoading = isLoading;
  },

  [types.CLEAR_TOKEN](state) {
    state.token = [];
  },




};
