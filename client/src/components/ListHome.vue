<template>
<div>
    <div class="mt-3">
        <b-card-group  deck>
            <div class="card bg-dark cardListEntrar" style="padding:10px">
                <div class="card-body" style="">
                    <h5 class="card-title" style="text-align:center; color:#2cc185; font-size:20pt" >Fotos</h5>
                    <p class="card-text" style="color:#2cc185; text-align:center;font-size:50pt">8 <span style="color:#dddddd; text-align:center;font-size:12pt">Existentes</span></p>
                    <a href="#" class="btn"  >ENTRAR</a>
                </div>
            </div>
            <div class="card bg-dark cardListEntrar" style="padding:10px">
                <div class="card-body" style="">
                    <h5 class="card-title" style="text-align:center; color:#2cc185; font-size:20pt" >Videos</h5>
                    <p class="card-text" style="color:#2cc185; text-align:center;font-size:50pt">8 <span style="color:#dddddd; text-align:center;font-size:12pt">Existentes</span></p>
                    <a href="#" class="btn"  >ENTRAR</a>
                </div>
            </div>
            <div class="card bg-dark cardListEntrar" style="padding:10px">
                <div class="card-body" style="">
                    <h5 class="card-title" style="text-align:center; color:#2cc185; font-size:20pt" >Forúm</h5>
                    <p class="card-text" style="color:#2cc185; text-align:center;font-size:50pt">8 <span style="color:#dddddd; text-align:center;font-size:12pt">Existentes</span></p>
                    <a href="#" class="btn"  >ENTRAR</a>
                </div>
            </div>
        </b-card-group>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
    .cardListEntrar a{
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border:1px solid #2cc185; 
        color:#2cc185;
        margin-top:20%
    }

    .cardListEntrar a:hover{
        background-color:#2cc185;
        color:#ffffff;
    }
</style>
