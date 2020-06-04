<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">
Reports voor AllUnited baanbezetting
                </h1>

                <v-btn>1. Upload file</v-btn>

                <v-btn>2. Kies report</v-btn>

                <v-btn>3. Kies period</v-btn>

            </v-col>

            <v-col class="mb-4">
                <v-file-input label="AllUnited file"></v-file-input>

            </v-col>

        </v-row>
    </v-container>
</template>
<script>
    export default {
        name: "MainPage",

        data: () => ({
            file: ""
        })

    }
</script>

<style scoped>

</style>