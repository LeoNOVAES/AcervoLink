<template>
<div>
        <a href="#" @click="show=true" ><img :src="url" height="150px" width="250px"/></a>
        <b-modal v-model="show" id="modal-scrollable" scrollable :title="descricao">
            <img :src="url" width="100%"/>
        </b-modal>
</div>  
</template>

<script>
export default {
    props:{
        url:"",
        descricao:""
    },
    data(){
        return{
            show: false,
            erros:[],
            user:{
                email:'',
                password:'',
                
            }
        }
    }
}
</script>

<style>

</style>
