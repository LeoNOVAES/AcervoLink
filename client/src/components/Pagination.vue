<template>
  <div class="overflow-auto">
    <div
    v-bind="setTotPag(Math.ceil(feed.length/this.perPag))"
    style="margin-bottom:300px"
    >
    <div v-for="(page,key) in totPages" :key="key" class="pagination">
        <button class="btn btn-light" style="box-shadow: 3px 2px #dddddd; margin:10px; font-weight:bolder" :value="page" @click="getFeedPerPag(page)">{{page}}</button>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      feed:'',
      pages:'',
      object:''
    },
    data() {
       return{
          perPag:2,
          totPages: "",
        }
    },
    mounted(){
      
    },
    methods:{
      setTotPag(t){
        this.totPages = t;
      },
      teste(value){
        alert(value)
        this.currentPage = value;
      }
    }
  }
</script>

<style>
.pagination {
  display: inline;
  
}
</style>