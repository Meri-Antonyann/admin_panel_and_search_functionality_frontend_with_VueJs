<template>
<b-container>

  <b-row>

    <b-col class="text-center mt-5 text-warning ">
      <button   class="m-2 btn text-light  btn btn-primary"  @click="$router.history.go(pagination.prev_page_url)">
        Go back
      </button>
      <h1 class="mt-5">{{ post.title }}</h1>
      <h3>{{ post.description }}</h3>
      <h2>{{ post.text }}</h2>
      <div>
        <img v-for="(img,key) in post.files" :key="key" :src="'https://projectwithlaravelvuejs.herokuapp.com/images/' + img.name" alt="img" style="width: 200px; height: 200px;" class="m-1">
      </div>
    </b-col>

  </b-row>
</b-container>
</template>

<script>
export default {
  data(){
    return {
      post:{},
      pagination:{}
    }
  },
  mounted() {
     this.searchdata(),
       this.getPosts()
  },

  methods:{
     async searchdata(){
       await this.axios.get(`searchdata/${this.$route.params.id}`).then(response=> {
         this.post = response.data[0]
         console.log(this.post)
       })
     }
    },

  async getPosts(){
    await this.axios.get(`post?page=` + this.pagination.current_page).then(response=>{
      console.log(response.data.posts)

      this.pagination  = response.data.posts ;
      console.log(response.data.posts )
    }).catch(error=>{
      console.log(error)

    })
  },


}
</script>

<style>

</style>
