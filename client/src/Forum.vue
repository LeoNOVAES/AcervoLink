<template>
    <div>
     <Header/>
     <div class="container">
         <div class="row">
             <div class="col-md-12">    
                 <Feed/>
                
             </div>
         </div>
     </div>
     <Footer/>
    </div>
    
</template>

<script>
import Header from "@/components/Header.vue";
import Feed from "@/components/Feed.vue";
import Footer from "@/components/Footer.vue";

export default {
     components:{
        Header,
        Feed,
        Footer
    }
}
</script>

<style>

</style>
