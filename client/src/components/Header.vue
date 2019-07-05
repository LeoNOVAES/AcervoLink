<template>
<div class="header">
    <nav class="navbar navbar-dark navbar-expand-lg bg-danger menu">
        <a class="navbar-brand"  href="#">ACERVO LK</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alterna navegação">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div v-if="!token" class="collapse navbar-collapse list" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item active" style='border-left:1px solid #ffffff;'>
                <a  class="nav-link" href="#/">Home <span class="sr-only">(Página atual)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Comunidade</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Sobre Nós</a>
            </li>
            </ul>
        </div>
        <div v-else class="collapse navbar-collapse list" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active" style='border-left:1px solid #ffffff;'>
                    <a  class="nav-link" href="#/">Home <span class="sr-only">(Página atual)</span></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#/fotos">Fotos</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#/videos">Videos</a>
                </li>
                 <li class="nav-item active">
                    <a class="nav-link" href="#/links">Links</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#/forum">Forúm</a>
                </li>
            </ul>
        </div>
        <ModalEdit v-if="token"/>
    </nav>
    <div>
    </div>
</div>    
</template>

<script>
import ModalEdit from '@/components/ModalEdit.vue';
 export default { 
     components:{
         ModalEdit
     }, 
     data(){
         return {
             token:localStorage.getItem("token")
         }
     }
 }
</script>

<style>
    .menu{
        padding:20px
    }
    .list{
        margin-left:10%;
        font-weight: bolder;
        font-size: 13pt
    }

    .header{
    }
</style>
