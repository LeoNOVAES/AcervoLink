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
            <img :src="images[0]"  />
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
                url:'',
                descricao:''
            },
            images:[]
        }
    },
    mounted(){
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
                confirmButtonColor: '#41b882'
            });
        },
       
       async getFeed(){
           let req = await fetch(`http://localhost:9000/pictures/public/${localStorage.getItem("id")}`,{
               method:"GET",
               headers:{
                   "Authorization":localStorage.getItem("token")
               }
           });

           let res = await req.json();
           this.$data.feed.descricao = res.nome;
           
           for(let i = 0; i < res.length; i++){
               console.log(res[i].url)
               let reqImage = await fetch(`http://localhost:9000/pictures/image/private/${res[i].url}`,{
                method:"GET",
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
               });
                this.images[i] = reqImage.body.getReader();
                console.log(this.images[i])
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

</style>
