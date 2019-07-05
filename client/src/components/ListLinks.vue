<template>
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
</template>

<script>
import { stringify } from 'querystring';
export default {
    data(){
        return{
            link:'',
            titulo:''
        }
    },
    mounted(){
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

            this.$swal({
                title:res,
                type: 'success'
            })

        },
        async getAll(){
            const req = await fetch(`http://localhost:9000/links/${localStorage.getItem('id')}`,{
               headers:{
                   method:'GET',
                   'Authorization':localStorage.getItem('token')
               } 
            });

            const res = await req.json();
            console.log(res);
        }
    }
}
</script>

<style>

</style>
