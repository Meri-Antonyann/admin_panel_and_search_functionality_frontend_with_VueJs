<template>

  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="fixed-top mb-5" style="max-width:inherit; margin:auto">


      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link to="/" class="m-2">Home</router-link>
          <router-link to= "/posts" class="m-2">Posts</router-link>
          <router-link to="/profile" class="m-2" v-if="token"> Create post </router-link>

        </b-navbar-nav>


        <b-navbar-nav class="ml-auto">

          <span class="h5 text-light mt-2" v-if="token" >
          You are logged in!
          </span>


          <b-nav-item-dropdown text="Action" right>
             <b-dropdown-item href="/login" v-if="!token"> Login </b-dropdown-item>
            <b-dropdown-item  v-if="token" @click="logout"> Log out</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>


</template>

<script>


export default {
  data(){
    return{
      data:{},
      token: null
    }
  },
  methods: {
    Usertoken(){
      this.token = localStorage.getItem('access_token')
    },

    logout(){
      localStorage.removeItem('access_token')
      this.$router.push({name: "Login"})
    }
  },
  mounted() {
    this.Usertoken()

  },

}
</script>

<style scoped>
a {
    text-decoration: none;
  color: #e2e8f0;
}


</style>
