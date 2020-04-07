import Home from "@/views/Home.vue";
import DataCalonPeserta from "@/views/DataCalonPeserta.vue";
import NotFound from "@/views/NotFound.vue";
import Maintenance from "@/views/Maintenance.vue"
import Activation from "@/views/Activation.vue";
import ProgramRegistration from "@/views/ProgramRegistration.vue";
import RegistrationClosed from "@/views/RegistrationClosed.vue";
import RegistrationSuccess from "@/views/RegistrationSuccess.vue";
import Forbidden from "@/views/ForbiddenRole.vue"
import LoginForbidden from "@/views/LoginForbidden.vue"
import AnnouncementSuccess from "@/views/AnnouncementSuccess.vue"
import AnnouncementFailed from "@/views/AnnouncementFailed.vue"

const routes = [
    {
        path: "*",
        name: "NotFound",
        component: NotFound
    },
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        component: Maintenance
    },
    {
        path: "/program",
        name: "Program",
        component: Maintenance
    },
    {
        path: "/activate/:uid/:token",
        name: "Activation",
        component: Activation
    }, {
        path: "/program-registration",
        name: "Program Registration",
        component: ProgramRegistration
    },
    {
        path: "/regis-success",
        name: "RegistrationSuccess",
        component: RegistrationSuccess
    },
    {
        path: "/regis-closed",
        name: "RegistrationClosed",
        component: RegistrationClosed
    },
    {
        path: "/data-calon-peserta",
        name: "DataCalonPeserta",
        component: DataCalonPeserta
    },
    {
        path: "/forbidden",
        name: "Forbidden",
        component: Forbidden
    },
    {
        path: "/login-forbidden",
        name: "LoginForbidden",
        component: LoginForbidden
    },
    {
        path: "/announcement-success",
        name: "AnnouncementSuccess",
        component: AnnouncementSuccess
    },
    {
        path: "/announcement-failed",
        name: "AnnouncementFailed",
        component: AnnouncementFailed
    },
];

export default routes;