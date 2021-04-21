<template>
  <v-container>
  <v-row>
    <v-col cols="12" md="6">
        <h1>Login AllUnited reporting</h1>

        <form @submit.prevent>
          <v-text-field
              v-model="formData.email"
              label="Email"
              required
          ></v-text-field>

          <v-text-field
              v-model="formData.password"
              label="password"
              required
          ></v-text-field>

          <v-btn class="mr-4" @click="login">Login</v-btn>

          <button class="button">Log In</button>
          <div class="extras">
            <a>Forgot Password</a>
            <router-link :to="{name: 'route_signup'}">Create account</router-link>
          </div>
        </form>

    </v-col>
  </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.formData.email,
        password: this.formData.password
      })
    }
  }

}
</script>

<style scoped>

</style>