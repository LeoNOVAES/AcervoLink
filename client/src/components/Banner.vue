<template>
    <div class="container-fluid banner bg-light">
        <div class="row content">
                <div class="col-md-6 item">
                    <h2>Seus Conteúdos na Hora que quiser! Adicione seu Video, Link ou Foto</h2>
                    <p class="text-danger">para sua segurança é tudo criptografado, faça seu login agora mesmo e não decepcione seu Cachorro.</p>
                    <Modal/>
                </div>
                 
                <div class="col-md-4 item"> 
                    <Form/>
                </div>
            </div>
    </div>
</template>

<script>
import Form from "@/components/FormCadastro.vue"
import Modal from '@/components/Modal.vue';

export default {
    components:{
        Form,
        Modal
    }

}
</script>

<style>
    .content{
        margin-left: 15%;
    }
    .banner{
        height: auto;
    }
    .item{
        margin-top: 5%;
        margin-bottom: 5%
    }
    .item h2,p{
        font-weight: bolder
    }
    .item a{
        padding-left: 30px;
        padding-right: 30px;
        padding-top:10px;
        padding-bottom:10px
    }

</style>
