<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <h1>Signup AllUnited reporting</h1>

        <form @submit.prevent>
          <v-text-field
              v-model="signupData.name"
              label="Naam"
              required
          ></v-text-field>

          <v-text-field
              v-model="signupData.club"
              label="Club"
              required
          ></v-text-field>

          <v-text-field
              v-model="signupData.email"
              label="Email"
              required
          ></v-text-field>

          <v-text-field
              v-model="signupData.password"
              label="password"
              required
          ></v-text-field>

          <v-btn class="mr-4" @click="signup">Signup</v-btn>

          <div class="extras">
            <a>Forgot Password</a>
            <a>Create an Account</a>
          </div>
        </form>

      </v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {
  name: "Signup",

  data() {
    return {
      signupData: {
        name: '',
        club: '',
        email: '',
        password: ''
      }
    }
  },

  methods: {
    signup() {
      this.$store.dispatch('signup', {
        name: this.signupData.name,
        club: this.signupData.club,
        email: this.signupData.email,
        password: this.signupData.password,
      })
    }
  }

}
</script>

<style scoped>

</style>

