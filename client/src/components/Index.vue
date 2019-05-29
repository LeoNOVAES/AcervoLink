<template>
    <div>
        <Header/>
        <Banner/>
    </div>  
</template>

<script>
import Banner from '@/components/Banner.vue';
import Header from "@/components/Header.vue";
export default {
    components:{
        Header,
        Banner
    },
    name:"Index"
}
</script>

<style>

</style>
