<template>
<div>
    
<div>
  <b-dropdown id="dropdown-1"  variant="light" :text="nome" class="m-md-2" >
    <b-dropdown-item @click="show=true" >Editar Dados</b-dropdown-item>
    <b-dropdown-item @click="logoff()">Sair</b-dropdown-item>
  </b-dropdown>
</div>

    <b-modal
      v-model="show"
      title="EDITAR DADOS"
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
                  <div class="form-group col-lg-12">
                      <label for="nome">Nome</label>
                      <input type="text"  v-model="nome"  class="form-control" id="nome" aria-describedby="nome" placeholder="Nome">
                  </div>  
               <div class="form-group col-lg-12">
                      <label for="senha">Senha</label>
                      <input type="password" v-model="user.senha" class="form-control" id="senha" aria-describedby="senha" placeholder="senha">
                </div>  
            </div>    
          </form>
      </b-container>

      <div slot="modal-footer" class="w-100">
        <a class="float-left text-light">Edite Seus Dados!</a>
        <b-button size="sm" class="float-right" variant="danger" @click="show=false" style="margin-left:10px">Cancelar</b-button>
        <b-button size="sm" class="float-right" variant="success" @click="userUpdate()">Salvar</b-button>
      </div>
    </b-modal>
</div>    
</template>

<script>
import Revert from "crypto";
  export default {
    components:{
      Revert
    },
    data() {
      return {
        show: false,
        erros:[],
        nome:localStorage.getItem("nome"),
        user:{
            password:'',
            senha:'',           
        }
      }
    },
    mounted(){
       this.getDataUser()
    },
    methods:{
       
      async userUpdate(next){

        localStorage.setItem("nome",this.$data.nome)
        let data = new FormData();
        data.append("name",this.$data.nome);
        data.append("password",this.$data.user.senha);

    
        const req = await fetch(`http://localhost:9000/user/${localStorage.getItem("id")}`,{
          method:"PUT",
          headers:{
            "Authorization":localStorage.getItem("token")
          },
          body:data
        });

        let res = await req.json();
        
        this.$swal({
              title:res,
              type: 'success',
              confirmButtonColor: '#41b882'
        })
        
        return;
      },
      async getDataUser(){
            
            const req = await fetch(`http://localhost:9000/user/${localStorage.getItem("id")}`,{
                method:"GET",
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            });

            const res = await req.json();
            
        },

      logoff(){
         localStorage.removeItem("token");
         localStorage.removeItem("nome");
         localStorage.removeItem("id");
         location.reload();
       }
       
    }
  }
</script>

<style>

</style>
