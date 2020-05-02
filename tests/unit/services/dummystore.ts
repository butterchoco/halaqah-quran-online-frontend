/* eslint-disable */
import Cookies from "js-cookie"

const state = {
    accessToken: null,
    refreshToken: null,
    isProgramOpened: true,
    user: {
        id: "",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        role: [
            {
                role_id: 0,
                description: ""
            }
        ],
        whatsappNumber: "",
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
    },
    alert: {
        visible: false,
        title: "Koneksi terputus",
        messageError: "Silahkan segarkan kembali halaman anda !"
    },
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
        ],
        isPassed: false,
        tahsinLevel: 1,
        note: "Lorem Ipsum"
    },
    HasProgramRegistered: false,
    latest_opened: {
        id: "1",
        term: "test",
        urlWhatsappGroup: "test",
        start_time: "test",
        end_time: "test",
        category: "test"
    },
    AnnouncementAvailable: false,
}

const getters = {
    getRegistrationPeriodOpened: (state: any) => {
        if (state.latest_opened.category === "registration") {
            return true
        }
        return false;
    },
    getParticipantSelectionPeriodOpened: (state: any) => {
        if (state.latest_opened.category === "participant_selection") {
            return true
        }
        return false;
    },
    getSchedulePeriodOpened: (state: any) => {
        if (state.latest_opened.category === "schedule_choice") {
            return true
        }
        return false;
    },
    getPaymentPeriodOpened: (state: any) => {
        if (state.latest_opened.category === "payment") {
            return true
        }
        return false;
    },
    getClassPeriodOpened: (state: any) => {
        if (state.latest_opened.category === "class") {
            return true
        }
        return false;
    },
    getRefreshToken: (state: any) => {
        return state.refreshToken;
    },
    getAccessToken: (state: any) => {
        return state.accessToken;
    },
    isUserLoggedIn: (state: any) => {
        if (state.accessToken != null && state.refreshToken != null) {
            return true
        }
        return false
    },
    getFullname: (state: any) => {
        return state.user.firstName + " " + state.user.lastName
    },
    getUsername: (state: any) => {
        return state.user.username
    },
    getUserId: (state: any) => {
        return state.user.id
    },
    getUserRole: (state: any) => {
        return state.user.role
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
    },
    getIsAccepted: (state: any) => {
        return state.isTahfizhProgramAccepted;
    },
    getRegisEvaluation: (state: any) => {
        return state.registrationEvaluation;
    },
    getHasProgramRegistered: (state: any) => {
        return state.HasProgramRegistered;
    },
    getShowAlertError: (state: any) => {
        return state.alert.visible
    },
    getTitleAlertError: (state: any) => {
        return state.alert.title
    },
    getMessageAlertError: (state: any) => {
        return state.alert.messageError
    },
    getUrlWhatsappGroup: (state: any) => {
        return state.latest_opened.urlWhatsappGroup
    },
    getTermName: (state: any) => {
        return state.latest_opened.term
    },
    getPeriodId: (state: any) => {
        return state.latest_opened.id
    },
    getPeriodStart: (state: any) => {
        return state.latest_opened.start_time
    },
    getPeriodEnd: (state: any) => {
        return state.latest_opened.end_time
    },
    getPeriodCategory: (state: any) => {
        return state.latest_opened.category
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
}

const mutations = {
    setProgramOpened: (state: any, payload: any) => {
        state.isProgramOpened = payload.value;
    },
    setHasProgramRegistered: (state: any, payload: any) => {
        state.HasProgramRegistered = payload.value;
    },
    setAccepted: (payload: any) => {
        state.isTahfizhProgramAccepted = payload.value;
    },
    setShowAlertError: (state: any, payload: any) => {
        state.alert.visible = payload.value
    },
    setTitleAlertError: (state: any, payload: any) => {
        state.alert.title = payload.value
    },
    setMessageAlertError: (state: any, payload: any) => {
        state.alert.messageError = payload.value
    },
    setRefreshToken: (state: any, payload: any) => {
        Cookies.set("HolyKuncen", payload.value, { expires: 0.5, secure: true })
    },
    setAccessToken: (state: any, payload: any) => {
        Cookies.set("KuncenPuma", payload.value, { expires: 0.01, secure: true })
    },
    removeToken: (state: any) => {
        Cookies.remove("KuncenPuma")
        Cookies.remove("HolyKuncen")
    },
    removeAccessToken: (state: any) => {
        Cookies.remove("KuncenPuma")
    },
    setUserInfo: (state: any, payload: any) => {
        state.user = payload.user
    },
    setUserRole: (state: any, payload: any) => {
        state.user.role = payload.role
    },
    setPeriod: (state: any, payload: any) => {
        state.latest_opened = payload.latest_opened
    },
    setPeriodCategory: (state: any, payload: any) => {
        state.latest_opened.category = payload.value
    },
    setAnnouncementAvailable: (state: any, payload: any) => {
        state.AnnouncementAvailable = payload.value
    },
    setEvaluator: (state: any, payload: any) => {
        state.registrationEvaluation.evaluator = payload.value
    },
    setPassed: (state: any, payload: any) => {
        state.registrationEvaluation.isPassed = payload.value
    },
    setTahsinLevel: (state: any, payload: any) => {
        state.registrationEvaluation.tahsinLevel = payload.value
    }
}

const actions = {
    showAlertError: ({ commit }: any) => {
        commit("setShowAlertError", {
            value: true,
        })
    },
    hideAlertError: ({ commit }: any) => {
        commit("setShowAlertError", {
            value: false
        })
    },
    setAlertError: ({ commit }: any, payload: any) => {
        commit("setTitleAlertError", { value: payload.title })
        commit("setMessageAlertError", { value: payload.message })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}