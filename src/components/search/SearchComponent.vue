<template>
<b-container>

  <b-row>

    <b-col class="text-center mt-5 text-warning">
      <button class="m-2 mt-5 btn text-light btn-secondary"  @click="goBack">
        Go back
      </button>

      <h1 class="mt-3">{{ post.title }}</h1>
      <h3>{{ post.description }}</h3>
      <h2>{{ post.text }}</h2>

      <div>
        <img src="../../assets/defaultimage.jpg" alt="img" style="width: 50px; height: 50px;" class="m-1">
        <img src="../../assets/defaultimage.jpg" alt="img" style="width: 50px; height: 50px;" class="m-1">
        <img src="../../assets/defaultimage.jpg" alt="img" style="width: 50px; height: 50px;" class="m-1">
      </div>
    </b-col>

  </b-row>
</b-container>
</template>

<script>
export default {
  data(){
    return {
      post:{}
    }
  },
  mounted() {
     this.searchdata()

  },

  methods:{
    goBack(){
      this.$router.push({ name: "Posts", query: {page: this.$route.query.page}})
    },

     async searchdata(){
       await this.axios.get(`searchdata/${this.$route.params.id}`).then(response=> {
         this.post = response.data[0]
         console.log(this.post)
       })
     },



    }



}

</script>

<style>

</style>
