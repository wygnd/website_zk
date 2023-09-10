import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Main from "./pages/Main"
import NotFound from "./pages/NotFound"
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from "./utils/consts"

export const authRoutes = [
    { path: ADMIN_ROUTE, component: <Admin /> },
]

export const publicRoutes = [
    { path: MAIN_ROUTE, component: <Main /> },
    { path: LOGIN_ROUTE, component: <Auth /> },
    { path: '*', component: <NotFound /> },
]