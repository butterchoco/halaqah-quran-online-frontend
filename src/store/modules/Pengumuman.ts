/* eslint-disable */
const state = {
  isTahfizhProgramAccepted: false,
  AnnouncementAvailable: false,
  registrationEvaluation: {
    evaluator: "",
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
    isPassed: "",
    tahsinLevel: "",
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
  },
  getIsPassed: (state: any) => {
    return state.registrationEvaluation.isPassed
  },
  getTahsinLevel: (state: any) => {
    return state.registrationEvaluation.tahsinLevel
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
  },
  setEvaluator: (payload: any) => {
    state.registrationEvaluation.evaluator = payload.value
  },
  setPassed: (payload: any) => {
    state.registrationEvaluation.isPassed = payload.value
  },
  setTahsinLevel: (payload: any) => {
    state.registrationEvaluation.tahsinLevel = payload.value
  }
};
const actions = {
  setAccepted: ({ state }: any, payload: any) => {
    state.isTahfizhProgramAccepted = payload.value;
  },
  setHarakatScore: ({ state }: any, payload: any) => {
    state.registrationEvaluation.report[0].content = payload.value
  },
  setMadScore: ({ state }: any, payload: any) => {
    state.registrationEvaluation.report[1].content = payload.value
  },
  setGunnahScore: ({ state }: any, payload: any) => {
    state.registrationEvaluation.report[2].content = payload.value
  },
  setAnnouncementAvailable: ({ state }: any, payload: any) => {
    state.AnnouncementAvailable = payload.value
  },
  setEvaluator: ({ state }: any, payload: any) => {
    state.registrationEvaluation.evaluator = payload.value
  },
  setPassed: ({ state }: any, payload: any) => {
    state.registrationEvaluation.isPassed = payload.value
  },
  setTahsinLevel: ({ state }: any, payload: any) => {
    state.registrationEvaluation.tahsinLevel = payload.value
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
