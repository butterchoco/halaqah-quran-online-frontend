/* eslint-disable */
const state = {
  HasProgramRegistered: false
};

const getters = {
  getHasProgramRegistered: (state: any) => {
    return state.HasProgramRegistered;
  }
};

const mutations = {
  setHasProgramRegistered: (state: any, payload: any) => {
    state.HasProgramRegistered = payload.value;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
