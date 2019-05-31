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
            <div class="feed" v-for="(image,key ) in feed.url" :key="key">
                <div class="row">
                
                <div class="col-md-12 content">
                    <div class="img">
                        <img :src="image">
                    </div>
                    <div class="descricao">
                        teste
                    </div>    
                </div>
    
                </div>              
            </div>
        </div>
	</div>   

</template>

<script>
export default {
    data(){
        return{
            descricao:'',
            file:'',
            feed:{
                descricao:[],
                url:[]
            },
            images:[]
        }
    },
    created(){
        this.getFeed();
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
                   console.log(url)
                   this.$data.feed.url.push(url);
                   this.$data.feed.descricao.push(res[i].nome);
                   console.log(this.feed)
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
