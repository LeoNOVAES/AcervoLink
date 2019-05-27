<template>
<div>
    <b-button @click="show=true" class="btn btn-light" style="font-weight:bolder; margin-right:10%; padding-right:30px; padding-left:30px">LOGIN</b-button>
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
            <div v-if="erros.length" class="bg-danger text-light" style="margin-top:10px; margin-bottom:10px; border-radius:10px">
                {{erros[0]}}
            </div>
           <form>  
               <div class="row">
                  <div class="form-group col-lg-6">
                    <label for="nome">Email</label>
                    <input type="text" class="form-control" id="email" v-model="user.email" aria-describedby="Email" placeholder="EMAIL"/>
                 </div>
                  <div class="form-group col-lg-6">
                    <label for="cidade">Senha</label>
                    <input type="password" class="form-control" v-model="user.password" id="password" aria-describedby="PASSWORD" placeholder="PASSWORD">
                 </div>
               </div>
            </form>
      </b-container>

      <div slot="modal-footer" class="w-100">
        <a href="#"  class="float-left text-light">ESQUECEU SUA SENHA?</a>
        <b-button size="sm" class="float-right" variant="danger" @click="show=false" style="margin-left:10px">Cancelar</b-button>
        <b-button size="sm" class="float-right" variant="success" @click="getAuth">Entrar</b-button>
      </div>
    </b-modal>
</div>    
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        erros:[],
        user:{
            email:'',
            password:'',
            
        }
      }
    },
    methods:{
       checkForm(){
            if(this.user.email && this.user.password){
                this.erros = [];
                return true;
            }else if(!this.user.password || !this.user.email){
                this.erros.push("Todos os campos devem estar preenchidos");
                return false;
            }
       },

       getAuth(){
            let valid = this.checkForm();
            if (valid == false) return;
       }
       
    }
  }
</script>

<style>

</style>
