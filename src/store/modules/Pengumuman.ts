/* eslint-disable */
const state = {
  isTahfizhProgramAccepted: true,
  registrationEvaluation: {
    evaluator: "Bob Bobby",
    report: [
      {
        title: "Kesalahan Harakat",
        content: 2
      },
      {
        title: "Kesalahan Panjang Pendek",
        content: 2
      },
      {
        title: "Kesalahan Gunnah",
        content: 2
      }
    ]
  }
};

const getters = {
  getIsAccepted: (state: any) => {
    return state.isTahfizhProgramAccepted;
  },

  getRegisEvaluation: (state: any) => {
    return state.registrationEvaluation;
  }
};
const mutations = {
  setAccepted: (payload: any) => {
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
