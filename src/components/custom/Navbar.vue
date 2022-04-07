<template>

  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">


      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-navbar-item  >
            <router-link to="/">Home</router-link>
          </b-navbar-item>
          <b-navbar-item  >
            <router-link to="/posts">Posts</router-link>
          </b-navbar-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item  >
            <router-link to="/login">Login</router-link>
            </b-dropdown-item>
            <b-dropdown-item  >
              <router-link to="/register">Login</router-link>
            </b-dropdown-item>
            <b-dropdown-item  >
              <router-link to="/Log out">Login</router-link>
            </b-dropdown-item>

          </b-nav-item-dropdown>

<!--          <b-nav-item-dropdown right>-->
<!--            &lt;!&ndash; Using 'button-content' slot &ndash;&gt;-->
<!--            <template #button-content>-->
<!--              <em>User</em>-->
<!--            </template>-->
<!--            <b-dropdown-item href="#">Profile</b-dropdown-item>-->
<!--            <b-dropdown-item href="#">Sign Out</b-dropdown-item>-->
<!--          </b-nav-item-dropdown>-->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>





<!--  <div>-->
<!--    <b-navbar type="dark" variant="dark">-->
<!--      <b-navbar-nav >-->
<!--        <b-nav-item>-->
<!--          <router-link to="/">-->
<!--            Home-->
<!--          </router-link>-->
<!--        </b-nav-item>-->
<!--        <b-nav-item>-->
<!--          <router-link to="/login">-->
<!--            Login-->
<!--          </router-link>-->
<!--        </b-nav-item>-->
<!--        <b-nav-item>-->
<!--          <router-link to="/register">-->
<!--            Registration-->
<!--          </router-link>-->
<!--        </b-nav-item>-->
<!--        <b-nav-item>-->
<!--          <router-link to="/posts">-->
<!--            Posts-->
<!--          </router-link>-->
<!--        </b-nav-item>-->
<!--        <b-nav-item v-if="token">-->
<!--          <router-link to="/logout">-->
<!--            logout-->
<!--          </router-link>-->
<!--        </b-nav-item>-->
<!--      </b-navbar-nav>-->
<!--    </b-navbar>-->
<!--  </div>-->
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
