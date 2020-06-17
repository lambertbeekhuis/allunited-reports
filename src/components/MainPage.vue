<template>
    <v-container>

        <v-row class="text-center">
            <v-col class="mb-4">
                <v-tabs
                    v-model="tab"
                    color="blue"
                    grow
                >
                    <v-tab
                        v-for="item in tabItems"
                        :key="item.label"
                    >
                        {{ item.label }}
                    </v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <v-row class="">
            <v-col class="mb-4">
                <component v-bind:is="tabItems[tab].component"></component>
            </v-col>
        </v-row>

    </v-container>
</template>
<script>
    import FileUpload from "./FileUpload";
    import Thanks from "./Thanks";
    import Rapportage from "./Rapportage";

    export default {
        name: "MainPage",

        components: {
            Rapportage,
            Thanks,
            FileUpload,
        },

        data: () => ({
            tab: 0,  // the choosen tab
            tabItems: [
                {label: 'File upload', component: 'FileUpload'},
                {label: 'Rapportage', component: 'Rapportage'},
                {label: 'Thanks', component: 'Thanks'}
            ],
        }),

        computed: {
        },

        methods: {
        }

    }
</script>

<style scoped>

</style>