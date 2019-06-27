<template>
<div>
    <b-card-group deck>
      <b-card  style="background-color:rgba(0,0,0,0.5)" text-variant="white" header="CADASTRE-SE"  header-bg-variant="dark" class="text-center">
        <b-card-text>
            <b-row>
                <label for="nome" class="labels">Nome</label>  
                <b-col class="form-group col-sm-12">
                    <input type="text" v-model="user.nome" class="form-control"   placeholder="Nome">
                </b-col>
                <label class="labels" for="nome">Email</label>
                <b-col class="form-group col-sm-12">
                    <input type="email"  v-model="user.email" class="form-control"   placeholder="Email">
                </b-col>
                <label class="labels" for="nome">Senha</label>
                <b-col class="form-group col-sm-12">
                    <input type="password"  v-model="user.senha" class="form-control"   placeholder="Senha">
                </b-col>
                <label class="labels" for="nome">Confirme a Senha</label>
                <b-col class="form-group col-sm-12">
                    <input type="password" v-model="user.senhaConf" class="form-control" placeholder="">
                </b-col>
                 <button id="btn" @click="isCadastro" class="btn btn-danger">CADASTRAR</button>    
            </b-row>
        </b-card-text>
      </b-card>
    </b-card-group>
</div>
</template>

<script>
export default {
    data(){
        return {
            user:{
                nome:'',
                email:'',
                senha:'',
                senhaConf:'',
            },
            erros:[]
        }
    },
    methods:{
       async getAuth(user){
           console.log("aqui no auth")
            const req = await fetch("http://localhost:9000/user/autentic",{
              method:"POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(user)
            });

            const res = await req.json();
            console.log(res)
            if(res.auth){
              localStorage.setItem("token",res.token);
              localStorage.setItem("id",res.user.id);
              localStorage.setItem("nome",res.user.name)
              window.location.reload(true);
            }else{
                console.log("error")
            }
       },  
      async isCadastro(e){
        if(this.$data.user.nome && this.$data.user.email  && this.$data.user.senha && this.$data.user.senhaConf){
            if(this.$data.user.senha.length < 6){
                this.$swal({
                    title:"A senha deve conter no minimo 6 caracters!",
                    type: 'warning',
                    confirmButtonColor: '#41b882'
                })
                return;
            }

            if(this.$data.user.nome.length < 4){
                 this.$swal({
                    title:"O Nome deve conter no minimo 4 caracters!",
                    type: 'warning',
                    confirmButtonColor: '#41b882'
                })
                return
            }

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
                    confirmButtonText:"OK"
                }).then(async ()=>{
                    let user = {
                        email:this.$data.user.email,
                        password:this.$data.user.senha
                    }
                    this.getAuth(user)
                })
                
                return;
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

<style>
.labels{
    margin-left:4%
}

#btn{
    margin-left:4%;    
    margin-top:20px;
}
</style>
