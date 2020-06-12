<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-4">
                <!--
                <h1 class="display-2 font-weight-bold mb-3">
Rapportage voor AllUnited baanbezetting
                </h1>
                -->

                <v-btn>1. Upload file</v-btn>

                <v-btn>2. Kies report</v-btn>

                <v-btn>3. Kies period</v-btn>

            </v-col>
        </v-row>

        <v-row>
            <v-col class="mb-4" cols="3">
                <v-file-input
                        accept=".csv"
                        v-model="chosenFile"
                        label="AllUnited report file"
                >
                </v-file-input>
                <v-btn right @click="importFile">Import</v-btn>

                <div>Aantal regels: {{fileLineCount}}</div>
                <div>Eerste dag: {{firstDate}}</div>
                <div>Laatste dag: {{lastDate}}</div>



            </v-col>
            <v-col class="mb-4" cols="3">

                <vc-date-picker
                        mode="range"
                        v-model="range"
                        color="blue"
                        is-inline
                />

            </v-col>

            <v-col class="mb-4" cols="6">
                <graph-baanbezetting v-if="firstDate" :range="range"></graph-baanbezetting>
            </v-col>

        </v-row>

    </v-container>
</template>
<script>
    import GraphBaanbezetting from "./GraphBaanbezetting";
    import {dateFns} from "../utils/dateHelper";

    export default {
        name: "MainPage",
        components: {
            GraphBaanbezetting
        },
        data: () => ({
            chosenFile: null,
            range: {
                start: new Date(2018, 0, 16), // Jan 16th, 2018
                end: new Date(2018, 0, 19)    // Jan 19th, 2018
            }
        }),

        computed: {
            fileFields () {
                return this.$store.state.fileFields;
            },

            fileLineCount () {
                return this.$store.state.fileLineCount;
            },

            firstDate () {
                return this.$store.getters.firstDate;
            },

            lastDate () {
                return this.$store.getters.lastDate;
            },

        },

        methods: {
            importFile() {
                if (!this.chosenFile) {
                    this.data = "No File Chosen"
                    return;
                }
                let fileReader = new FileReader();
                fileReader.name = this.chosenFile.name; // inject the filename, so I can retrieve it again from File

                // Use the javascript reader object to load the contents
                // of the file in the v-model prop
                fileReader.readAsText(this.chosenFile);
                fileReader.onload = () => {
                    this.$store.commit('SET_INPUT_DATA', fileReader);
                }
            }
        }

    }
</script>

<style scoped>

</style>