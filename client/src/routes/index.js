import Vue from "vue";
import Router from "vue-router";

const Index = () => import("@/components/Index");
const Cadastro = () => import("@/Cadastro");

Vue.use(Router);

let router = new Router({
    routes:[
        {
            path:"/",
            name:"Index",
            component:Index,

        },
        {
            path:"/cadastro",
            name:"Cadastro",
            component:Cadastro
        }
    ]
});

export default router;