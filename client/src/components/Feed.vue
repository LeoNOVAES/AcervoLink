<template>
   <div class="form">
		<div class="post_area">
			<form enctype="multipart/form-data">
                <div class="custom-file">
                    <input type="file" @change="insertFile" ref="f" class="custom-file-input" id="customFile">
                    <label class="custom-file-label" for="customFile">Add Fotos/Videos (Públicos)</label>
                </div>
                <div class="form-group">
                    <input type="text" v-model="titulo" class="form-control" id="titulo" placeholder="Titulo">
                </div>
                <b-form-textarea
                    maxlength="560"
                    id="textarea"
                    v-model="descricao"
                    placeholder="Escreva uma descrição para a foto!"
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
                <button class="btn btn-dark" @click="postFilePublic()">Publicar</button>
			</form>
            <div v-for="(feed , key) in feedPag " :key="key" style="margin-top:20px">
                <b-card  
                    no-body 
                    class="overflow-hidden" 
                    style="max-width:100%;"
                    id="my-table"
                >
                    <b-row no-gutters>
                    <b-col md="6">
                        <b-card-img style="height:250px" :src="feed.url" ></b-card-img>
                    </b-col>
                    <b-col md="6">
                        <b-card-body :title="feed.nome">
                        <b-card-text>
                            {{feed.descricao}}
                        </b-card-text>
                        </b-card-body>
                    </b-col>
                    </b-row>
                </b-card>
            </div>
        </div> 
        <Pagination :totFeed="totFeed" :handlerClick="(p)=>getFeedPerPag(p)" :current="current" :limit="perPag" />
	</div> 
</template>

<script>
import Pagination from "@/components/Pagination.vue";

export default {
    components:{
        Pagination
    },
    data(){
        return{
            descricao:'',
            file:'',
            totFeed:[],
            titulo:'',
            perPag:5,
            totPages: "",
            pages:[],
            feedPag:[],
            current:''
        }
    },
    mounted(){
        this.getTotFeed();
        this.getFeedPerPag();
    },
    methods:{
        insertFile(){
            this.$data.file = this.$refs.f.files[0];
        },
        async postFilePublic(){
            let form = new FormData();
            form.append("nome",this.$data.titulo);
            form.append("descricao",this.$data.descricao);
            form.append("picture", this.$data.file);
            form.append("public", 1);

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
       
       async getTotFeed(){
           let req = await fetch(`http://localhost:9000/pictures/public`,{
               method:"GET",
               headers:{
                   "Authorization":localStorage.getItem("token")
               }
           });

           let res = await req.json();
           this.$data.totFeed = res.length;
       },

       async getFeedPerPag(p){
           
            this.$data.getFeedPerPag = [];
            let page;
            p != null ? page = p : page = 1;
             let req = await fetch(`http://localhost:9000/pictures/pagination/public/${page}/${this.perPag}`,{
               method:"GET",
               headers:{
                   "Authorization":localStorage.getItem("token")
               }
           });

           let res = await req.json();
           
           for(let i = 0; i < res.length; i++){
               let reqImage = await fetch(`http://localhost:9000/pictures/image/public/${res[i].url}`,{
                method:"GET",
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
               });
               reqImage.body.getReader().read().then(({done,value})=>{
                   const blob = new Blob([new Uint8Array(value)]); 
                   const url = window.URL.createObjectURL(blob);
                   res[i].url = url; 
                   this.$data.feedPag = res;
               });
                
           }
           this.current = page; 
       }
    }
}
</script>

<style>

.post_area{
    padding:10px
}
.custom-file{
    margin-bottom:10px
}
#textarea{
    margin-bottom: 10px
}

</style>
