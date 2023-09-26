import Admin from "./pages/Admin/Admin"
import Auth from "./pages/Auth"
import Main from "./pages/Main/Main"
import NotFound from "./pages/NotFound"
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, MAIN_BLOCK_ITEM_ROUTE, NOTFOUND_ROUTE } from "./utils/consts"
import MainBlockItem from './pages/MainBlockItem/MainBlockItem';

export const authRoutes = [
    { path: ADMIN_ROUTE, component: <Admin /> },
    {path: MAIN_BLOCK_ITEM_ROUTE + '/:id', component: <MainBlockItem />},
    { path: MAIN_ROUTE, component: <Main /> },
    { path: LOGIN_ROUTE, component: <Auth /> },
    { path: NOTFOUND_ROUTE, component: <NotFound /> },
]

export const publicRoutes = [
    { path: MAIN_ROUTE, component: <Main /> },
    { path: LOGIN_ROUTE, component: <Auth /> },
    { path: NOTFOUND_ROUTE, component: <NotFound /> },
]