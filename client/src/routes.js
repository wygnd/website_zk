import Admin from "./pages/Admin/Admin"
import Auth from "./pages/Auth"
import Main from "./pages/Main/Main"
import NotFound from "./pages/NotFound"
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, MAIN_BLOCK_ITEM_ROUTE, NOTFOUND_ROUTE, TOUR_BLOCK_ITEM_ROUTE } from "./utils/consts"
import MainBlockItem from './pages/ItemEdit/MainBlockItem/MainBlockItem';
import TourItem from "./pages/ItemEdit/TourItem/TourItem"

export const authRoutes = [
    { path: ADMIN_ROUTE, component: <Admin /> },
    { path: MAIN_ROUTE, component: <Main /> },
    { path: LOGIN_ROUTE, component: <Auth /> },
    { path: NOTFOUND_ROUTE, component: <NotFound /> },
    { path: MAIN_BLOCK_ITEM_ROUTE + '/:id', component: <MainBlockItem /> },
    { path: TOUR_BLOCK_ITEM_ROUTE + '/:id', component: <TourItem /> },

]

export const publicRoutes = [
    { path: MAIN_ROUTE, component: <Main /> },
    { path: LOGIN_ROUTE, component: <Auth /> },
    { path: NOTFOUND_ROUTE, component: <NotFound /> },
]