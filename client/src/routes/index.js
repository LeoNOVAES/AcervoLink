import Vue from "vue";
import Router from "vue-router";

const Index = () => import("@/components/Index");
const Cadastro = () => import("@/Cadastro");
const Home = () => import("@/Home");
const Forum = () => import("@/Forum");
const Fotos = () => import("@/Fotos");
const Videos = () => import("@/Videos");
const Teste = () => import("@/Teste");

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
            beforeEnter:(to,from,next)=>{
                if(!t) next(true)
                else next('/')
            },
            component:Cadastro
        },
        {
            path:"/forum",
            name:"Forum",
            beforeEnter:(to,from,next)=>{
                if(!t) next('/')
                else next(true);
            },
            component:Forum
        },
        {
            path:"/videos",
            name:"Videos",
            beforeEnter:(to,from,next)=>{
                if(!t) next('/')
                else next(true);
            },
            component:Videos
        },
        {
            path:"/fotos",
            name:"Fotos",
            beforeEnter:(to,from,next)=>{
                if(!t) next('/')
                else next(true);
            },
            component:Fotos
        },
    ]
});

export default router;