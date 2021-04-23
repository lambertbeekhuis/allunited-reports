<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        AllUnited Rapportage-tool
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/about">
      testing
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        href="https://www.jovisst.nl"
        target="_blank"
        text
      >
        <span class="mr-2">Dank</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn v-if="loggedInUserName" @click="logout">
        logout
      </v-btn>

      <v-btn v-if="loggedInUserName">
        {{loggedInUserName}}
      </v-btn>



      <v-btn v-if="!loggedInUserName" :to="{name: 'route_login'}">
        Login
      </v-btn>


    </v-app-bar>

    <v-main>
          <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {

  },

  data: () => ({
    //
  }),

  computed: {
    loggedInUserName: function () {
      return this.$store.state.userProfile.name || false;
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }

};
</script>
