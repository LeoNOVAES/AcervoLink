<template>
 <div>
    <Header/>
     
     <b-container class="cardCad">
         <div class="row">
             <div  class="col-sm-6" style="margin-top:20px">
                <b-card
                    header="Dados Pessoais"
                    header-text-variant="dark"
                    header-tag="header"
                    header-bg-variant="light"
                >
                    <b-card-text>
                        <form >  
                        <div class="row">
                            <div class="form-group col-lg-12">
                                <label for="nome">Nome</label>
                                <input type="text" v-model="user.nome" class="form-control" id="nome" aria-describedby="nome" placeholder="Nome">
                            </div>  
                             <div class="form-group col-lg-12">
                                <label for="email">Email</label>
                                <input type="email"  v-model="user.email" class="form-control" id="email" aria-describedby="email" placeholder="Enter email">
                            </div>
                        </div>
                        </form>
                    </b-card-text>
                </b-card>
            </div>
  
            <div  class="col-sm-6"  style="margin-top:20px">
                <b-card
                    header="Senha"
                    header-text-variant="dark"
                    header-tag="header"
                    header-bg-variant="light"
                >
                    <b-card-text>
                        <form >  
                        <div class="row">
                            <div class="form-group col-lg-12">
                                <label for="senha">Senha</label>
                                <input type="password" v-model="user.senha" class="form-control" id="senha" aria-describedby="senha" placeholder="senha">
                            </div>  
                             <div class="form-group col-lg-12">
                                <label for="senhaConfirm">Confirme a Senha</label>
                                <input type="password" v-model="user.senhaConf"  class="form-control" id="senhaConfirm" aria-describedby="senhaConfirm" >
                            </div>
                        </div>
                        </form>
                    </b-card-text>
                </b-card>
            </div>        
         </div>
         <button id="btn" @click="isCadastro" class="btn btn-success">CADASTRAR</button>
     </b-container>    
 </div>
 
</template>

<script>
import Header from '@/components/Header.vue'
export default {
    components:{
        Header
    },
     data(){
    return {
      user:{
        nome:'',
        email:'',
        senha:'',
        senhaConf:''
      },
      erros:[]
    }
  },
  methods:{
      async isCadastro(e){
        if(this.$data.user.nome && this.$data.user.email  && this.$data.user.senha && this.$data.user.senhaConf){
            let form = new FormData()
            form.append("name",this.$data.user.nome)
            form.append("email",this.$data.user.email)
            
            if(this.$data.user.senha == this.$data.user.senhaConf){
                form.append("password",this.$data.user.senha)
            }else{
                this.$swal({
                    title:"Senhas não são iguais!",
                    type: 'warning',
                    confirmButtonColor: '#41b882'
                })
                return;
            }

            const response = await fetch("http://localhost:9000/user",{
                method:"POST",
                body: form
            })

            const res = await response.json();
            console.log(res.status);
            if(res == "Email já existe"){
                this.$swal({
                    title: res,
                    type: 'warning',
                    confirmButtonColor: '#41b882',
                    confirmButtonText: 'Faça o Login'
                });

            }else{
                this.$swal({
                    title: 'Parabéns',
                    text: "Cadastro Realizado com sucesso",
                    type: 'success',
                    confirmButtonColor: '#41b882',
                    confirmButtonText:"Faça o login"
                });

                setTimeout(function() {
                    window.location.href = "#/"
                }, 1000);
            }

        }

            if(!this.$data.user.nome || !this.$data.user.email  || !this.$data.user.senha  || !this.$data.user.senhaConf ){
                 this.$data.erros.push("Todos Os campos devem estar preenchidos!")
            }


            if(this.$data.erros.length){
                this.$swal({
                    title: this.erros[0],
                    type: 'warning',
                    confirmButtonColor: '#41b882'
                })
            }
        }
  }
}
</script>

<style scoped>
    .cardCad{
        margin-top:20px;
        background-color:#DCDCDC;
        border-radius: 5px;
        padding:20px
    }

    #btn{
        
        margin-top:20px;
    }
</style>