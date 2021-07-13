import Home from '../pages/Home'
import Basket from '../pages/Basket'

export default [
    {
        path: '',
        redirect: '/home',
        component: Home,
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/basket',
        component: Basket,
    }
]