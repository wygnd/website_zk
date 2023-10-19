import Admin from "./pages/Admin/Admin"
import Auth from "./pages/Auth/Auth"
import Main from "./pages/Main/Main"
import Pirvacy from "./pages/Privacy/Privacy"
import NotFound from "./pages/NotFound/NotFound"
import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    MAIN_BLOCK_ITEM_ROUTE,
    NOTFOUND_ROUTE,
    TOUR_BLOCK_ITEM_ROUTE,
    PRIVACY_ROUTE,
    LOGIN_ROUTE_BREADCRUMB,
    PRIVACY_ROUTE_BREADCRUMB,
    NOTFOUND_ROUTE_BREADCRUMB,
    ADMIN_ROUTE_BREADCRUMB
} from "./utils/consts"
import MainBlockItem from './pages/ItemEdit/MainBlockItem/MainBlockItem';
import TourItem from "./pages/ItemEdit/TourItem/TourItem"

export const authRoutes = [
    { path: ADMIN_ROUTE, component: <Admin /> },
    { path: MAIN_ROUTE, component: <Main />, breadcrumb: null },
    { path: LOGIN_ROUTE, component: <Auth />, breadcrumb: LOGIN_ROUTE_BREADCRUMB },
    { path: NOTFOUND_ROUTE, component: <NotFound />, breadcrumb: NOTFOUND_ROUTE_BREADCRUMB },
    { path: MAIN_BLOCK_ITEM_ROUTE + '/:id', component: <MainBlockItem /> },
    { path: TOUR_BLOCK_ITEM_ROUTE + '/:id', component: <TourItem /> },
]

export const publicRoutes = [
    { path: MAIN_ROUTE, component: <Main />, breadcrumb: null },
    { path: LOGIN_ROUTE, component: <Auth />, breadcrumb: LOGIN_ROUTE_BREADCRUMB },
    { path: PRIVACY_ROUTE, component: <Pirvacy />, breadcrumb: PRIVACY_ROUTE_BREADCRUMB },
    { path: NOTFOUND_ROUTE, component: <NotFound />, breadcrumb: NOTFOUND_ROUTE_BREADCRUMB },
]