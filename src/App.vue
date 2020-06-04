<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        Reports AllUnited
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://www.jovisst.nl"
        target="_blank"
        text
      >
        <span class="mr-2">By Jovisst</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <main-page></main-page>

    </v-content>
  </v-app>
</template>

<script>
import MainPage from "./components/MainPage";

export default {
  name: 'App',

  components: {
    MainPage,
  },

  data: () => ({
    //
  }),
};
</script>
