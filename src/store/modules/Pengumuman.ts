/* eslint-disable */
const state = {
  isTahfizhProgramAccepted: false,
  AnnouncementAvailable: false,
  registrationEvaluation: {
    evaluator: "Bob Bobby",
    report: [
      {
        title: "Kesalahan Harakat",
        content: 0
      },
      {
        title: "Kesalahan Panjang Pendek",
        content: 0
      },
      {
        title: "Kesalahan Gunnah",
        content: 0
      },
    ],
    note: ""
  }
};

const getters = {
  getIsAccepted: (state: any) => {
    return state.isTahfizhProgramAccepted;
  },

  getRegisEvaluation: (state: any) => {
    return state.registrationEvaluation;
  },

  getAnnouncementAvailable: (state: any) => {
    return state.AnnouncementAvailable
  }
};
const mutations = {
  setAccepted: (payload: any) => {
    state.isTahfizhProgramAccepted = payload.value;
  },
  setHarakatScore: (payload: any) => {
    state.registrationEvaluation.report[0].content = payload.value
  },
  setMadScore: (payload: any) => {
    state.registrationEvaluation.report[1].content = payload.value
  },
  setGunnahScore: (payload: any) => {
    state.registrationEvaluation.report[2].content = payload.value
  },
  setAnnouncementAvailable: (payload: any) => {
    state.AnnouncementAvailable = payload.value
  }
};
const actions = {};
export default {
  state,
  getters,
  mutations,
  actions
};
