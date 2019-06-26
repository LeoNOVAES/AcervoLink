<template>
    <div>
        <Header/>
        <Banner/>
        <Footer/>
    </div>  
</template>

<script>
import Banner from '@/components/Banner.vue';
import Header from "@/components/Header.vue";
import Footer from '@/components/Footer.vue';
export default {
    components:{
        Header,
        Banner,
        Footer
    },
    name:"Index"
}
</script>

<style>

</style>
