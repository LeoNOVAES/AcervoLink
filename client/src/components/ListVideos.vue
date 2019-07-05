<template>
<div>
    <b-card bg-variant="light" text-variant="dark">
        <b-card-text>
           	<form enctype="multipart/form-data">
                <div class="custom-file">
                    <input type="file" @change="insertFile" ref="f" class="custom-file-input" id="customFile">
                    <label class="custom-file-label" for="customFile">Add Videos (Privados)</label>
                </div>
                <div class="form-group">
                    <input type="text"  class="form-control" id="titulo" placeholder="Titulo">
                </div>
                <b-form-textarea
                    maxlength="200"
                    id="textarea"
                    placeholder="Escreva uma descrição para a foto! (OPCIONAL)"
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
                <button class="btn btn-success">Adicionar</button>
			</form>
        </b-card-text>
    </b-card>
</div>
</template>

<script>
export default {
    data(){
        return{
            file:''
        }
    },
    methods:{
        insertFile(){
            const size =  this.$refs.f.files[0].size;
            if(size > 10048576){//10 mb
                this.$swal({
                    title:"Arquivo de no maximo 10mb",
                    type: 'warning',
                    confirmButtonColor: '#41b882'
                })
                return;
            }
            console.log("pode")
            this.$data.file = this.$refs.f.files[0];
        }
    }
    
}
</script>

<style>

</style>
