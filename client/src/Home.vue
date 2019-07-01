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
import List from "@/components/ListHome.vue";
import Footer from "@/components/Footer.vue";

export default {
    components:{
        Header,
        List,
        Footer
    },
    data(){
        return{
            password:''
        }
    },
    mounted(){
       
    },
    methods:{
        
    }
}
</script>

<style>

</style>
