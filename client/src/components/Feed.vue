<template>
   <div class="form">
		<div class="post_area">
			<form enctype="multipart/form-data">
                <div class="custom-file">
                    <input type="file" @change="insertFile" ref="f" class="custom-file-input" id="customFile">
                    <label class="custom-file-label" for="customFile">Add Fotos/Videos (Públicos)</label>
                </div>
                <b-form-textarea
                id="textarea"
                v-model="descricao"
                placeholder="Escreva uma descrição para a foto!"
                rows="3"
                max-rows="6"
                ></b-form-textarea>
                <button class="btn btn-dark" @click="postFilePublic()">Publicar</button>
			</form>
            <div v-for="(feed , key) in feed " :key="key" style="margin-top:20px">
                <b-card  
                no-body 
                class="overflow-hidden" 
                style="max-width:100%;"
                id="my-table"
                :items="feed"
                :per-page="perPage"
                :current-page="currentPage"
                small
                >
                    <b-row no-gutters>
                    <b-col md="6">
                        <b-card-img :src="feed.url" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="6">
                        <b-card-body :title="feed.nome">
                        <b-card-text>
                            This is a wider card with supporting text as a natural lead-in to additional content.
                            This content is a little bit longer.
                        </b-card-text>
                        </b-card-body>
                    </b-col>
                    </b-row>
                </b-card>
            </div>
        </div>
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
            feed:[],
            images:[],
            perPage: 3,
            currentPage: 1,
            items: [
              
            ]
        }
    },
    created(){
        this.getFeed();
    },
     computed: {
      rows() {
        return this.feed.length
      }
    },
    methods:{
        insertFile(){
            this.$data.file = this.$refs.f.files[0];
        },
        async postFilePublic(){
            let form = new FormData();
            form.append("nome",this.$data.descricao);
            form.append("picture", this.$data.file);
            form.append("public", true);

            let req = await fetch(`http://localhost:9000/pictures/${localStorage.getItem("id")}`,{
                method:"POST",
                headers:{
                    "Authorization":localStorage.getItem("token")
                },
                body:form
            });

            let res = await req.json();
            this.$swal({
                title:res,
                type: 'success',
                buttons:false
            });

            setTimeout(function() {
                    location.reload()
                }, 1000);
            return;
        },
       
       async getFeed(){
           let req = await fetch(`http://localhost:9000/pictures/public`,{
               method:"GET",
               headers:{
                   "Authorization":localStorage.getItem("token")
               }
           });

           let res = await req.json();
           console.log(res)
           
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
                   
                   this.$data.feed.push(res[i]);
                   console.log(res[i])
               })
                
           }

       }
    }
}
</script>

<style>
.form{
    margin-top:50px
}
.post_area{
    padding:10px
}
.custom-file{
    margin-bottom:10px
}
#textarea{
    margin-bottom: 10px
}
.img{
    width:40%;
    display: block;
    align-items: center
}
.img img{
    width:100%;
}

.descricao{
        margin-left:100px
}

.content{
    padding:20px;
    margin-top:20px;
    margin-bottom:10px;
    display: flex;
    border:1px solid #dddddd;
}
</style>
