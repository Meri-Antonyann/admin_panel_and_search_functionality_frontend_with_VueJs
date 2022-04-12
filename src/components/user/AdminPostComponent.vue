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
        <tr v-for="(post,key) in posts" :key="key">

          <td>
          <router-link class="h4 text-secondary" :to='{name:"Search",params:{id:post.id}}'>  {{ post.title }} </router-link>
          </td>
          <td>{{ post.description }}</td>
          <td>{{ post.text }}</td>

          <td >
            <img v-for="(img,key) in post.files" :key="key" :src="'https://projectwithlaravelvuejs.herokuapp.com/images' + img.name" alt="img" style="width: 50px; height: 50px;" class="m-1">
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


        <b-pagination
          v-model="pagination.current_page"
          :total-rows="pagination.total"
          :per-page=" pagination.per_page"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
          @input ="getPosts"

        ></b-pagination>
        <p class="mt-3"> Page: {{ pagination.current_page }} </p>
      </table>

    </div>
  </div>

</template>

<script>
  export default {


  data(){
    return {
      posts:[],
      pagination: {},
      token:null
    }
  },

  mounted() {
   this.getPosts();
   this.gettoken();

  },


  methods:{
    async getPosts(){
      await this.axios.get('post?page=' + this.pagination.current_page,{
        params: {
          'page': this.pagination.currentPage,
            'per_page': this.pagination.perPage,
        },
      }).then(response=>{
        console.log(response.data.posts)
        this.posts = response.data.posts.data
        this.pagination  = response.data.posts ;
        console.log(response.data.posts )
      }).catch(error=>{
        console.log(error)

      })
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
  }
}
</script>

<style scoped>

</style>
