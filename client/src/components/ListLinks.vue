<template>
    <b-card bg-variant="light" text-variant="dark">
        <b-card-text>
            <form enctype="multipart/form-data">
                <div class="form-group">
                    <input type="text"  class="form-control" v-model="titulo" id="titulo" placeholder="Titulo">
                </div>
                <b-form-textarea
                    maxlength="200"
                    id="textarea"
                    placeholder="Escreva uma descrição para a foto! (OPCIONAL)"
                    rows="3"
                    v-model="descricao"
                    max-rows="6"
                ></b-form-textarea>
                <button class="btn btn-success" @click="create" >Adicionar</button>
            </form>
        </b-card-text>
    </b-card>        
</template>

<script>
export default {
    data(){
        return{
            titulo:'',
            descricao:''
        }
    },
    mounted(){
        this.getAll();
    },
    methods:{
        create(){
            
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
