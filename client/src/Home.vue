<template>
    <div>
        <Header/>
        <Footer/>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
    components:{
        Header,
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
