<template>
<div style="margin-bottom:10%" >
    <b-card bg-variant="light" text-variant="dark">
        <b-card-text>
            <form>
                <div class="form-group">
                    <input type="text"  class="form-control" v-model="titulo" placeholder="Titulo">
                </div>
                <div class="form-group">
                    <input type="text"  class="form-control" v-model="link"  placeholder="Link">
                </div>   
                <button class="btn btn-success" @click="create" >Adicionar</button>
            </form>
        </b-card-text>
    </b-card>
    <table class="table table-striped" style="margin-top:5%">
        <thead>
            <tr>
            <th scope="col">Criado</th>
            <th scope="col">Titulo</th>
            <th scope="col">link</th>
            <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(link,key) in links" :key="key">
                <th scope="row">{{dataFormat(link.createdAt)}}</th>
                <td>{{link.descricao}}</td>
                <td><a :href="'http://'+link.link" target="blank">{{ link.link }}</a></td>
                <td><button style="margin-right:20px" class="btn btn-warning" >Editar</button><button class="btn btn-danger" @click="deleteLink(link.id)">Excluir </button></td>
            </tr>
        </tbody>
    </table>
    <div>
        <Pagination :totFeed="totPages" :handlerClick="(p)=>getAll(p)" :current="current" :limit="perPag" />
    </div>    
</div>            
</template>

<script>
import { stringify } from 'querystring';
import Pagination from "@/components/Pagination.vue";


export default {
    components:{
        Pagination
    },
    data(){
        return{
            link:'',
            titulo:'',
            links:[],
            perPag:10,
            totPages: "",
            current:''
        }
    },
    mounted(){
        this.getTotAll();
        this.getAll();
    },
    methods:{
        async create(){
            const data = {
                link:this.$data.link,
                descricao:this.$data.titulo
            }
            console.log(data)
            const req = await fetch(`http://localhost:9000/links/create/${localStorage.getItem('id')}`,{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':localStorage.getItem('token')
                },
                body:JSON.stringify(data)
            });

            const res = await req.json();

            setTimeout(function() {
                    location.reload()
            }, 2000);
            return;

        },

         async getTotAll(){
             
            const req = await fetch(`http://localhost:9000/links/total/${localStorage.getItem('id')}`,{
               headers:{
                   'Authorization':localStorage.getItem('token')
               } 
            });
            
            const res = await req.json();
            this.$data.totPages = res.length;
        },

        async getAll(p){

            let page;
            p != null ? page = p : page = 1;

            const req = await fetch(`http://localhost:9000/links/${localStorage.getItem('id')}/${page}/${this.perPag}`,{
               headers:{
                   'Authorization':localStorage.getItem('token')
               } 
            });

            const res = await req.json();
            this.$data.current = page;
            this.$data.links = res;
        },

        async deleteLink(id){
            const req = await fetch(`http://localhost:9000/links/delete/${localStorage.getItem('id')}/${id}`,{
                method:'DELETE',
                headers:{
                   'Authorization':localStorage.getItem('token')
               } 
            });

            const res = await req.json();
            
            setTimeout(function() {
                    location.reload()
            }, 2000);
            return; 
        },

        dataFormat(data){

            const date =  new Date(data).toLocaleDateString();
            return date;
        }

    }
}
</script>

<style>

</style>
