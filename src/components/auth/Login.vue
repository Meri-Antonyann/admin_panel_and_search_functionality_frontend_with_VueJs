<template>
  <div class="mt-5">
    <b-container class="px-0 mt-5">
      <b-row>
        <b-col
          cols="5"
          md="8"
          lg="7"
          xl="5"
          class="mx-auto"
        >

          <h3>
            Login
          </h3>
          <validation-observer ref="observer">
            <b-form @submit.prevent="login">
              <validation
                name="email"
                rules="required|email"
              >
                <b-form-group
                  label-class="form-label"
                  label="Email Address"
                  label-for="email"
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <b-form-input
                    id="email"
                    v-model="formData.email"
                    :state="errors[0] ? false : null"
                    trim
                  />
                </b-form-group>
              </validation>
              <validation
                name="password"
                rules="required|min:8"
              >
                <b-form-group
                  label-class="form-label"
                  label="Password"
                  label-for="password"
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <b-form-input
                    id="password"
                    v-model="formData.password"
                    type="password"
                    :state="errors[0] ? false : null"
                    trim
                  />
                </b-form-group>
              </validation>
              <div class="mt-3">
                <b-button
                  variant="primary"
                  block
                  type="submit"
                >
                  Login
                </b-button>
              </div>
            </b-form>
          </validation-observer>
          <div class="d-flex justify-content-between">

            <p class="mt-5">
              <router-link to="/register">Don't have an account?</router-link>
            </p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapActions} from 'vuex'

export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
        role: ""
      },
    }
  },
  methods: {
    ...mapActions(["LOGIN_USER"]),

    async login() {
      let valid = await this.$refs.observer.validate();
      if (!valid) return false;
      await this.LOGIN_USER(this.formData).then((res) => {
        if(res)

          this.$router.push({name: "Profile"}
          )


      }).catch(err => {
        if(err) console.log(err);
      }).finally(() => {
        this.loading = false
      })
    }
  },
}
</script>
