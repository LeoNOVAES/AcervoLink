<template>
    <div>
        <Header style="margin-bottom:5%"/>
        <div class="container">
            <List/>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import List from "@/components/ListLinks.vue";
import Footer from "@/components/Footer.vue";

export default {
    components:{
        Header,
        Footer,
        List
    }
}
</script>

<style>

</style>
