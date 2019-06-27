<template>
  <div class="overflow-auto">
    <div
    v-bind="setTotPag(Math.ceil(totFeed/limit))"
    >
    <div v-for="(page,key) in totPages" :key="key" class="pagination">
        <button class="btn btn-primary" v-if="page == current"  style="box-shadow: 3px 2px #dddddd; margin:10px; font-weight:bolder" :value="page" @click="handlerClick(page)">{{page}}</button>
        <button class="btn btn-light" v-else  style="box-shadow: 3px 2px #dddddd; margin:10px; font-weight:bolder" :value="page" @click="handlerClick(page)">{{page}}</button>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      totFeed:'',
      handlerClick:"",
      limit:"",
      current:""
    },
    data() {
       return{
          totPages: ""
        }
    },
    methods:{
      setTotPag(t){
        this.totPages = t;
      }
    }
  }
</script>

<style>
.pagination {
  display: inline;
}
</style>