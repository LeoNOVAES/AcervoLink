<template>
    <div>
     <Header style="margin-bottom: 5%" />
     <div class="container">
         <List />
     </div>
    </div> 
</template>

<script>
import Header from "@/components/Header.vue";
import List from "@/components/ListVideos.vue";
import Feed from "@/components/Feed.vue";
export default {
     components:{
        Header,
        Feed,
        List
    }
}
</script>

<style>

</style>
