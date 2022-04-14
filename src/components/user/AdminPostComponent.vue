<template>

  <div class="card-body  ">
    <div class="table-responsive">
      <h1 class="text-center mb-5 mt-5">Posts</h1>

      <table class="table table-bordered">

        <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Text</th>
          <th>Image</th>
          <th v-if="token">Action</th>
        </tr>
        </thead>
        <tbody v-if="posts.length > 0  " >
        <tr v-for="(post,key) in paginatedPosts" :key="key">

          <td>
          <router-link class="h4 text-secondary" :to='{name:"Search", params:{id:post.id}, query:{page: currentPage }  }'>  {{ post.title }} </router-link>
          </td>
          <td>{{ post.description }}</td>
          <td>{{ post.text }}</td>

          <td >
            <img src="../../assets/defaultimage.jpg" alt="img" style="width: 50px; height: 50px;" class="m-1">
            <img src="../../assets/defaultimage.jpg" alt="img" style="width: 50px; height: 50px;" class="m-1">
            <img src="../../assets/defaultimage.jpg" alt="img" style="width: 50px; height: 50px;" class="m-1">
          </td>

          <td>
            <router-link :to='{name:"Edit",params:{id:post.id}}' v-if="token" class="btn btn-warning">Edit</router-link>
            <button type="button" class="btn btn-danger" v-if="token" @click="clear(post.id)">Delete</button>
          </td>

        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="4" align="center">No Posts Found.</td>
        </tr>
        </tbody>


      </table>
      <b-pagination-nav
        v-model= "currentPage"
        :number-of-pages="rows"
        :link-gen="linkGen"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        use-router
      ></b-pagination-nav>
      <p class="mt-3"> Page: {{ currentPage }} </p>
    </div>
  </div>

</template>

<script>
  export default {


  data(){
    return {
      posts:[],
      paginatedPosts: [],
      token:null,
      perPage: 10,
      currentPage: 1
    }
  },
    computed: {
      rows() {
        return this.posts.length/this.perPage + 1
      },
      infoParam(){
        return this.$router.currentRoute.query.page
      },

    },


  mounted() {
   this.getPosts();
   this.gettoken();

  },

   methods:{

     async getPosts(){

       if (this.infoParam){
         this.currentPage = this.infoParam
       }

       await this.axios.get('post').then(response=>{
         this.posts = response.data.posts;
         console.log(this.posts , 'this.posts')
         this.paginatedPosts = this.posts.slice( (this.currentPage - 1) * this.perPage , ((this.currentPage - 1) * this.perPage) + this.perPage )
         console.log(this.paginatedPosts , ' first load this.paginatedPosts ')
         console.log((this.currentPage - 1) * this.perPage , ((this.currentPage - 1) * this.perPage) + this.perPage)

       }).catch(error=>{
         console.log(error)
       })
     },

     paginationButtonClick(){
       console.log(this.currentPage)
       this.paginatedPosts = this.posts.slice((this.currentPage - 1) * this.perPage , ((this.currentPage - 1) * this.perPage) + this.perPage )
       this.$router.push({ name: "Posts", query: {page: this.currentPage}}).catch(()=>{});
     },

     linkGen(pageNum) {
       return pageNum === 1 ? '?' : `?page=${pageNum}`
     },

     gettoken(){
      this.token = localStorage.getItem('access_token')
     },

    clear(id){
       if (confirm('Do you want to delete this post?'))
           this.axios.post(`postdel/${id}`).then(response=>{
           this.getPosts()

        }).catch(error=>{
          console.log(error)
        })
       }
    },

    watch: {
      currentPage(){
        this.paginationButtonClick()
      },

    }
}
</script>

<style scoped>

</style>
