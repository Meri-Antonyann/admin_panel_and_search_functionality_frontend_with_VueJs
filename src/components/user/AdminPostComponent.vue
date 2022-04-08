<template>

  <div class="card-body">
    <div class="table-responsive">
      <router-link to="profile" class="btn btn-primary" v-if="token"> Create post </router-link>
      <h1 class="text-center mb-5">Posts</h1>
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

          <td>{{ post.title }}</td>
          <td>{{ post.description }}</td>
          <td>{{ post.text }}</td>

          <td >
            <img v-for="(img,key) in post.files" :key="key" :src="'https://projectwithlaravelvuejs.herokuapp.com/images/' + img.name" alt="img" style="width: 50px; height: 50px;" class="m-1">
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
    </div>
  </div>

</template>

<script>
export default {

  data(){
    return {
      posts:[],
      token:null
    }
  },
  mounted() {
   this.getPosts(),
     this.gettoken()
  },

  methods:{
    async getPosts(){
      await this.axios.get('post').then(response=>{
        console.log(response.data.posts)
        this.posts = response.data.posts
      }).catch(error=>{
        console.log(error)
        this.posts = []
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
