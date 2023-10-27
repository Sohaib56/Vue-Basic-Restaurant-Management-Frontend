import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
import AddResturant from './components/AddResturant.vue'
import UpdateResturant from './components/UpdateResturant.vue'
import { createRouter,createWebHistory } from "vue-router"

const routes=[
    {
        name:'Home',
        component:Home,
        path:'/'
    },
    {
        name:'SignUp',
        component:SignUp,
        path:'/sign-up'
    },
    {
        name:'Login',
        component:Login,
        path:'/login'
    },
    {
        name:'AddResturant',
        component:AddResturant,
        path:'/add'
    },
    {
        name:'UpdateResturant',
        component:UpdateResturant,
        path:'/update/:id'
    },
]
const router=createRouter({
    history:createWebHistory(),
    routes
})
export default router