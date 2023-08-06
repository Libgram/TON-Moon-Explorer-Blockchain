// import * as types from "~/store/mutation-types";
// // import axios from "axios";


// export const state = () => ({
//   is_authenticated: false,
//   token: "",
//   user: null,
// });

// export const getters = {
//   // User
//   is_authenticated: state => state.is_authenticated,
//   token: state => state.token,
//   user: state => state.user,


// };

// export const actions = {
//   async login(
//     { commit, rootGetters, dispatch, redirect },
//     { data }) {
//     const domen = rootGetters["main/server_domen"];
//     const url = `${domen}/auth/login`;

//     await axios
//       .post(url, data)
//       .then(async(response) => {
//         if (response.data.status === true) {
//           commit(types.SAVE_USER_TOKEN, response.data.data.token);
//           localStorage.setItem('user-token', response.data.data.token);
      
//           await dispatch("getUserData");

//         } else {
//          alert('err')
//         }

  
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   },

//   async getUserData({ commit, dispatch, getters, rootGetters }) {
//     const token = getters.token || localStorage.getItem("user-token") || "";
//     if (!token) {
//       dispatch("logout");
//       return;
//     }
//     const domen = rootGetters["main/server_domen"];
//     const url = `${domen}/user/get`;
//     const authorization = "Bearer " + token;

//     await axios
//       .get(url, {
//         headers: {
//           Authorization: authorization
//         }
//       })
//       .then(response => {
//         if (response.data.status === true) {
//           commit(types.SAVE_USER_INFO, response.data.data);
//         } else {
//           commit(types.SAVE_USER_INFO, null);
//         }
//       })
//       .catch(error => {
//         console.log(error);
//         /*if (error.message.includes("401")) {
//           dispatch("logout");
//         }*/
//       });
//   },



//   logout({ commit, state, dispatch }) {
//     commit(types.DELETE_USER_INFO);
//     location.reload();


//   }
// };

// export const mutations = {

//   [types.SAVE_USER_TOKEN](state, token) {
//     state.token = token;
//   },

//   [types.SAVE_USER_INFO](state, info) {
//     if (info) state.user = info;

//     state.is_authenticated = !!info;
//   },

//   [types.DELETE_USER_INFO](state) {
//     localStorage.removeItem("user-token");
//     state.user = null;
//     state.token = null;
//     state.is_authenticated = false;
//   },
// };
