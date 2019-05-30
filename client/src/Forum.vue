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
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Feed from "@/components/Feed.vue";
export default {
     components:{
        Header,
        Feed
    }
}
</script>

<style>

</style>
