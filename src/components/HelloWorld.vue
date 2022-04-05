<template>
  <div class="d-flex justify-content-center align-items-center ">
    <b-row class="_googlediv"  >
      <b-col>
        <div class="text-center">
          <div>
            <span class=" _letters text-info" >G</span>
            <span class=" _letters text-danger">o</span>
            <span class=" _letters text-warning">o</span>
            <span class=" _letters text-info">g</span>
            <span class=" _letters text-success">l</span>
            <span class=" _letters last text-danger ">e</span>
          </div>

          <b-input-group size="sm" class="mb-2  _searchinput">
            <b-input-group-prepend is-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="search" v-model="search"></b-form-input>

            <b-input-group-prepend is-text>
              <b-icon icon="mic" class="text-info"></b-icon>
            </b-input-group-prepend>
          </b-input-group>

           <ul v-if="posts.length > 0">
             <router-link  v-for="post in posts" :key="post.id" :to='{name:"Search",params:{id:post.id}}'>
             <li class="text-secondary  ">
               <span class="h5">{{post.title}}</span>
               {{post.description}}
             </li>
             </router-link>
           </ul>

        <div class="d-flex mt-3 justify-content-center">
          <router-link to="#" class="text-secondary mr-3">Google serach</router-link>
          <router-link to="#" class="text-secondary">I'am feeling lucky</router-link>
        </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      search: null,
      posts:[]
    }
  },
  watch: {
    search(after, before) {
      this.getResults();
    }
  },
  methods: {
    getResults() {
      this.axios.get('/livesearch', { params: { search: this.search } })
        .then(res => this.posts = res.data)
        .catch(error => {});
    }
  }
}
</script>

<style scoped>
._googlediv{
  margin-top: 200px;
}
._letters{
  font-size: 100px;
  font-weight: revert;
}

._searchinput{
  width: 500px;
  border-radius: 8px;
}
router-link{
  text-decoration: none;
}

</style>
