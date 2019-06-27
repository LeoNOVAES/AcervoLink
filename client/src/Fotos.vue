<template>
    <div>
     <Header/>
     <div class="container">
         <List/>
     </div>
     <Footer/>
    </div> 
</template>

<script>
import Header from "@/components/Header.vue";
import List from "@/components/ListaFotos.vue";
import Footer from "@/components/Footer.vue";
export default {
    components:{
        Header,
        List,
        Footer
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
