/* eslint-disable */
const state = {
  selectionPeriod: {
    periodId: "",
    term: ""
  },
  home: {
    headerDescription:
      "Program tahfizh menggunakan aplikasi chat Whatsapp sebagai penghubung antara pembimbing dengan peserta. Keutamaan program ini adalah tidak hanya mengedepankan jumlah hafalan, melainkan juga kualitas hafalan yang baik bagi pesertanya karena dibimbing langsung oleh para ustadz dan ustadzah.",
    timeline: {
      generation: 6,
      dueDate: "30 Januari 2020",
      announcement: "31 Januari 2020",
      paymentDate: "3 Februari 2020",
      classStartDate: "3 Februari 2020",
      programClosing: "22 Maret 2020"
    },
    curriculums: [
      {
        id: 1,
        content:
          "Setoran hafalan baru (ziyadah) secara langsung dengan ustadz dan ustadzah 3 kali / pekan"
      },
      {
        id: 2,
        content:
          "Muroja’ah atau mengulang hafalan yang dipantau dan diujikan secara rutin 1 kali / pekan"
      },
      {
        id: 3,
        content: "Tasmi atau memperdengarkan hafalan kepada teman"
      },
      {
        id: 4,
        content:
          "Ujian satu juz yang baru selesai dihafal untuk lanjut ke juz berikutnya"
      },
      {
        id: 5,
        content:
          "Mutabaah Qur’an atau laporan harian terkait interaksi dengan Qur’an"
      },
      {
        id: 6,
        content: "Kuliah umum"
      }
    ],
    curriculumDescription:
      "Kurikulum yang digunakan pada program ini diadopsi dari Pesantren Tahfizh Qur’an Al-Utsmani dengan penyesuaian. Selain itu, pembimbing program ini adalah ustadz dan ustadzah lulusan Pesantren Tahfizh Qur’an Al-Utsmani. Lebih jelas mengenai kurikulum, pembimbing dan timeline Program Tahfizh Online Qaaf dapat diunduh disini",
    teachers: [
      {
        image: "",
        name: "M.sudarmanto, al-Hafizh",
        lastEducation:
          "Pendidikan Da'i Hafizh Qur'an (PDHQ) Al-Utsmani, MA Al-furqon",
        activity:
          "Kuliah di Al-Hikmah dan Pengajar Tahsin & Tahfizh di PTQ Al - Utsmani",
        contact: {
          facebook: "",
          linkedin: ""
        }
      },
      {
        image: "",
        name: "A. Al Furqoni, al-Hafizh",
        lastEducation: "Takmili LIPIA",
        activity: "Mahasiswa LIPIA",
        contact: {
          facebook: "",
          linkedin: ""
        }
      },
      {
        image: "",
        name: "Siti Masruroh, al-Hafizhah",
        lastEducation:
          "Pendidikan Da'i Hafizh Qur'an (PDHQ) Al-Utsmani, MA ASSALAM, Jawa Timur",
        activity:
          "Pengajar di Pondok Pesantren Darul Ukhuwah (PPDU) putri, Malang, Jawa Timur",
        contact: {
          facebook: "",
          linkedin: ""
        }
      },
      {
        image: "",
        name: "Kunie Takiya Nugrahani",
        lastEducation:
          "Pendidikan Da'i Hafizh Qur'an (PDHQ) Al-Utsmani, FIB UI 2010",
        activity: "Guru Tahfizh SMA IT Buahati",
        contact: {
          facebook: "",
          linkedin: ""
        }
      },
      {
        image: "",
        name: "Ratri Indah Cahyani",
        lastEducation:
          "Pendidikan Da'i Hafizh Qur'an (PDHQ) Al-Utsmani, UNJ 2010",
        activity: "Pengajar Tahsin & Tahfizh di PTQ Al - Utsmani.",
        contact: {
          facebook: "",
          linkedin: ""
        }
      },
      {
        image: "",
        name: "Endang Panny W.",
        lastEducation:
          "Pendidikan Da'i Hafizh Qur'an (PDHQ) Al-Utsmani, Fasilkom UI 2011",
        activity: "Pengajar Tahsin & Tahfizh di PTQ Al - Utsmani.",
        contact: {
          facebook: "",
          linkedin: ""
        }
      }
    ],
    facilities: [
      {
        id: 1,
        image: "",
        content: "Berada dalam lingkungan Al-Qur'an"
      },
      {
        id: 2,
        image: "",
        content: "Ustdaz/Ustadzah berkualitas"
      },
      {
        id: 3,
        image: "",
        content: "Mendapatkan feedback secara langsung oleh Ustdaz/Ustadzah"
      },
      {
        id: 4,
        image: "",
        content: "Hafalan Qur'an bertambah dengan kualitas yang baik"
      },
      {
        id: 5,
        image: "",
        content: "Rekapan laporan perkembangan bacaan per pekan"
      },
      {
        id: 6,
        image: "",
        content: "Sertifikat Tahfizh"
      },
      {
        id: 7,
        image: "",
        content: "Kado Spesial pada akhir program"
      },
      {
        id: 8,
        image: "",
        content: "Hafalan sebelumnya tetap terjaga"
      }
    ]
  }
};

const getters = {
  getIsProgramOpened: (state: any) => {
    if (state.selectionPeriod.periodId !== "") {
      return true
    }
    return false;
  },
  getSelectionPeriodTerm: (state: any) => {
    return state.selectionPeriod.term
  },
  getSelectionPeriodId: (state: any) => {
    return state.selectionPeriod.periodId
  },
  getTimeline: (state: any) => {
    return state.home.timeline;
  },
  getHeaderDescription: (state: any) => {
    return state.home.headerDescription;
  },
  getCurriculumDescription: (state: any) => {
    return state.home.curriculumDescription;
  },
  getAllTeachers: (state: any) => {
    return state.home.teachers;
  },
  getAllCurriculums: (state: any) => {
    return state.home.curriculums;
  },
  getAllFacilities: (state: any) => {
    return state.home.facilities;
  }
};

const mutations = {
  setSelectionPeriod: (state: any, payload: any) => {
    state.selectionPeriod = payload.selectionPeriod
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
