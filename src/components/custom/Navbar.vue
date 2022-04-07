<template>

  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">


      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-navbar-item  >
            <router-link to="/" class="m-2">Home</router-link>
          </b-navbar-item>
          <b-navbar-item  >
            <router-link to="/posts"  class="m-2">Posts</router-link>
          </b-navbar-item>
        </b-navbar-nav>


        <b-navbar-nav class="ml-auto">


          <b-nav-item-dropdown text="Action" right>
             <b-dropdown-item href="/login"> Login </b-dropdown-item>
            <b-dropdown-item  v-if="token" @click="logout"> Log out</b-dropdown-item>



          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>


</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data(){
    return{
      token: null
    }
  },
  mounted() {
    this.Usertoken()

  },
  methods: {
     Usertoken(){
        this.token = localStorage.getItem('access_token')
      },
    logout(){
       localStorage.removeItem('access_token')
      this.$router.push({name: "Login"})
    }
  }

}
</script>

<style scoped>
a {
    text-decoration: none;
  color: #e2e8f0;
}
</style>
