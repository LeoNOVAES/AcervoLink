<template>
<div>
    <b-button @click="show=true" class="btn btn-warning"  style="color:#ffffff;">Editar</b-button>
    <b-modal
      v-model="show"
      title="Editar Foto"
      header-bg-variant="light"
      header-text-variant="dark"
      body-bg-variant="light"
      body-text-variant="dark"
      footer-bg-variant="dark"
      footer-text-variant="light"
    >
      <b-container fluid>
            <div  class="bg-danger text-light" style="margin-top:10px; margin-bottom:10px; border-radius:10px">
              <p v-if="erro">Todos os campos devem estar preenchidos</p>
            </div>
           <form>  
               <div class="row">
                  <div class="form-group col-lg-6">
                    <label for="nome">Titulo</label>
                    <input type="text" class="form-control" v-model="picture.nome" id="titulo" aria-describedby="titulo" placeholder="Titulo"/>
                 </div>
                  <div class="form-group col-lg-6">
                    <label for="descricao">Descrição</label>
                    <input type="text" class="form-control" v-model="picture.descricao" id="descricao" aria-describedby="descricao" placeholder="Descrição">
                 </div>
               </div>
            </form>
      </b-container>

      <div slot="modal-footer" class="w-100">
        <b-button size="sm" class="float-right" variant="danger" style="margin-left:10px">Cancelar</b-button>
        <b-button size="sm" class="float-right" @click="update(idPic)" variant="success" >Salvar</b-button>
      </div>
    </b-modal>
</div>  
</template>

<script>
export default {
    props:{
      idPic:''
    },
    data(){
        return{
            show: false,
            erro:false,
            picture:{
              nome:'',
              descricao:'',
              public:0
            }
        }
    },
    methods:{
      async update(id){
        
        if(this.$data.picture.nome.length == 0 || this.$data.picture.descricao.length == 0){
            this.$data.erro = true;
            return;
        }

        const req = await fetch(`http://localhost:9000/pictures/update/${localStorage.getItem("id")}/${id}`,{
          method:"PUT",
          headers:{
            "Authorization":localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(this.$data.picture)
        });

          setTimeout(()=>{
                    location.reload()
          }, 1000);
      }
    }
}
</script>

<style>

</style>
