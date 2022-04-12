<template>

  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="fixed-top mb-5" style="max-width:inherit; margin:auto">


      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-navbar-item   class="m-2 btn text-light  "  @click="$router.history.go(-1)"> Go back </b-navbar-item>
            <b-navbar-item  >
              <router-link to="/" class="m-2">Home</router-link>
            </b-navbar-item>
            <b-navbar-item  >
              <router-link to="/posts"  class="m-2">Posts</router-link>
            </b-navbar-item>
            <b-navbar-item  >
              <router-link to="/profile" class="m-2" v-if="token"> Create post </router-link>
            </b-navbar-item>
        </b-navbar-nav>


        <b-navbar-nav class="ml-auto">

          <b-navbar-item class="h5 text-light" v-if="token" >
             {{data.name}}
          </b-navbar-item>


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
import {mapActions, mapGetters} from "vuex";

export default {
  data(){
    return{
      data:{},
      token: null
    }
  },
   mounted() {
    this.Usertoken(),
      this.UserData()
  },
  methods: {
     Usertoken(){
        this.token = localStorage.getItem('access_token')
      },

    ...mapActions(["GET_USER_DATA"]),
    ...mapGetters(['getUser']),
    async UserData() {
      await this.GET_USER_DATA()
        .then(res => {
          if(res) {
            this.data = this.getUser()
            console.log(this.getUser())
          }
          localStorage.setItem('email', this.data.email)
        })
        .catch((error) => {
          console.log(error)
        })
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
