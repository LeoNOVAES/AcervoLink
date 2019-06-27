<template>
<div>
    <b-button @click="show=true" class="btn btn-warning"  style="color:#ffffff;">Editar</b-button>
    <b-modal
      v-model="show"
      title="LOGIN"
      header-bg-variant="danger"
      header-text-variant="light"
      body-bg-variant="light"
      body-text-variant="dark"
      footer-bg-variant="dark"
      footer-text-variant="light"
    >
      <b-container fluid>
            <div  class="bg-danger text-light" style="margin-top:10px; margin-bottom:10px; border-radius:10px">
            </div>
           <form>  
               <div class="row">
                  <div class="form-group col-lg-6">
                    <label for="nome">Email</label>
                    <input type="text" class="form-control" id="email" aria-describedby="Email" placeholder="EMAIL"/>
                 </div>
                  <div class="form-group col-lg-6">
                    <label for="cidade">Senha</label>
                    <input type="password" class="form-control"  id="password" aria-describedby="PASSWORD" placeholder="PASSWORD">
                 </div>
               </div>
            </form>
      </b-container>

      <div slot="modal-footer" class="w-100">
        <a href="#"  class="float-left text-light">ESQUECEU SUA SENHA?</a>
        <b-button size="sm" class="float-right" variant="danger" style="margin-left:10px">Cancelar</b-button>
        <b-button size="sm" class="float-right" variant="success" >Entrar</b-button>
      </div>
    </b-modal>
</div>  
</template>

<script>
export default {
    data(){
        return{
            show: false,
            erros:[],
            user:{
                email:'',
                password:'',
                
            }
        }
    }
}
</script>

<style>

</style>
