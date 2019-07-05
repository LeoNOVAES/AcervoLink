<template>
<div>
    <div class="mt-3" >
        <b-card-group  deck >
              <div class="card bg-dark cardListEntrar" style="padding:10px">
                <div class="card-body" style="">
                    <h5 class="card-title" style="text-align:center; color:#2cc185; font-size:20pt; margin-bottom:50px" >Minhas Fotos</h5>
                    <p class="card-text" style="color:#2cc185; text-align:center;font-size:50pt;">{{ fotosqtd }}</p><p style="color:#dddddd; margin-bottom:80px; text-align:center;font-size:12pt">Fotos Existentes</p>
                    <a href="#/fotos" class="btn"  >ENTRAR</a>
                </div>
            </div>
            <div class="card bg-dark cardListEntrar" style="padding:10px">
                <div class="card-body" style="">
                    <h5 class="card-title" style="text-align:center; color:#2cc185; font-size:20pt; margin-bottom:50px" >Videos</h5>
                    <p class="card-text" style="color:#2cc185; text-align:center;font-size:50pt">{{ videosqtd }}</p><p style="color:#dddddd; margin-bottom:80px; text-align:center;font-size:12pt">Videos Existentes</p>
                    <a href="#/videos" class="btn"  >ENTRAR</a>
                </div>
            </div>
            <div class="card bg-dark cardListEntrar" style="padding:10px">
                <div class="card-body" >
                    <h5 class="card-title" style="text-align:center; color:#2cc185; font-size:20pt; margin-bottom:50px" >Forúm</h5>
                    <p class="card-text" style="color:#2cc185; text-align:center;font-size:50pt;">{{ forumqtd }}</p><p style="color:#dddddd; margin-bottom:80px; text-align:center;font-size:12pt">Feeds Existentes</p>
                    <a href="#/forum" class="btn"  >ENTRAR</a>
                </div>
            </div>
            <div class="card bg-dark cardListEntrar" style="padding:10px">
                <div class="card-body" >
                    <h5 class="card-title" style="text-align:center; color:#2cc185; font-size:20pt; margin-bottom:50px" >Links</h5>
                    <p class="card-text" style="color:#2cc185; text-align:center;font-size:50pt;">{{ forumqtd }}</p><p style="color:#dddddd; margin-bottom:80px; text-align:center;font-size:12pt">Links Existentes</p>
                    <a href="#/links" class="btn"  >ENTRAR</a>
                </div>
            </div>
        </b-card-group>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            fotosqtd:0,
            forumqtd:0,
            videosqtd:0    
        }
    },
    mounted(){
        this.getQtdFotos();
        this.getQtdForum();
    },
    methods:{
        async getQtdFotos(){
            let req = await fetch(`http://localhost:9000/pictures/private/${localStorage.getItem("id")}`,{
                method:"GET",
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            });
            const res = await req.json();
            this.$data.fotosqtd = res.length;

        },

        async getQtdForum(){
            let req = await fetch(`http://localhost:9000/pictures/public`,{
               method:"GET",
               headers:{
                   "Authorization":localStorage.getItem("token")
               }
           });

           let res = await req.json();
           this.$data.forumqtd = res.length;
        }
    }
}
</script>

<style>
    .cardListEntrar {
        margin-top:10%;
        display:flex;
        flex-direction: row;
        align-content: center;
        align-items: center
    }

    .cardListEntrar a{
        border:1px solid #2cc185; 
        color:#2cc185;
        width:150px
    }

    .cardListEntrar a:hover{
        background-color:#2cc185;
        color:#ffffff;
    }
</style>
