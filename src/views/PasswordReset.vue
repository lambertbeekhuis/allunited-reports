<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <h1>Reset wachtwoord</h1>
        <div v-if="!showSuccess">
          <p>Enter your email to reset your password</p>
          <form @submit.prevent>

            <v-text-field
                v-model="email"
                label="Email"
                required
            ></v-text-field>

            <p v-if="errorMessage !== ''" class="error">{{ errorMessage }}</p>

            <v-btn class="mr-4" @click="resetPassword">Reset password</v-btn>

          </form>
        </div>

        <div v-else>
          Success! Check your email for a reset link.
        </div>

        <div class="extras">
          <router-link :to="{name: 'route_login'}">Ga naar Login</router-link>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {auth} from '@/firebase'

export default {
  name: "PasswordReset",

  data() {
    return {
      email: '',
      showSuccess: false,
      errorMessage: ''
    }
  },

  methods: {
    async resetPassword() {
      this.errorMsg = '';
      try {
        await auth.sendPasswordResetEmail(this.email)
        this.showSuccess = true
      } catch (err) {
        this.errorMessage = err.message
      }
    }
  }

}
</script>

<style scoped>

</style>