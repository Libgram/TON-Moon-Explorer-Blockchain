import * as types from "~/store/mutation-types";
import axios from "axios";
import Vue from "vue";
export const state = () => ({
  pool: "0"
});

export const getters = {
  pool: state => state.pool,
  history: state => state.history,
  isLoading: state => state.isLoading,
};

export const actions = {
 

  async get( { commit, rootGetters, rootMutation, dispatch }) {
   try{
   
    const domen = rootGetters["main/server_domen"];
    const url = `${domen}/moon/getAll`;
    let address = await axios
      .get(url);
      if (address && address.data.status === true) {
          commit(types.SAVE_POOL_INFO, address.data.data.pool);
          return true;
        
         
      }
   } catch(e) {
    console.log(e)
   }
  },



};

export const mutations = {

  [types.SAVE_POOL_INFO](state, pool) {
    state.pool = pool;
  },


};
