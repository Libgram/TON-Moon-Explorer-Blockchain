import * as types from "@/store/mutation-types";

export default async function({ isHMR, app, store, redirect, route, router, req }) {
  const token = localStorage.getItem("user-token");
  store.commit(`auth/${types.SAVE_USER_TOKEN}`, token )
  if (token) await store.dispatch('auth/getUserData');

}
