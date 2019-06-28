<template>
<div>
    <a href="#" @click="show=true" ><img :src="url" height="150px" width="250px"/></a>
    <b-modal :title="titulo" v-model="show" class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        {{descricao}}
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <img :src="url" height="500px" width="100%"/>
            </div>
        </div>
    </b-modal> 
</div>

         
</template>

<script>
export default {
    props:{
        url:"",
        descricao:"",
        titulo:""
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
