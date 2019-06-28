<template>
<div>
    <b-card bg-variant="light" text-variant="dark">
        <b-card-text>
           	<form enctype="multipart/form-data">
                <div class="custom-file">
                    <input type="file" @change="insertFilePrivate" ref="f" class="custom-file-input" id="customFile">
                    <label class="custom-file-label" for="customFile">Add Fotos/Videos (Públicos)</label>
                </div>
                <div class="form-group">
                    <input type="text" v-model="titulo" class="form-control" id="titulo" placeholder="Titulo">
                </div>
                <b-form-textarea
                    maxlength="200"
                    id="textarea"
                    v-model="descricao"
                    placeholder="Escreva uma descrição para a foto! (OPCIONAL)"
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
                <button class="btn btn-success" @click="postFilePrivate()">Adicionar</button>
			</form>
        </b-card-text>
    </b-card>
    <b-card bg-variant="light" text-variant="dark" title="Minhas Fotos Privadas" style="margin-top:3%; margin-bottom:10%">
        <b-card-text>
           	<table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Imagem</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list,key) in lists" :key="key">
                        <td><Foto :url="list.url" :descricao="list.descricao" :titulo="list.nome" /></td>
                        <td>{{ list.nome }}</td>
                        <td ><Modal :idPic="list.id"  /><b-button variant="danger" @click="deletePicture(list.id)" style="color:#ffffff; margin-top:10px">Delete</b-button></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <Pagination style="display: flex; justify-content:flex-end" :totFeed="totPages" :handlerClick="(p)=>getList(p)" :current="current" :limit="perPag" />
            </div>    
        </b-card-text>
    </b-card>
</div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import Modal from "@/components/ModalEditFoto.vue";
import Foto from "@/components/ModalFoto.vue";

export default {
    components:{
        Pagination,
        Modal,
        Foto
    },
    data(){
        return{
            lists:[],
            descricao:'',
            file:'',
            titulo:'',
            perPag:4,
            totPages: "",
            current:'',
        }
    },   
    mounted(){
        this.getList();
        this.getTotList();
    },
    methods:{
        insertFilePrivate(){
            this.$data.file = this.$refs.f.files[0];
        },
        async postFilePrivate(){
            let form = new FormData();
            form.append("nome",this.$data.titulo);
            form.append("descricao",this.$data.descricao);
            form.append("picture", this.$data.file);
            form.append("public", 0);

            let req = await fetch(`http://localhost:9000/pictures/${localStorage.getItem("id")}`,{
                method:"POST",
                headers:{
                    "Authorization":localStorage.getItem("token")
                },
                body:form
            });

            let res = await req.json();

            setTimeout(function() {
                    location.reload()
                }, 1000);
            return;
        },

        rows() {
            return this.lists.length
        },

        async getTotList(){
            
            let req = await fetch(`http://localhost:9000/pictures/private/${localStorage.getItem("id")}`,{
               method:"GET",
               headers:{
                   "Authorization":localStorage.getItem("token")
               }
           });

           let res = await req.json();
           this.totPages = res.length;
       },

       async getList(p){
            
            let page;
            p != null ? page = p : page = 1;
            let req = await fetch(`http://localhost:9000/pictures/private/${localStorage.getItem("id")}/${page}/${this.perPag}`,{
               method:"GET",
               headers:{
                   "Authorization":localStorage.getItem("token")
               }
           });

           let res = await req.json();
           
           for(let i = 0; i < res.length; i++){
               let reqImage = await fetch(`http://localhost:9000/pictures/image/private/${res[i].url}`,{
                method:"GET",
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
               });
               
               reqImage.body.getReader().read().then(({done,value})=>{
                   const blob = new Blob([new Uint8Array(value)]); 
                   const url = window.URL.createObjectURL(blob);
                   res[i].url = url; 
                   this.$data.lists = res;
               });            
           }
           this.current = page;
       },
       
       async deletePicture(picture){
           const req = await fetch(`http://localhost:9000/pictures/delete/${localStorage.getItem("id")}/${picture}`,{
               method:"DELETE",
               headers:{
                    "Authorization":localStorage.getItem("token")
               }
           });
            
            this.$swal({
                title:"Deletado com sucesso!",
                type: 'success',
                confirmButtonColor: '#41b882'
            })

            setTimeout(function() {
                    location.reload()
                }, 1000);
            return; 

       }
    }
}

</script>

<style>

</style>
