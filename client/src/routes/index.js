import Vue from "vue";
import Router from "vue-router";

const Index = () => import("@/components/Index");
const Cadastro = () => import("@/Cadastro");
const Home = () => import("@/Home");

Vue.use(Router);
let t = localStorage.getItem("token");
let router = new Router({
    routes:[
        {
            path:"/",
            name:"Index",
            component: !t ? Index : Home
        },
        {
            path:"/cadastro",
            name:"Cadastro",
            component:Cadastro
        }
    ]
});

export default router;