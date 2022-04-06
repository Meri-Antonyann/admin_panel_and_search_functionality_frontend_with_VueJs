<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav >
        <b-nav-item>
          <router-link to="/">
            Home
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/login">
            Login
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/register">
            Registration
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/posts">
            Posts
          </router-link>
        </b-nav-item>
        <b-nav-item v-if="token">
          <router-link to="/logout">
            logout
          </router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data(){
    return{
      token: null
    }
  },


}
</script>

<style scoped>
a {
    text-decoration: none;
  color: #e2e8f0;
}
</style>
