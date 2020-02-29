const state = {
    isTahfizhProgramAccepted: true
};
const getters = {
  getIsAccepted: () => {
    return state.isTahfizhProgramAccepted;
  }
};
const mutations = {
  setAccepted: (state: any, payload: any) => {
    state.isTahfizhProgramAccepted = payload.value;
  }
};
const actions = {};
export default {
  state,
  getters,
  mutations,
  actions
};
