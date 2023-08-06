import * as types from "~/store/mutation-types";
import axios from "axios";
import Vue from "vue";
export const state = () => ({
  profile: {},
  isLoading: true,
});

export const getters = {
  profile: state => state.profile,
  isLoading: state => state.isLoading,
};

export const actions = {
  async get( { commit, rootGetters, rootMutation, dispatch },{ type, search} ) {
   try{
     // const token = getters.token || localStorage.getItem("user-token") || "";
    // if (!token) {
    //   dispatch("logout");
    //   return;
    // }
    commit(types.CLEAR_PROFILE);
    commit(types.SAVE_IS_LOADING_PROFILE, true);
    const domen = rootGetters["main/server_domen"];
    let url = `${domen}/profile/get/${search}`;
    if (type === 'user_id') {
      url = `${domen}/profile/getByUserId/${search}`;
    }
    //const authorization = "Bearer " + token;

    let profile = await axios
      .get(url,  {
        headers: {
          //Authorization: authorization
        }
      });
      
      if (profile && profile.data.status === true) {
        commit(types.SAVE_PROFILE, profile.data.data);
      } else {
        commit(types.SAVE_PROFILE, {});
      }
   } catch(e) {
    console.log(e)
   } finally{
    commit(types.SAVE_IS_LOADING_PROFILE, false);
   }
  },



};

export const mutations = {

  [types.SAVE_PROFILE](state, profile) {
    state.profile = profile;
  },

  [types.SAVE_IS_LOADING_PROFILE](state, isLoading) {
    state.isLoading = isLoading;
  },

  [types.CLEAR_PROFILE](state) {
    state.profile = {};
  },

};
