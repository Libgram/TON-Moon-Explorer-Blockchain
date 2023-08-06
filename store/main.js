import * as types from "~/store/mutation-types";

export const state = () => ({
 	server_domen: "https://tonmoon.org/api",
	//server_domen: "http://localhost:3002",

  sidebar: null,
});

export const getters = {
  server_domen: ({ server_domen }) => `${server_domen}/v1`,
  sidebar: ({ sidebar }) => sidebar,
};


export const mutations = {

  [types.SAVE_SIDEBAR](state, data) {
    state.sidebar = data;
  },

 
};
