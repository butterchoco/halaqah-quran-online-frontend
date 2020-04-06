/* eslint-disable */
const state = {
  isTahfizhProgramAccepted: false,
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
  getIsAccepted: () => {
    return state.isTahfizhProgramAccepted;
  },

  getRegisEvaluation: () => {
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
